const express = require('express');

const { protect } = require('../middleware/auth');

const {authorize} = require('../middleware/role');

const productController = require('../Controllers/productController');

const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Product created",
    product: req.body
  });
});

router.post('/createproducts', protect,authorize('superadmin'), productController.createProduct);

router.put('/updateproducts/:id', protect,authorize('superadmin'),authorize('storekeeper'), productController.updateProducts);

router.get('/getproduct/:id', productController.getproductById);

router.get('/getallproducts', productController.getallProducts);

module.exports = router;


// const express = require("express");
// const router = express.Router();

// const { createProduct } = require("../Controllers/productController");

// router.post("/", createProduct);

// module.exports = router;