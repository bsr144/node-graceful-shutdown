const express = require("express");
const usersRoutes = require("./users");

const router = express.Router();

// Register the routes
router.use("/users", usersRoutes);

module.exports = router;
