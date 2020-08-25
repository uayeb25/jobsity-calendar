import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./views/dashboard";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
