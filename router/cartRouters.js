const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, incQuantity, decQuantity } = require('../controllers/cartController');

router.post('/add-to-cart', addToCart);
router.get('/cart', getCart);
router.delete('/cart/:id', removeFromCart);
router.put('/cart/:id/increase', incQuantity);
router.put('/cart/:id/decrease', decQuantity);

module.exports = router;
