// Dependencies:

const model = require("../models/stores");

// Functions:

// Retrieve all stores.
async function getAllStores(req, res) {
  //#swagger.tags = ["stores"]
  const result = await model.getAllStores();
  res.status(result.statusCode).send(result.info);
}

// Retrieve a single store.
async function getStore(req, res) {
  //#swagger.tags = ["stores"]
  const id = req.params.id;
  const result = await model.getStore(id);
  res.status(result.statusCode).send(result.info);
}

// Add a single store.
async function addStore(req, res) {
  //#swagger.tags = ["stores"]
  const info = req.body;
  const result = await model.addStore(info);
  res.status(result.statusCode).send(result.info);
}

// Updates a single store.
async function updateStore(req, res) {
  //#swagger.tags = ["stores"]
  const id = req.params.id;
  const info = req.body;
  const result = await model.updateStore(id, info);
  res.status(result.statusCode).send(result.info);
}

// Deletes a single store.
async function deleteStore(req, res) {
  //#swagger.tags = ["stores"]
  const id = req.params.id;
  const result = await model.deleteStore(id);
  res.status(result.statusCode).send(result.info);
}

// Export controller:

module.exports = { getAllStores, getStore, addStore, updateStore, deleteStore };
