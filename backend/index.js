const express = require("express");
const mongoose = require("mongoose"); //using mongoose 
const http = require("http");
const cors = require("cors");  //for cross origin resource sharing

//configuring dotenv file
require("dotenv").config();

//making up a server
const app = express();
const server = http.createServer(app);

//using cors 
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

const router = require("./Router");
app.use(router);

server.listen(process.env.PORT || 5000, () =>
  console.log("Server is Up and Runnig")
);
