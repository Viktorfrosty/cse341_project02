// Dependencies:

require("dotenv").config();
const client = require("../database/");
const { ObjectId } = require("mongodb");
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;
const env = process.env.NODE_ENV;
const processedTrue = "Request processed.";
const processedFalse = "Request could not be processed.";

// Functions:

// Interact with the database and retrieve all contacts.
async function getAllContacts() {
  try {
    await client.connect();
    const data = await client.db(database).collection(collection).find({}).toArray();
    if (data.length > 0) {
      return { statusCode: 200, info: data };
    } else {
      return { statusCode: 404, info: { message: "No contacts registered." } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Interact with the database and retrieve a single contact.
async function getContact(id) {
  try {
    await client.connect();
    const data = await client
      .db(database)
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    if (!data) {
      return { statusCode: 404, info: { message: "Contact was not found." } };
    }
    return { statusCode: 200, info: data };
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Interact with the database and add a single contact.
async function addContact(info) {
  try {
    await client.connect();
    const result = await client.db(database).collection(collection).insertOne({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      favoriteColor: info.favoriteColor,
      birthday: info.birthday,
    });
    if (env !== "production") {
      console.log(`POST ${processedTrue} New element Id: ${result["insertedId"]}`);
    }
    return { statusCode: 200, info: { message: `${processedTrue} New element Id: ${result["insertedId"]}` } };
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and partially updates a single contact.
async function partiallyUpdateContact(id, info) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            firstName: info.firstName,
            lastName: info.lastName,
            email: info.email,
            favoriteColor: info.favoriteColor,
            birthday: info.birthday,
          },
        },
      );
    if (update.modifiedCount > 0) {
      if (env !== "production") {
        console.log(`PUT ${processedTrue} Element id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`PUT ${processedFalse} Element id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and totally updates a single contact.
async function totallyUpdateContact(id, info) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            firstName: info.firstName,
            lastName: info.lastName,
            email: info.email,
            favoriteColor: info.favoriteColor,
            birthday: info.birthday,
          },
        },
      );
    if (update.modifiedCount > 0) {
      if (env !== "production") {
        console.log(`PUT ${processedTrue} Element id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`PUT ${processedFalse} Element id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Interact with the database and delete a single contact.
async function deleteContact(id) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    if (update.deletedCount > 0) {
      if (env !== "production") {
        console.log(`DELETE ${processedTrue} Element id: ${id}`);
      }
      return { statusCode: 200, info: { message: processedTrue } };
    } else {
      if (env !== "production") {
        console.log(`DELETE ${processedFalse} Element id: ${id}`);
      }
      return { statusCode: 403, info: { message: processedFalse } };
    }
  } catch (error) {
    return { statusCode: 500, info: { message: error.errmsg } };
  }
}

// Export model.
module.exports = { getAllContacts, getContact, addContact, updateContact, deleteContact };
