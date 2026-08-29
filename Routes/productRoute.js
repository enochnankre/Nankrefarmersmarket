const express = require('express');

const productController = require('../Controllers/productController');

const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Product created",
    product: req.body
  });
});


app.use("/products", productRoutes);

router.post('/createproducts', productController.createProduct);

router.put('/updateproducts/:id', productController.updateProducts);


module.exports = router;
