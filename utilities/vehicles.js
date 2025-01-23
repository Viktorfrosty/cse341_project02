// Dependencies:

require("dotenv").config();
const { body, validationResult } = require("express-validator");

// Functions:

// Store data ruleset.
function vehicleDataRules() {
  return [
    body("carName")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Car name must be alphanumeric."),
    body("manufacturer")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Manufacturer must be alphanumeric."),
    body("model")
      .matches(/^[a-zA-Z0-9-]+$/)
      .withMessage("Model must be alphanumeric."),
    body("year")
      .matches(/^\d{4}$/)
      .withMessage("Year must be a four-digit number."),
    body("color")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Color must be alphanumeric."),
    body("engineType")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Engine type must be alphanumeric."),
    body("price").matches(/^\d+$/).withMessage("Price must be a number."),
    body("description")
      .matches(/^[a-zA-Z0-9 .,'-]+$/)
      .withMessage("Description must be alphanumeric."),
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
