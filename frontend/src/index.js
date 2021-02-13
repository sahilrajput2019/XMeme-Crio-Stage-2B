// importing React
import React from "react";
// Impoting ReactDom
import ReactDom from "react-dom";

//importing react-bootsrap Css file
import 'bootstrap/dist/css/bootstrap.min.css';
// Importing our main component
import App from "./App.js";

// Triggering or calling root id defined in index.html file in public directoey
ReactDom.render(<App />, document.querySelector("#root"));



