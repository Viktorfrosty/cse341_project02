// Functions:

// Swagger Autogen code.
const swaggerAutogen = require("swagger-autogen")();
const documentation = {
  info: {
    title: "API Documentation",
    description: "API Documentation",
  },
  host: "cse341-project01-64kj.onrender.com",
  schemes: ["https"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js", "./routes/stores.js", "./routes/vehicles.js"];

// Generate Swagger.json file.
swaggerAutogen(outputFile, endpointsFiles, documentation).then(() => {
  require("./server.js");
});
