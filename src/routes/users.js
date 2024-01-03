const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

// GET /users - Get a list of users
router.get("/", usersController.listUsers);

// GET /users/:id - Get a single user by ID
router.get("/:id", usersController.getUserById);

// POST /users - Create a new user
router.post("/", usersController.createUser);

// PUT /users/:id - Update a user by ID
router.put("/:id", usersController.updateUser);

// DELETE /users/:id - Delete a user by ID
router.delete("/:id", usersController.deleteUser);

module.exports = router;
