const Product = require("../models/models");

// SAVE PRODUCT IN DATABASE
const saveProduct = async (req, res) => {
    try {
        const { name, description, oldPrice, currentPrice, category, size, ratings } = req.body;
        const file = req.file;

        // Check if file exists and is valid
        if (!file) {
            return res.status(400).send({ message: "File upload is required" });
        }

        const { filename } = file;

        // Input validation
        if (!name || !description) {
            return res.status(400).send({ message: "Name and description are required" });
        }

        let userData = {
            name: name,
            description: description,
            image: filename,
            oldPrice: oldPrice,
            currentPrice: currentPrice,
            category: category,
            size: size,
            ratings: ratings
        };

        let finalProduct = await new Product(userData).save();

        if (finalProduct) {
            return res.status(202).json({
                status: 202,
                success: true,
                message: "Product created successfully",
                finalProduct
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Error in product creation",
                finalProduct
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while saving the product" });
    }
};

// GETTING PRODUCTS FROM DATABASE
const getProduct = async(req, res)=>{
    const result = await Product.find()

    if(result){
        res.status(202).send(result)
    }
    
}

// DELETING PRODUCTS FROM DATABASE
const deleteProduct = async(req, res)=>{
    const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
}

// UPDATE PRODUCT TO DATABASE
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        // Validate update data here if needed

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Product updated successfully',
            updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the product', error });
    }
};

// GETTING SINGLE PRODUCT BY ID
const getsingleProduct = async(req, res)=>{

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (product) {
          res.json(product);
        } else {
          res.status(404).send('Product not found');
        }
    }
    catch (error) {
        res.status(500).send('Server error');
    }
}


module.exports = {saveProduct, getProduct, deleteProduct, updateProduct, getsingleProduct}
