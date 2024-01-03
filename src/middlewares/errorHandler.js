const errorHandler = (err, req, res, next) => {
  // Log the error for server-side debugging
  console.error(err);

  // Determine the status code: use the status code from the error if it exists, else default to 500
  const statusCode = err.statusCode || 500;

  // Send the error response
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
      // Add stacktrace if env is 'development
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};

module.exports = errorHandler;
