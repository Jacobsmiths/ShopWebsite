const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

// Define a few constant global variables and paths to key information
const KEY_FILE_PATH = path.join(__dirname, "../PaintBot.json");
const SPREAD_SHEET_ID = process.env.SpreadSheet_ID;
const rangeVar = "Data!C2:K50";
const rangeVar2 = "Shipping!A1";
const imagesFolder = path.join(__dirname, "../public/images");
const imagePath = "/images/";

// Variables to handle spreadsheet columns
const nameElement = 0;
const priceElement = 1;
const descriptionElement = 2;
const imageElement = 4;
const dimensionElement = 3;

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

      const fixedFileName = fileName.replace(/ /g, "-") + ".jpg";
      const savePath = path.join(imagesFolder, `${fixedFileName}`);
      console.log(savePath);
      const fileStream = await fs.createWriteStream(savePath);
      await response.body.pipe(fileStream);
      const stuffPath = path.join(imagePath, `${fixedFileName}`);
      console.log(stuffPath);
      resolve(stuffPath);
    } catch (err) {
      console.error("Error downloading file:", err);
      reject(`Error fetching the file: ${err}`);
    }
  });
};

// Handle image processing: downloading and storing
const handleImage = async (urlString, imageName) => {
  const arr = urlString.split(",");
  return new Promise(async (resolve, reject) => {
    let filePaths = [];
    try {
      if (arr) {
        for (element in arr) {
          let imageId = await getImageID(arr[element]);
          let imageUrl = await getImageURL(imageId);
          let sanitizedName =
            imageName.replace(/[^a-zA-Z ]/g, "") + `-${element}`;
          let filePath = await downloadFile(imageUrl, sanitizedName);
          filePaths.push(filePath);
        }
        resolve(filePaths.join());
      } else {
        resolve(filePaths.join());
      }
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

      const values = data.data.values; // values is 2d array of what is in the database
      console.log(values);

      let jsonList = [];

      if (values && values.length > 0) {
        for (let i = 0; i < values.length; i++) {
          let imagesString = "";
          if (values[i][imageElement] != "") {
            let images = values[i].slice(imageElement);
            imagesString = images.join();
          }
          jsonList.push({
            name: values[i][nameElement] || "", // Fallback to an empty string if undefined.
            price: values[i][priceElement] || 0, // Fallback to 0 if undefined.
            description: values[i][descriptionElement] || "", // Fallback to an empty string.
            dimension: values[i][dimensionElement] || "",
            imageString: imagesString, // image string is either the list of the images starting with the image to be on the first page or nothing
          });
        }
      } else {
        console.log("Spreadsheet is empty.");
      }
      resolve(jsonList);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// this is given the data from the sheets and handles making new id and other stuff
const handleNewEntry = async (entry) => {
  // entry looks like {name, description, price, imageString}
  const { name, price, description, dimension, imageString } = entry;
  console.log(name, price, description, dimension, imageString);

  return new Promise(async (resolve, reject) => {
    try {
      const filePathString = await handleImage(imageString, name);
      console.log(filePathString);
      const imageID = await generateUniqueID();
      const fullEntry = {
        id: imageID,
        imageString: filePathString,
        available: true,
        name: entry.name,
        description: entry.description,
        price: entry.price,
        dimension: entry.dimension,
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
  const filePath = path.join(
    path.join(path.dirname(__dirname), "../frontend/public/"),
    fileName
  );

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

const appendToSheet = async ({
  id,
  address,
  email,
  shippingMethod,
  customer,
}) => {
  const usableAddress = defineAddress(address);
  console.log(id, usableAddress, email, shippingMethod, customer);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREAD_SHEET_ID,
      range: rangeVar2,
      valueInputOption: "RAW",
      resource: {
        values: [[id, usableAddress, email, shippingMethod, customer]],
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
