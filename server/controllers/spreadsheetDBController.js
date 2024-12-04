import { google } from "googleapis";
import { fileURLToPath } from "url";
import path from "path";

// this defines a few constant global variables and paths to key information
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KEY_FILE_PATH = path.join(__dirname, "../PaintBot.json");
const SPREAD_SHEET_ID = process.env.SpreadSheet_ID;
const rangeVar = "Data!C2:G10";

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

export const getData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREAD_SHEET_ID,
        range: rangeVar, // THIS IS THE RANGE THAT
      });

      console.log(data.data.values);
      resolve(data.data.values);
    } catch (err) {
      reject(new Error(err));
    }
  });
};

authenticate().catch((err) => {
  new Error(`failed the authenticate Sheets Bot!: ${err}`);
});
