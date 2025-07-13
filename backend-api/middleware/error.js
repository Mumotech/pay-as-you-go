module.exports = (err, req, res, next) => {
  // Log the error stack for debugging (optional: disable in production)
  console.error(err.stack);

  // Handle specific error types
  if (err.name === "ValidationError") {
    // Mongoose validation error
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      messages,
    });
  }

  if (err.name === "CastError") {
    // Mongoose invalid ObjectId error
    return res.status(400).json({
      success: false,
      error: "Invalid ID",
      msg: `Resource not found with ID: ${err.value}`,
    });
  }

  if (err.code === 11000) {
    // Mongoose duplicate key error
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      error: "Duplicate Key Error",
      msg: `Duplicate value for field: ${field}`,
    });
  }

  // Handle custom errors (if you throw custom errors with a `status` property)
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      error: err.name || "Error",
      msg: err.message,
    });
  }

  // Default to 500 Internal Server Error
  res.status(500).json({
    success: false,
    error: "Server Error",
    msg: err.message || "Internal Server Error",
  });
};
