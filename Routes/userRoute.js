
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerUser } = require("../Controllers/usercontroller");

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
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .isUppercase()
      .withMessage("Password must contain at least one uppercase letter")
      .isLowercase()
      .withMessage("Password must contain at least one lowercase letter"),

    body("phone")
      .trim()
      .isMobilePhone()
      .withMessage("Enter a valid phone number"),

    body("phone")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone number must be 11 characters long")
  ],
  registerUser
);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const userController = require("../Controllers/usercontroller");

// router.post("/register", userController.registerUser);
// router.post("/login", userController.loginUser);

// module.exports = router;