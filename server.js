// Web application server
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const defaultRouter = require("./routes/");
const contactsRouter = require("./routes/contacts");
const swaggerRouter = require("./routes/swagger");
const app = express();

// Body parser Middleware
app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// routes
app.use("/", defaultRouter);
app.use("/contacts", contactsRouter);
app.use("/api-docs", swaggerRouter);

// Server host and port
const port = process.env.PORT;
const host = process.env.HOST;

// Log statement to confirm server operation
app.listen(port, () => {
  console.log(`trial listening on ${host}:${port}`);
});
