import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import Error from './middleware/error.js';
import { dirname, join } from 'path';

// sets up current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the SQLite database file and creates it if it doens't exist
const dbPath = path.join(__dirname, 'products.db');

// Initialize SQLite to be verbose
sqlite3.verbose();

// creates db object that establishes connection between the object and the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        new Error(err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Creates table if it doesn't exist
const createSqlTable = `products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            image_url TEXT
        )`;

// Create the products table if it doesn't exist
db.serialize(() => {
    db.run(
        createSqlTable, 
        (err) => {
            if (err) {
                new Error(err);
            } else {
                console.log('Products was made');
            }
        }
    );
});



// Export the database connection
export default db;