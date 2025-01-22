// Swagger Autogen code.
const swaggerAutogen = require("swagger-autogen")();
const documentation = {
  info: {
    title: "API Documentation",
    description: "API Documentation",
  },
  host: "localhost:8080",
  schemes: ["http", "https"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js", "./routes/contacts.js"];

// Generate Swagger.json file.
swaggerAutogen(outputFile, endpointsFiles, documentation).then(() => {
  require("./server.js");
});
