const express = require("express");
const mongoose = require("mongoose"); //using mongoose
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors"); //for cross origin resource sharing

//Requring Swagger Packages
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//configuring dotenv file
require("dotenv").config();

//making up a server
const app = express();
const server = http.createServer(app);

//making a swagger instance
const swaggerApp = express();

//use of body parser for Parsing the input requests data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//using cross origin resource sharing
app.use(cors());

//configuring database conncetion
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connection establsihed Successfully");
});

//requring Router
const router = require("./Routes/Router");
app.use(router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XMeme API's",
      version: "1.0.0",
      description: "All about Meme Stream API's",
    },
    servers: [
      {
        url: "http://localhost:8081",
      },
    ],
  },
  // Mention thr location where api's are located
  apis: ["./Routes/*.js"],
};

//Configuring Swagger docs
const specs = swaggerJsDoc(options);
app.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(specs));
swaggerApp.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(specs));

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`Server is Up and Runnnig`));

//Swagger instance running
swaggerApp.listen(8080, () => console.log(`Swagger Port is Up`));
