const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors"); // Assuming you want to use colors for console output
const dbconnection = require("./config/dbconnection");
const productRouter = require("./router/productRoutes");
const cartRouter = require("./router/cartRouters");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Database connection
dbconnection();

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

// Routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.bgCyan.black);
});
