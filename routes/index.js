// Default routes.

// Dependencies:
const express = require("express");
const router = new express.Router();
const defaultController = require("../controllers/");

// GET routes:
router.get("/", defaultController.status);

// Export router.
module.exports = router;
