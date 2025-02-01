// Dependencies:

const express = require("express");
const router = new express.Router();
const controller = require("../controllers/vehicles");
const validator = require("../utilities/vehicles");
const idValidation = require("../utilities/");

// GET routes:

router.get("/", controller.getAllVehicles);
router.get("/:id", idValidation.verify, controller.getVehicle);

// POST routes:

router.post(
  "/",
  idValidation.IsAuthenticated,
  validator.vehicleDataRules(),
  validator.checkVehicleData,
  controller.addVehicle,
);

// PUT routes:

router.put(
  "/:id",
  idValidation.IsAuthenticated,
  idValidation.verify,
  validator.vehicleDataRules(),
  validator.checkVehicleData,
  controller.updateVehicle,
);

// DELETE routes:

router.delete("/:id", idValidation.IsAuthenticated, idValidation.verify, controller.deleteVehicle);

// Export router:

module.exports = router;
