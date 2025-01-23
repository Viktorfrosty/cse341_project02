// Dependencies:

const model = require("../models/vehicles");

// Functions:

// Retrieve all vehicles.
async function getAllVehicles(req, res) {
  const result = await model.getAllVehicles();
  res.status(result.statusCode).send(result.info);
}

// Retrieve a single vehicle.
async function getVehicle(req, res) {
  const id = req.params.id;
  const result = await model.getVehicle(id);
  res.status(result.statusCode).send(result.info);
}

// Add a single vehicle.
async function addVehicle(req, res) {
  const info = req.body;
  const result = await model.addVehicle(info);
  res.status(result.statusCode).send(result.info);
}

// Updates a single vehicle.
async function updateVehicle(req, res) {
  const id = req.params.id;
  const info = req.body;
  const result = await model.updateVehicle(id, info);
  res.status(result.statusCode).send(result.info);
}

// Deletes a single vehicle.
async function deleteVehicle(req, res) {
  const id = req.params.id;
  const result = await model.deleteVehicle(id);
  res.status(result.statusCode).send(result.info);
}

// Export controller:

module.exports = { getAllVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle };
