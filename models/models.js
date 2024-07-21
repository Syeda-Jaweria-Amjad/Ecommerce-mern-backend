const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'no-image.jpg' // Default image if none provided
    },
    oldPrice: {
        type: Number,
    },
    currentPrice: {
        type: Number,
        // required: true
    },
    category: {
        type: String,
        // required: true,
        trim: true,
    },
    size: {
        type: [String],
        // required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    ratings: {
        type: Number,
        default: 0, // Default rating if none provided
        min: 0,
        max: 5
    },
    isAvailable: {
        type: Boolean,
        default: true // Default to available
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
const Product = mongoose.model('products', productSchema);
module.exports = Product;


