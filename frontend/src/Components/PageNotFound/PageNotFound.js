import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="main">
      <center>
        <h1>404 Page Not Found</h1>
        <h2>Page you are looking for is Not Found</h2>
        <Link to="/">Go back home</Link>
      </center>
    </div>
  );
};

export default PageNotFound;
