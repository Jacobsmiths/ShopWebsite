const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

// Define a few constant global variables and paths to key information
const KEY_FILE_PATH = path.join(__dirname, "../PaintBot.json");
const SPREAD_SHEET_ID = process.env.SpreadSheet_ID;
const rangeVar = "Data!C2:F30";
const imagesFolder = path.join(path.dirname(__dirname), "../frontend/public/images");
const imagePath = "/images/";

// Variables to handle spreadsheet columns
const nameElement = 0;
const priceElement = 1;
const descriptionElement = 2;
const imageElement = 3;

// Initialize Sheets API client
const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"], // Read-only access to Sheets
});

// Authenticate and set global authenticator client for API requests
const authenticate = async () => {
  try {
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    console.log("Successfully authenticated!");
  } catch (err) {
    console.error("Authentication failed:", err);
    throw err;
  }
};

// Return the image URL given an image ID
const getImageURL = (imageID) => `https://drive.google.com/uc?id=${imageID}`;

// Extract image ID from the original URL
const getImageID = async (originalURL) => {
  return new Promise((resolve, reject) => {
    try {
      const start = originalURL.indexOf("/d/") + 3;
      const end = originalURL.indexOf("/view");
      resolve(originalURL.slice(start, end));
    } catch (err) {
      console.error("Error extracting image ID:", err);
      reject(err);
    }
  });
};

// Download image from the URL and save it to the images folder
const downloadFile = async (url, fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        reject(new Error(`Failed to fetch: ${response.statusText}`));
      }

      const savePath = path.join(imagesFolder, `./${fileName}.png`);
      const fileStream = fs.createWriteStream(savePath);
      response.body.pipe(fileStream);

      const stuffPath = path.join(imagePath, `${fileName}.png`);
      resolve(stuffPath);
    } catch (err) {
      console.error("Error downloading file:", err);
      reject(`Error fetching the file: ${err}`);
    }
  });
};

// Handle image processing: downloading and storing
const handleImage = async (originalUrl, imageName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageId = await getImageID(originalUrl);
      const imageUrl = getImageURL(imageId);
      const filePath = await downloadFile(imageUrl, imageName);
      resolve(filePath);
    } catch (err) {
      console.error("Error handling image:", err);
      reject(err);
    }
  });
};

// Generate a unique ID using uuid
const generateUniqueID = () => uuidv4();

// Fetch the data from the Google Sheets and process each row
const getData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREAD_SHEET_ID,
        range: rangeVar, // Specify the range in the sheet
      });

      const values = data.data.values;
      console.log("Fetched values from spreadsheet:", values);

      for (let i = 0; i < values.length; i++) {
        try {
          const filePath = await handleImage(values[i][imageElement], values[i][nameElement]);
          values[i][imageElement] = filePath;
          const imageID = generateUniqueID();
          values[i].push(imageID);
        } catch (err) {
          console.error("Error handling image for row:", i, err);
          reject(err);
        }
      }

      console.log("Processed values:", values);
      resolve(values);
    } catch (err) {
      console.error("Error fetching data from Sheets:", err);
      reject(err);
    }
  });
};

// Retrieve image path for a given file name
const getImage = async (fileName) => {
  const pngName = `${fileName}.png`;
  const filePath = path.join(imagePath, pngName);
  
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        reject(new Error(`File path ${filePath} does not exist`));
      }
      resolve(filePath);
    } catch (err) {
      console.error("Error checking file existence:", err);
      reject(err);
    }
  });
};

// Authenticate when the module is loaded
authenticate().catch((err) => {
  console.error("Failed to authenticate Sheets Bot:", err);
});

module.exports = {
  authenticate,
  getData,
  getImage,
  handleImage,
  downloadFile,
  generateUniqueID,
};
