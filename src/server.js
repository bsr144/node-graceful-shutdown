const express = require("express");
const process = require("process");
const mongoose = require("mongoose");
const config = require("./config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = config.port || 3000;

// Middleware for parsing request bodies
app.use(express.json());

// Registering routes
app.use("/api", routes);

// Attach middlewares
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown function
const gracefulShutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(async () => {
    console.log("HTTP server closed");

    await mongoose.connection.close();
    console.log("Database connection closed");

    process.exit(0);
  });
};

// Handle termination signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("SIGUSR2");
  process.kill(process.pid, "SIGUSR2");
});
