const express = require("express");
const { saveProduct, getProduct, deleteProduct, updateProduct, getsingleProduct } = require("../controllers/productController");
const upload = require("../multer/multer");

const router = express.Router();

router.post("/addproduct", upload.single('image'), saveProduct);
router.get("/getproduct", getProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProduct);
router.get("/getsingleproduct/:id", getsingleProduct);

module.exports = router;
