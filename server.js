// Dependencies:

const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const defaultRouter = require("./routes/");
const storesRouter = require("./routes/stores");
const vehiclesRouter = require("./routes/vehicles");
// const swaggerRouter = require("./routes/swagger");

const app = express();

// Middleware:

// Body parser Middleware.
app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Routes:

app.use("/", defaultRouter);
app.use("/stores", storesRouter);
app.use("/vehicles", vehiclesRouter);
// app.use("/api-docs", swaggerRouter);

// Miscellaneous:

// Server host and port.
const port = process.env.PORT;
const host = process.env.HOST;

// Log statement to confirm server operation.
app.listen(port, () => {
  console.log(`trial listening on ${host}:${port}`);
});
