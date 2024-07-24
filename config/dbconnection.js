const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");


const mongodbAtlas_URI = process.env.MONGODB_URI || "mongodb+srv://syedjaweria2001:hsilDjMFXyXZeugl@envougethread-db.com53z8.mongodb.net/envougethread?retryWrites=true&w=majority"

const dbconnection = async () => {
    try {
        await mongoose.connect(mongodbAtlas_URI);
        console.log(`Connected to MongoDB Atlas`.bgBlue);
    } catch (error) {
        console.log(`Error in connection: ${error.message}`.bgRed);
    }
};

module.exports = dbconnection;




// syedjaweria2001
// hsilDjMFXyXZeugl
// mongodb+srv://syedjaweria2001:<password>@envougethread-db.com53z8.mongodb.net/?retryWrites=true&w=majority&appName=envougethread-db