// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product.model.js"); // Import the Product model
const productRoute = require("./routes/product.route.js");

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);

// Centralized error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details
  res.status(500).json({ message: "Something went wrong!" }); // Send generic error response
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI) // Use environment variable for MongoDB URI
  .then(() => {
    console.log("Connected to the Database");

    // Use environment variable for PORT or default to 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the Database", err); // Log connection errors
  });
