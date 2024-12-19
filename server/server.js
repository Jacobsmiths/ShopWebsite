import express from "express";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import logger from "./middleware/logger.js";
import products from "./routes/products.js";


const port = 8000;

// creates an express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

// set up routes
app.use("/api/products", products);

app.use(notFound);

app.use(errorHandler);
//This runs database.js just to see if its been made and if not it gets access to it via the db obejct
// database.js;

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
