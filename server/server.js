import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import errorHandler from './middleware/error.js'

// constants declaration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 8080;


// creates an express app
const app = express();
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});

