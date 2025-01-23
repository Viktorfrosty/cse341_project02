// Dependencies:

const express = require("express");
const router = new express.Router();
const controller = require("../controllers/stores");
const validator = require("../utilities/stores");
const idValidation = require("../utilities/");

// GET routes:

router.get("/", controller.getAllStores);
router.get("/:id", idValidation.verify, controller.getStore);

// POST routes:

router.post("/", validator.storeDataRules(), validator.checkStoreData, controller.addStore);

// PUT routes:

router.put("/:id", idValidation.verify, validator.storeDataRules(), validator.checkStoreData, controller.updateStore);

// DELETE routes:

router.delete("/:id", idValidation.verify, controller.deleteStore);

// Export router:

module.exports = router;
