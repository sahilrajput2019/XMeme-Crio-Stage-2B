const express = require("express");
const mongoose = require("mongoose"); //using mongoose 
const http = require("http");
const bodyParser =  require("body-parser");
const cors = require("cors");  //for cross origin resource sharing

//configuring dotenv file
require("dotenv").config();

//making up a server
const app = express();
const server = http.createServer(app);

//use of body parser for Parsing the input requests data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//using cross origin resource sharing 
app.use(cors());

//configuring database conncetion
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connection establsihed Successfully");
});

//requrering Router 
const router = require("./Router");
app.use(router);

server.listen(process.env.PORT || 8081, () =>
  console.log("Server is Up and Runnig")
);
