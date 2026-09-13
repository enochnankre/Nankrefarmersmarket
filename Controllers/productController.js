const product = require('../models/product.model');
const upload = require('../middleware/upload');
const sendEmail = require('../middleware/emailsender.js');

exports.createProduct = async (req, res) => {
  try {
    const { name, size, description, price, quantity } = req.body;
    if ([name, size, description, price, quantity].some((value) => value === undefined || value === '')) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new product(req.body);
    await newProduct.save();
    
    
    const subject = 'New Product Created';
    const text = `A new product has been created:\n\nName: ${newProduct.name}\nSize: ${newProduct.size}\nDescription: ${newProduct.description}\nPrice: ${newProduct.price}\nQuantity: ${newProduct.quantity}`;
    await sendEmail('julianmarroyo51@gmail.com', subject, text);


    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Something went wrong' });
  }
};



exports.createproductwithimage = async (req, res) => {
  try {
   
    if ([!req.body.name, req.body.size, req.body.description, req.body.price, req.body.quantity].some((value) => value === undefined || value === '')) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading image', error: err.message });
      }

      
    const { name, size, image, description, price, quantity } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'please upload an image' });
    }
    const newProduct = new product({
      name,
      size,
      color,
      description,
      price,
      quantity,
      ...req.body,
      image: req.file.path
    });
    await newProduct.save();
    return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Something went wrong' });
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

exports.getproductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!product.db.base.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const foundProduct = await product.findById(id);

    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product retrieved successfully', product: foundProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving product', error: error.message });
  
  }
};

exports.getallProducts = async (req, res) => {
  try {
    const products = await product.find();
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};
