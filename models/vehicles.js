// Dependencies:

require("dotenv").config();
const client = require("../database");
const { ObjectId } = require("mongodb");
const database = process.env.DATABASE;
const collection = process.env.COLLECTION_B;
const env = process.env.NODE_ENV;

// Constants:

const processedTrue = "Request processed.";
const processedFalse = "Request could not be processed.";

// Functions:

// Interact with the database and retrieve all vehicles.
async function getAllVehicles() {
  try {
    await client.connect();
    const data = await client.db(database).collection(collection).find({}).toArray();
    if (data.length > 0) {
      return { statusCode: 200, info: data };
    } else {
      return { statusCode: 404, info: { message: "No vehicles registered." } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Interact with the database and retrieve a single vehicle.
async function getVehicle(id) {
  try {
    await client.connect();
    const data = await client
      .db(database)
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    if (!data) {
      return { statusCode: 404, info: { message: "Vehicle not found." } };
    }
    return { statusCode: 200, info: data };
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Interact with the database and add a single vehicle.
async function addVehicle(info) {
  try {
    await client.connect();
    const result = await client.db(database).collection(collection).insertOne({
      carName: info.carName,
      manufacturer: info.manufacturer,
      model: info.model,
      year: info.year,
      color: info.color,
      engineType: info.engineType,
      price: info.price,
      description: info.description,
    });
    if (env !== "production") {
      console.log(`POST ${processedTrue} New vehicle Id: ${result["insertedId"]}`);
    }
    return { statusCode: 201, info: { message: `${processedTrue} New vehicle Id: ${result["insertedId"]}` } };
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and updates a single vehicle.
async function updateVehicle(id, info) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            carName: info.carName,
            manufacturer: info.manufacturer,
            model: info.model,
            year: info.year,
            color: info.color,
            engineType: info.engineType,
            price: info.price,
            description: info.description,
          },
        },
      );
    if (update.modifiedCount > 0) {
      if (env !== "production") {
        console.log(`PUT ${processedTrue} Vehicle id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`PUT ${processedFalse} Vehicle id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and delete a single vehicle.
async function deleteVehicle(id) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    if (update.deletedCount > 0) {
      if (env !== "production") {
        console.log(`DELETE ${processedTrue} Vehicle id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`DELETE ${processedFalse} Vehicle id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Export model:

module.exports = { getAllVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle };
