// // Dependencies:

// // const model = require("../models/");

// // Functions:

// // // Check if server is running smoothly.
// // async function status(req, res) {
// //   //#swagger.tags = ["Status"]
// //   const result = await model.connectionStatus();
// //   res.status(result.statusCode).send(result.info);
// // }

// // Check if user is logged in.
// async function status(req, res) {
//   //#swagger.tags = ["Status"]
//   res.send(req.sesssion.user !== undefined ? `Connected as: ${req.sesssion.user.displayName}` : "Not connected");
// }

// // Export:

// module.exports = { status };
