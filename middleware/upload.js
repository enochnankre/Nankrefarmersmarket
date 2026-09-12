const multer= require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('../models/config/cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Nankresfarmersmarket',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

