require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
  logLevel: process.env.LOG_LEVEL || "info",
  // Additional configuration as needed can added below
};

module.exports = config;
