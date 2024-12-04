import colors from "colors";

const errorHandler = (err, res = null, req = null, next = null) => {
  console.log(`Error: ${err.message}`["red"]);

  if (res) {
    res.status(404).json({ msg: err.message });
  }
  if (next) {
    next();
  }
};

export default errorHandler;
