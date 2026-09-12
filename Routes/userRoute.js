
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerUser, loginUser } = require("../Controllers/usercontroller");

router.post(
  "/createuser",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email address"),

    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
    
    body("phone")
      .trim()
      .isMobilePhone()
      .withMessage("Enter a valid phone number"),

    body("phone")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone number must be 11 characters long")
  ],
  registerUser,
);

router.post("/loginUser", loginUser);

module.exports = router;
