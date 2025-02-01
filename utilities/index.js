// Dependencies:

require("dotenv").config();

// Functions:

// id verification.
function verify(req, res, next) {
  const id = req.params.id;
  const regex = /^[a-f\d]{24}$/i;
  if (!regex.test(id)) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Request was not processed. Invalid ID format.");
    }
    res.status(400).send({ message: "Request was not processed.", errors: "Invalid ID format." });
  } else {
    next();
  }
}

// Is authenticated
function IsAuthenticated(req, res, next) {
  if (req.session.user === undefined) {
    res.status(401).send({ message: "Invalid access." });
  } else {
    next();
  }
}

// Export functions:

module.exports = { verify, IsAuthenticated };
