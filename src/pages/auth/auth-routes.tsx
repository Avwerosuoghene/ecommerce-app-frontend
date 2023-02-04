import { Login } from "@mui/icons-material";
import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./auth";
import PasswordReset from "./password-reset/password-reset";
import Signup from "./signup/signup";

const AuthRoutes = () => {
  return (
    <Fragment>
      {/* <Routes> */}
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>
      {/* </Routes> */}
    </Fragment>
  );
};

export default AuthRoutes;
