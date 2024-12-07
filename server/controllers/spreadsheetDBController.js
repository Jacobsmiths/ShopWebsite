import { google } from "googleapis";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";

// this defines a few constant global variables and paths to key information
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KEY_FILE_PATH = path.join(__dirname, "../PaintBot.json");
const SPREAD_SHEET_ID = process.env.SpreadSheet_ID;
const rangeVar = "Data!C2:G10";
const picturesFolder = path.join(__dirname, "../pictures");

// this defines the sheets object to use and then the authenticator client which is our bot
const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"], // Read-only access to Sheets definition
});

// Authenticate/ set global authenticator client for API requests
export const authenticate = async () => {
  try {
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
    console.log("Successfully authenticated!");
  } catch (err) {
    return err;
  }
};

// given an image id, it will return an image url
const getImageURL = (imageID) => {
  return `https://drive.google.com/uc?id=${imageID}`;
};

const getImageID = async (originalURL) => {
  return new Promise((resolve, reject) => {
    try {
      let start = originalURL.indexOf("/d/") + 3;
      let end = originalURL.indexOf("/view");
      resolve(originalURL.slice(start, end));
    } catch (err) {
      reject(err);
    }
  });
};

const downloadFile = async (url, fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        reject(new Error(`Failed to fetch: ${response.statusText}`));
      }

      let savePath = path.join(picturesFolder, `./${fileName}.png`);
      const fileStream = fs.createWriteStream(savePath);

      response.body.pipe(fileStream);
      resolve(savePath);
    } catch (err) {
      reject(`Error fetching the file: ${err}`);
    }
  });
};

const handleImage = async (originalUrl, imageName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let imageId = await getImageID(originalUrl);
      let imageUrl = getImageURL(imageId);
      let filePath = await downloadFile(imageUrl, imageName);
      resolve(filePath);
    } catch (err) {
      reject(err);
    }
  });
};

// this returns the data to store in the database
export const getData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREAD_SHEET_ID,
        range: rangeVar, // THIS IS THE RANGE THAT
      });

      let values = data.data.values;
      console.log(values);

      for (let i = 0; i < values.length; i++) {
        let filePath = await handleImage(values[i][4], values[i][1]).catch(
          (err) => {
            reject(err);
          }
        );
        values[i][4] = filePath;
      }

      console.log(values);

      resolve(values);
    } catch (err) {
      reject(err);
    }
  });
};

export const getImage = async (fileName) => {
  let pngName = `${fileName}.png`;
  let filePath = path.join(picturesFolder, pngName);
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        reject(new Error(`File path ${filePath} does not exist`));
      }
      resolve(filePath);
    } catch (err) {
      reject(err);
    }
  });
};

authenticate().catch((err) => {
  new Error(`failed the authenticate Sheets Bot!: ${err}`);
});
