const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/users.models.js");

const registerUser = async (req, res) => {
  try {
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, username, gender, address, role, hasadminacess } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      username,
      gender,
      address,
      role: role || 'user',
      hasadminacess: hasadminacess || false
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Something went wrong' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: foundUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'error logging in' });
  }
};

module.exports = {
  registerUser,
  createUser,
  loginUser
};
