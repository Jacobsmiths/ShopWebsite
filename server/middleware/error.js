const colors = require("colors");

const errorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.message}`.red);

  // Set status code and respond
  const statusCode = err.status || 500; // Default to 500 if no status is set
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Show stack trace only in development
  });
};

module.exports = errorHandler;
