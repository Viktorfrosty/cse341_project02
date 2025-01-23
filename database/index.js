// Dependencies:

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const url = process.env.DB_URL;

// Functions:

// Create a MongoClient with a MongoClientOptions object to set the Stable API version.
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Export client:

module.exports = client;
