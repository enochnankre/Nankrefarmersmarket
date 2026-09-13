const multer= require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME = 'loe2vdmv',
  api_key: process.env.CLOUDINARY_API_KEY = '875412177877253',
  api_secret: process.env.CLOUDINARY_API_SECRET = 'VvWJ272VZeM3cx1rA35dTGAHVmw'
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Nankresfarmersmarket',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
