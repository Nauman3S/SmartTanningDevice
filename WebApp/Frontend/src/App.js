import React from "react";

import { Switch, Route } from "react-router-dom";
import Data from "./pages/Data";
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
          <ProtectedRoutes Cmp={Data} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
