// Dependencies:

const express = require("express");
const router = new express.Router();
const controller = require("../controllers/stores");
const validator = require("../utilities/stores");

// GET routes:

router.get("/", controller.getAllStores);
router.get("/:id", validator.verifyId, controller.getStore);

// POST routes:

router.post("/", validator.storeDataRules(), validator.checkStoreData, controller.addStore);

// PUT routes:

router.put("/:id", validator.verifyId, validator.storeDataRules(), validator.checkStoreData, controller.updateStore);

// DELETE routes:

router.delete("/:id", validator.verifyId, controller.deleteStore);

// Export router:

module.exports = router;
