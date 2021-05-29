import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import {} from "./static/images";
import {} from "./static/sounds";
import {} from "./static/videos";

import Home from "./app/home";
import Canvas3D from "./app/canvas_3d";

function App() {
  return (
    <div className="App">
      <Router base="">
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route exact path="/canvas">
            <Canvas3D></Canvas3D>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
