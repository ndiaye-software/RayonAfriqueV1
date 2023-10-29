const { body } = require("express-validator");

const authValidator = [
  body("mail")
    .isEmail()
    .withMessage("email field should be a valid email")
    .normalizeEmail(),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("password field should be at least 8 characters"),
  body("phone")
    .isMobilePhone()
    .withMessage("Le champ 'phone' doit être un numéro de téléphone valide"),
];

module.exports = authValidator;
