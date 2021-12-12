import React, { useEffect } from "react";
import history from "./CreateBrowserHistory";
const ProtectedRoutes = ({ Cmp }) => {
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/sign-in");
    }
  }, []);
  return (
    <div>
      <Cmp />
    </div>
  );
};

export default ProtectedRoutes;
