// Dependencies:

require("dotenv").config();
const client = require("../database");
const { ObjectId } = require("mongodb");
const database = process.env.DATABASE;
const collection = process.env.COLLECTION_A;
const env = process.env.NODE_ENV;

// Constants:

const processedTrue = "Request processed.";
const processedFalse = "Request could not be processed.";

// Functions:

// Interact with the database and retrieve all stores.
async function getAllStores() {
  try {
    await client.connect();
    const data = await client.db(database).collection(collection).find({}).toArray();
    if (data.length > 0) {
      return { statusCode: 200, info: data };
    } else {
      return { statusCode: 404, info: { message: "No stores registered." } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Interact with the database and retrieve a single store.
async function getStore(id) {
  try {
    await client.connect();
    const data = await client
      .db(database)
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    if (!data) {
      return { statusCode: 404, info: { message: "Store not found." } };
    }
    return { statusCode: 200, info: data };
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Interact with the database and add a single store.
async function addStore(info) {
  try {
    await client.connect();
    const result = await client.db(database).collection(collection).insertOne({
      storeName: info.storeName,
      address: info.address,
      city: info.city,
      state: info.state,
      zipCode: info.zipCode,
      email: info.email,
      phone: info.phone,
    });
    if (env !== "production") {
      console.log(`POST ${processedTrue} New store Id: ${result["insertedId"]}`);
    }
    return { statusCode: 201, info: { message: `${processedTrue} New store Id: ${result["insertedId"]}` } };
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and updates a single store.
async function updateStore(id, info) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            storeName: info.storeName,
            address: info.address,
            city: info.city,
            state: info.state,
            zipCode: info.zipCode,
            email: info.email,
            phone: info.phone,
          },
        },
      );
    if (update.modifiedCount > 0) {
      if (env !== "production") {
        console.log(`PUT ${processedTrue} Store id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`PUT ${processedFalse} Store id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and delete a single store.
async function deleteStore(id) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    if (update.deletedCount > 0) {
      if (env !== "production") {
        console.log(`DELETE ${processedTrue} Store id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`DELETE ${processedFalse} Store id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Export model:

module.exports = { getAllStores, getStore, addStore, updateStore, deleteStore };
