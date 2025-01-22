// Contacts Controller.

// Dependencies:
const contactsModel = require("../models/contacts");

// Functions:

// Retrieve all contacts.
async function getAllContacts(req, res) {
  //#swagger.tags = ["Contacts"]
  const result = await contactsModel.getAllContacts();
  res.status(result.statusCode).send(result.info);
}

// Retrieve a single contact.
async function getContact(req, res) {
  //#swagger.tags = ["Contacts"]
  const id = req.params.id;
  const result = await contactsModel.getContact(id);
  res.status(result.statusCode).send(result.info);
}

// Add a single contact.
async function addContact(req, res) {
  //#swagger.tags = ["Contacts"]
  const info = req.body;
  const result = await contactsModel.addContact(info);
  res.status(result.statusCode).send(result.info);
}

// Updates a single contact.
async function updateContact(req, res) {
  //#swagger.tags = ["Contacts"]
  const id = req.params.id;
  const info = req.body;
  const result = await contactsModel.updateContact(id, info);
  res.status(result.statusCode).send(result.info);
}

// Deletes a single contact.
async function deleteContact(req, res) {
  //#swagger.tags = ["Contacts"]
  const id = req.params.id;
  const result = await contactsModel.deleteContact(id);
  res.status(result.statusCode).send(result.info);
}

// Export controller.
module.exports = { getAllContacts, getContact, addContact, updateContact, deleteContact };
