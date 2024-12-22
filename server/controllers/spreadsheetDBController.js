const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

// Define a few constant global variables and paths to key information
const KEY_FILE_PATH = path.join(__dirname, "../PaintBot.json");
const SPREAD_SHEET_ID = process.env.SpreadSheet_ID;
const rangeVar = "Data!C2:F30";
const rangeVar2 = "Shipping!A1";
const imagesFolder = path.join(
  path.dirname(__dirname),
  "../frontend/public/images"
);
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
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Read-only access to Sheets
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
    const start = originalURL.indexOf("/d/") + 3;
    const end = originalURL.indexOf("/view");
    resolve(originalURL.slice(start, end));
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
      const fileStream = await fs.createWriteStream(savePath);
      await response.body.pipe(fileStream);

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
      const imageUrl = await getImageURL(imageId);
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
      let jsonList = values.map((item) => ({
        name: item[nameElement],
        price: item[priceElement],
        image_url: item[imageElement],
        description: item[descriptionElement],
      }));
      resolve(jsonList);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

const handleNewEntry = async (entry) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = await handleImage(entry.image_url, entry.name);
      const imageID = await generateUniqueID();
      const addedElements = {
        id: imageID,
        image_url: filePath,
        available: true,
      };
      const fullEntry = {
        id: imageID,
        image_url: filePath,
        available: true,
        name: entry.name,
        description: entry.description,
        price: entry.price,
      };
      resolve(fullEntry);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

//difference between this and above is that this doesn't update images or ids
const handleUpdatedEntry = async (entry) => {
  const addedElements = { available: true };
  const fullEntry = { ...addedElements, ...entry };
  return fullEntry;
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

const defineAddress = (obj) => {
  let result = "";

  for (const key in obj) {
    if (obj[key] != null) {
      result += `${obj[key]} `;
    }
  }
  return result;
};

const appendToSheet = async ({ id, address, email }) => {
  console.log("this is the values");
  const usableAddress = defineAddress(address);
  console.log(id, usableAddress, email);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREAD_SHEET_ID,
      range: rangeVar2,
      valueInputOption: "RAW",
      resource: {
        values: [[id, usableAddress, email || ""]],
      },
    });
    console.log("Data successfully appended!");
  } catch (err) {
    console.error("Error appending data:", err);
    throw err;
  }
};

// Authenticate when the module is loaded
authenticate().catch((err) => {
  console.error("Failed to authenticate Sheets Bot:", err);
  throw new Error("Failed to authenticate Sheets Bot");
});

module.exports = {
  authenticate,
  getData,
  getImage,
  handleImage,
  downloadFile,
  generateUniqueID,
  handleNewEntry,
  handleUpdatedEntry,
  appendToSheet,
};
