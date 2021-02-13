//importing react
import React from "react";
//for Routing 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Css file for toast notification packages
import 'react-toastify/dist/ReactToastify.css';

//Importing two main Components
import LandingPage from "./Components/LandingPage/LandingPage";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

//Parent Component of All
const App = () => (
  //Routing between diffrent routes
  <Router>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export default App;
