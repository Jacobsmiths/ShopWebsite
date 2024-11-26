import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";
import fetchJSONData from "../utils/JsonFetch.js";
import fs from "fs";

/**
 * almost everything done here is taken from:
 * https://www.codecademy.com/learn/connecting-javascript-and-sql/modules/learn-node-sqlite-module/cheatsheet
 */

// sets up current directory name
const __filename = fileURLToPath(import.meta.url);
const __serverDirname = path.dirname(path.dirname(__filename));

// Define the path to the SQLite database file and creates it if it doens't exist
const dbPath = path.join(__serverDirname, "products.db");

// Initialize SQLite to be verbose
sqlite3.verbose();

let db = null;

export const createDatabase = () => {
  // this ceates the databse/.sqlite file it is not created already or links it if it has
  let newdb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      new Error(err);
    } else {
      createProductTable(newdb);
      console.log("Database created");
    }
  });
  return newdb;
};

const createProductTable = (newdb) => {
  // String injected into the db.run method below
  const createSqlTable =
    "CREATE TABLE products (id TEXT PRIMARY KEY, name TEXT NOT NULL,description TEXT, price REAL NOT NULL, stock REAL NOT NULL, image_url TEXT)";

  // Create the products table if it doesn't exist
  newdb.exec(createSqlTable, (err) => {
    if (err) {
      new Error(err);
    } else {
      populateNewDB(newdb);
      console.log("Products table was made");
    }
  });
};

const populateNewDB = (newdb) => {
  const JSObj = fetchJSONData();
  JSObj.forEach((product) => {
    newdb.run(
      `INSERT INTO products (id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)`,
      [
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
      ],
      (err) => {
        if (err) {
          new Error(
            `Insert failed for product:  ${product.name} Error: ${err.message}`
          );
        } else {
          console.log("Insert successful for product:", product.name);
        }
      }
    );
  });
};

if (!fs.existsSync(dbPath)) {
  console.log("Database does not exist. Creating...");
  db = createDatabase();
} else {
  db = new sqlite3.Database("products.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return new Error(err);
    }
  });
}

const checkEntryExists = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(
          new Error(`Failed to check if entry exists in database: ${err}`)
        );
      } else if (row) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// **************** below are the functions using the databse *****************

// this creates a new promise to be returned based on if there is a limit or not and returns a json object if resolved
export const getEntries = async (limit) => {
  return new Promise((resolve, reject) => {
    let jsonObject;
    let query;
    let params = [];
    if (!isNaN(limit) && limit > 0) {
      // is there a limit, if so apply it to the query else not
      query = "SELECT * FROM products LIMIT ?";
      params = [limit];
    } else {
      query = "SELECT * FROM products";
    }

    // this is the query from the database, taking in an anonymous callback function
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(new Error(err)); // reject promise if there is an error
      } else {
        jsonObject = rows.map((row) => ({
          id: row.id,
          name: row.name,
          price: row.price,
          description: row.description,
          stock: row.stock,
        })); // this is a mapping function to create a json object
        resolve(jsonObject);
      }
    });
  });
};

export const getEntry = async (id) => {
  return new Promise((resolve, reject) => {
    if (!isNaN(id) && id > 0) {
      let query = "SELECT * FROM products WHERE id = ?";
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row) {
          resolve({
            id: row.id,
            name: row.name,
            price: row.price,
            description: row.description,
            stock: row.stock,
          });
        } else {
          reject(new Error("The Id you are looking for couldnt be found"));
        }
      });
    } else {
      reject(
        new Error("Product ID you are fetching is negative or not a number")
      );
    }
  });
};

export const addEntry = async (jsonElement) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO products (id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [
        jsonElement.id,
        jsonElement.name,
        jsonElement.description,
        jsonElement.price,
        jsonElement.stock,
      ],
      (err) => {
        if (err) {
          reject(
            new Error(
              `Insert failed for product:  ${jsonElement.name} Error: ${err.message}`
            )
          );
        } else {
          resolve("Insert successful for product:", jsonElement.name);
        }
      }
    );
  });
};

export const deleteEntry = async (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
      if (err) {
        reject(
          new Error(
            `deletion failed for product with id: ${id} Error: ${err.message}`
          )
        );
      } else {
        // technically if no product is found then I think nothing happens so its not a successful deletion just doesn't exist in database
        resolve(`Deletion for product with id: ${id} successful`);
      }
    });
  });
};

export const updateEntry = async (jsonElement) => {
  const id = parseInt(jsonElement.id);
  const query = `UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(
      query,
      [
        jsonElement.name,
        jsonElement.description,
        jsonElement.price,
        jsonElement.stock,
        jsonElement.id,
      ],
      (err) => {
        if (err) {
          reject(
            new Error(`Updating product with id: ${id} was failure: ${err}`)
          );
        } else {
          resolve(`Updating product with id: ${id} was a success`);
        }
      }
    );
  });
};

export const insertUpdateEntries = async (objList) => {
  return new Promise(async (resolve, reject) => {
    try {
      objList.forEach(async (product) => {
        await db.run(
          "INSERT INTO products (id, name, price, description, stock) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET",
          [
            product.id,
            product.name,
            product.price,
            product.description,
            product.stock,
          ],
          (err) => {
            reject(
              new Error(
                `Failed to isert or update: ${product.name}, message: ${err}`
              )
            );
          }
        );
      });

      resolve(
        "Succeeded in inserting or updating databse given list of entries"
      );
    } catch (err) {
      reject(
        new Error(`Failed to Insert or Update given list of Entires: ${err}`)
      );
    }
  });
};
