const Cart = require('../models/cartModel');
const Product = require('../models/models'); // Adjust the path as needed

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the cart
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      // Update the quantity if the product is already in the cart
      cartItem.quantity += quantity;
    } else {
      // Add new product to the cart
      cartItem = new Cart({
        productId,
        quantity
      });
    }

    await cartItem.save();

    res.status(200).json({
      message: 'Product added to cart',
      cartItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding to cart' });
  }
};

// GETTING PRODUCTS
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');

    const detailedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        return {
          ...item._doc,
          name: product.name,
          price: product.price,
          size: product.size,
          quantity: item.quantity, // Include the quantity from the cart item
          image: product.image, // Add this if the product has an image field
        };
      })
    );

    res.status(200).json(detailedCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving cart' });
  }
};

// GETTING PRODUCT BY ID
const getProductById = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'An error occurred while retrieving product details' });
  }
};

// REMOVE PRODUCT FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while removing from cart' });
  }
};


// update cart item quantity (increase)
  const incQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity += 1;
    await item.save();
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// update cart item quantity (decrease)
const decQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.quantity > 1) {
        item.quantity -= 1;
        await item.save();
    }
    else{
      await Cart.findByIdAndDelete(id);
    }
    
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = { addToCart, getCart, removeFromCart, getProductById, incQuantity, decQuantity };
