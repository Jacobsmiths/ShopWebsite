import express from "express";
import {
  getEntries,
  getEntry,
  addEntry,
  deleteEntry,
  updateEntry,
  insertUpdateEntries,
} from "../controllers/productsDBController.js";
import { getData, getImage } from "../controllers/spreadsheetDBController.js";

const router = express.Router();

const getProducts = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  getEntries(limit)
    .then((obj) => {
      return res.status(200).json(obj);
    })
    .catch((err) => {
      next(new Error(`Database query failed: ${err}`));
    });
};

const getProduct = async (req, res, next) => {
  const id = req.params.id;
  if (typeof id != "number") return next();
  getEntry(id)
    .then((obj) => {
      return res.status(200).json(obj);
    })
    .catch((err) => {
      next(new Error(`Database query failed: ${err}`));
    });
};

const addProduct = async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
  };

  addEntry(product)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  deleteEntry(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

const updateProduct = async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
  };
  updateEntry(product)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

const fetchSheet = async (req, res, next) => {
  const data = await getData();

  insertUpdateEntries(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

const fetchImage = async (req, res, next) => {
  const id = req.params.id;
  if (typeof id == "number") {
    next(new Error("id is not a number"));
  }

  try {
    const obj = await getEntry(id);
    const filePath = await getImage(obj.name);
    return res.status(200).sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

router.get("/fetchsheet", fetchSheet);
router.get("/gallery/:id", fetchImage);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/", updateProduct);

export default router;
