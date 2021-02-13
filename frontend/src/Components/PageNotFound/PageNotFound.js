import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.css";

// If a page is not found this component is rendered
const PageNotFound = () => {
  return (
    <div className="main">
      <center>
        <h1>404 Page Not Found</h1>
        <h2>Page you are looking for is Not Found</h2>
        {/* Usefull link to get back to Home */}
        <Link to="/">Go back home</Link>
      </center>
    </div>
  );
};

export default PageNotFound;
