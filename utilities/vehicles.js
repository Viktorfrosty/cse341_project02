// Dependencies:

require("dotenv").config();
const { body, validationResult } = require("express-validator");

// Functions:

// Store data ruleset.
function vehicleDataRules() {
  return [
    body("storeName")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Store name must be alphanumeric."),
    body("address")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Address must be alphanumeric."),
    body("city")
      .matches(/^[a-zA-Z ]+$/)
      .withMessage("City must be alphabetic."),
    body("state")
      .matches(/^[A-Z]{2}$/)
      .withMessage("State must be a two-letter abbreviation."),
    body("zipCode")
      .matches(/^\d{5}$/)
      .withMessage("Zip code must be five digits."),
    body("email")
      .isEmail()
      .withMessage("A valid email is required.")
      .normalizeEmail()
      .withMessage("A valid email is required."),
    body("phone")
      .matches(/^\d{3}-\d{4}$/)
      .withMessage("Phone number must be in the format XXX-XXXX."),
  ];
}

// Store data validation.
async function checkVehicleData(req, res, next) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (process.env.NODE_ENV !== "production") {
      console.log({ element_id: req.params.id, message: "Request was not processed.", errors: errors.array() });
    }
    res.status(400).send({ message: "Request was not processed.", errors: errors.array() });
  } else {
    next();
  }
}

// Export functions:

module.exports = { vehicleDataRules, checkVehicleData };
