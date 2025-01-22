// Contact routes.

// Dependencies:
const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contacts");

// GET routes:
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContact);

// POST routes:
router.post("/", contactsController.addContact);

// PUT routes:
router.put("/:id", contactsController.updateContact);

// DELETE routes:
router.delete("/:id", contactsController.deleteContact);

// Export router.
module.exports = router;
