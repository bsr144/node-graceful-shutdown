const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace from both ends
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Converts email to lowercase
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // You can add additional fields as needed
    // createdAt and updatedAt fields are automatically managed by Mongoose
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
