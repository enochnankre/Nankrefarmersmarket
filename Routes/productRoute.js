const express = require('express');

const productController = require('../Controllers/productController');

const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Product created",
    product: req.body
  });
});

router.post('/createproducts', productController.createProduct);

router.put('/updateproducts/:id', productController.updateProducts);


module.exports = router;


// const express = require("express");
// const router = express.Router();

// const { createProduct } = require("../Controllers/productController");

// router.post("/", createProduct);

// module.exports = router;