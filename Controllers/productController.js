const product = require('../models/product.model');

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size, color, description, price, quantity } = req.body;

    if ([name, size, description, price, quantity].some((value) => value === undefined || value === '')) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { name, size, color, description, price, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};


    
    