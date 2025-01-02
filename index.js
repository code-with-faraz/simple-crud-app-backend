const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js"); // Import the Product model
const productRoute = require("./routes/product.route.js");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://farazmirza1023:4hC9fZ8H1L52yH5D@backenddb.oww1x.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to the Database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the Database", err);
  });
