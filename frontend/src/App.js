import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from "./Components/LandingPage/LandingPage";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export default App;
