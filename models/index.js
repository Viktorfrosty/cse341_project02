// Default Model.

// Dependencies:
require("dotenv").config();
const client = require("../database/");
const database = process.env.DATABASE;

// Functions:

// Check if server is connected, return a message with the status and result.
async function connectionStatus() {
  try {
    await client.connect();
    await client.db(database).command({ ping: 1 }).then(console.log("connection to MongoDB stablished."));
    return { statusCode: 200, info: { message: "Connection stablished." } };
  } catch (error) {
    console.log(error);
    return { statusCode: 503, info: { message: error.errmsg } };
  } finally {
    await client.close();
  }
}

// Export model:
module.exports = { connectionStatus };
