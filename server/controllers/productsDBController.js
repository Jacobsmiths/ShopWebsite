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

// Define the path to the SQLite database file and creates it if it doens't exist
const dbPath = "products.db";

// Initialize SQLite to be verbose
sqlite3.verbose();

const createProductTable = (newdb) => {
  // String injected into the db.run method below
  const createSqlTable =
    "CREATE TABLE products (id TEXT PRIMARY KEY, name TEXT NOT NULL,description TEXT, price REAL NOT NULL, image_url TEXT)";
  newdb.exec(createSqlTable, (err) => {
    if (err) {
      return err;
    }
    try {
      console.log("Products table was created");
    } catch (err) {
      return err;
    }
  });
};

const setUpDatabase = () => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return err;
    }
  });
  createProductTable(db);
  return db;
};

let db = setUpDatabase();

// **************** below are the functions using the databse *****************

// this is used to see if the database exists
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

// this creates a new promise to be returned based on if there is a limit or not and returns a json object if resolved
export const getEntries = async (limit) => {
  return new Promise(async (resolve, reject) => {
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
    await db.all(query, params, async (err, rows) => {
      if (err) {
        reject(new Error(err)); // reject promise if there is an error
      } else {
        jsonObject = await rows.map((row) => ({
          id: row.id,
          name: row.name,
          price: row.price,
          description: row.description,
          image_url: row.image_url,
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
            image_url: row.image_url,
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
      "INSERT INTO products (id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)",
      [
        jsonElement.id,
        jsonElement.name,
        jsonElement.description,
        jsonElement.price,
        jsonElement.image_url,
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
  const query = `UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.run(
      query,
      [
        jsonElement.name,
        jsonElement.description,
        jsonElement.price,
        jsonElement.image_url,
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

export const insertUpdateEntries = async (sheetsList) => {
  db.serialize(() => {
    try {
      db.run("BEGIN TRANSACTION");

      db.run("DELETE FROM products");

      const stmt = db.prepare(
        "INSERT INTO products (id, name, price, description, image_url) VALUES (?, ?, ?, ?, ?)"
      );

      for (const product of sheetsList) {
        const id = product[4];
        const name = product[0];
        const description = product[2];
        const price = product[1];
        const image_url = product[3];
        stmt.run([id, name, price, description, image_url], (err) => {
          if (err) {
            console.error("Error inserting product:", err);
            return err;
          }
        });
      }

      stmt.finalize();
      
      db.run("COMMIT", (err) => {
        if (err) {
          console.error("Error committing transaction:", err);
        } else {
          console.log("All products inserted successfully!");
        }
      });

    } catch (err) {
      return err;
    }
  });
};
