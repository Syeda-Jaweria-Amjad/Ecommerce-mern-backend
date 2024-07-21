const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  }
});

module.exports = mongoose.model('Cart', CartSchema);
