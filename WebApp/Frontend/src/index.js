import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import App from "./App";
import history from "./utils/CreateBrowserHistory";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
