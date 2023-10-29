const { validationResult } = require("express-validator");
const { logger } = require("../../middleware/logger");
/**
 *
 * @param {ValidationChain[]} validations inputs validator to validate
 * @returns 400 Bad request with error messages or go to the next middleware
 */
const validate = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    logger(req, res, next); // Log the error
    return res.status(400).json({
      status: "Bad Request",
      error: errors,
    });
  }

  return next();
};

module.exports = validate;
