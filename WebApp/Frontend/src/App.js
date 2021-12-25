import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Data from "./pages/Data";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Redirect strict from="/" to="/data" />
          <Route path="/data">
            <ProtectedRoutes Cmp={Data} />
          </Route>
          <Route path="/settings">
            <ProtectedRoutes Cmp={Settings} />
          </Route>
        </Main>
      </Switch>
    </div>
  );
}

export default App;
