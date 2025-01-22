// Swagger routes.

// Dependencies:
const express = require("express");
const router = new express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/", swaggerUi.serve);

// GET routes:
router.get("/", swaggerUi.setup(swaggerDocument));

// Export router.
module.exports = router;
