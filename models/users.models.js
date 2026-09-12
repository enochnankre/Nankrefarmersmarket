const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
    role: {
    type: String,
    enum: ['admin', 'user', 'superadmin', 'manager', 'sales', 'storekeeper'],
    default: 'user'
    },
  address: {
    type: String,
    required: true
  },
  
  hasadminaccess: {
    type: Boolean,
    default: false
  },


}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

