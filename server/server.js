const express = require("express");
require("dotenv").config();
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const logger = require("./middleware/logger");
const products = require("./routes/products");
const path = require("path");

const port = 8000;

// creates an express app
const app = express();
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

// set up routes
app.use("/api/products", products);

app.use(notFound);

app.use(errorHandler);

// This runs database.js just to see if it's been made and if not it gets access to it via the db object
// require("./path/to/database"); (Uncomment and adjust if required)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
