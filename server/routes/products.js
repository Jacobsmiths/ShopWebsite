const express = require("express");
const {
  getEntries,
  getEntry,
  addEntry,
  deleteEntry,
  updateEntry,
  checkEntryExistsFromName,
  compareEntry,
  removeElementsNotInList,
} = require("../controllers/productsDBController");
const {
  getData,
  getImage,
  handleNewEntry,
  appendToSheet,
} = require("../controllers/spreadsheetDBController");
const {
  retrieveSessionStatus,
  retrieveCheckoutSession,
} = require("../controllers/paymentController");

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
    image_url: req.body.image_url,
    available: req.body.available,
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
  try {
    const sheetElements = await getData(); // get data returns a list of json elements directly whats on the spreadsheet
    // images is an image string which is comma seperated urls
    let names = [];
    for (element in sheetElements) {
      names.push(sheetElements[element].name);
      if (sheetElements[element].name != "") {
        if (await checkEntryExistsFromName(sheetElements[element].name)) {
          let comparison = await compareEntry(sheetElements[element]);
          if (comparison != null) {
            let temp = {
              ...sheetElements[element],
              ...{ id: comparison, available: true },
            };
            await updateEntry(temp); // this updates everything except images
          }
        } else {
          const newEntry = await handleNewEntry(sheetElements[element]);
          console.log(`New entry: ${newEntry.image_url}`);
          await addEntry(newEntry);
        }
      }
    }
    await removeElementsNotInList(names);
    res.status(200).json(JSON.stringify({ Success: true }));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const fetchImage = async (req, res, next) => {
  const id = req.params.id;
  try {
    const obj = await getEntry(id);
    const filePath = await getImage(obj.image_url);
    return res.status(200).sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

const onConfirm = async (req, res, next) => {
  const event = req.body;
  let recieve = false;
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object;
      const ids = checkoutSession.metadata.id.split(',');
      try {
        for (const id of ids) {
          const obj = await getEntry(id);
          const paintingName = obj.name;
          const address = checkoutSession.shipping_details.address;
          const email = checkoutSession.customer_details.email;
          const customerName = checkoutSession.customer_details.name;
          
          let shippingMethod;
          if (checkoutSession.total_details.amount_shipping === 0) {
            shippingMethod = "Pick Up";
          } else {
            shippingMethod = "Standard Shipping";
          }
          await updateEntry({ id: id, available: false });
          await appendToSheet({
            id: paintingName,
            address: address,
            email: email,
            shippingMethod: shippingMethod,
            customer: customerName,
          });
        }
        recieve = true;
      } catch (err) {
        console.log(`There was an error updating the product(s) to be unavailable`);
        next(
          new Error(
            "There was an error changing the availability of the product(s) once bought"
          )
        );
        recieve = false;
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
      next(new Error(`Unhandled event type ${event.type}`));
      recieve = false;
      break;
  }
  res.status(200).json({ received: recieved });
};


router.post("/create-checkout-session", retrieveCheckoutSession);
router.post("/session-status", retrieveSessionStatus);
router.get("/fetchsheet", fetchSheet);
router.get("/gallery/:id", fetchImage);
router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/payment-confirmed", onConfirm);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/", updateProduct);

module.exports = router;
