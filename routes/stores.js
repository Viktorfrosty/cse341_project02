// Dependencies:

const express = require("express");
const router = new express.Router();
const controller = require("../controllers/stores");
const validator = require("../utilities/stores");

// GET routes:

router.get("/", controller.getAllStores);
router.get("/:id", controller.getStore);

// POST routes:

router.post("/", validator.addStoreRules(), validator.checkNewStoreData, controller.addStore);

// PUT routes:

router.put("/:id", controller.updateStore);

// DELETE routes:

router.delete("/:id", controller.deleteStore);

// Export router:

module.exports = router;
