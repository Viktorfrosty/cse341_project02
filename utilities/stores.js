// Dependencies:

const { body, validationResult } = require("express-validator");

//

// Functions:

// Add store ruleset.
function addStoreRules() {
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
      .matches(/^\\d{5}$/)
      .withMessage("Zip code must be five digits."),
    body("email")
      .matches(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/)
      .withMessage("Email must be valid."),
    body("phone")
      .matches(/^\\d{3}-\\d{4}$/)
      .withMessage("Phone number must be in the format XXX-XXXX."),
  ];
}

async function checkNewStoreData(req, next) {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { statusCode: 400, info: { message: errors.array() } };
  }
  next();
}

// Export functions:

module.exports = { addStoreRules, checkNewStoreData };
