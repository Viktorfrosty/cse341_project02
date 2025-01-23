// Dependencies:

const model = require("../models/");

// Functions:

// check if server is running smoothly.
async function status(req, res) {
  //#swagger.tags = ["Status"]
  const result = await model.connectionStatus();
  res.status(result.statusCode).send(result.info);
}

// Export controller:

module.exports = { status };
