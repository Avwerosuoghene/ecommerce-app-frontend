import "./App.css";
import { Route, Routes, Navigate, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Fragment } from "react";

import Header from "./pages/header/header";
import Home from "./pages/home/home";
import HeadPhones from "./pages/headphones/headphones";
import EarPhones from "./pages/earphones/earphones";
import Speakers from "./pages/speakers/speakers";
import Auth from "./pages/auth/auth";
import Login from "./pages/auth/login/login";
import Signup from "./pages/auth/signup/signup";
import PasswordReset from "./pages/auth/password-reset/password-reset";

function App() {
  return (
    <Fragment>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/headphones" element={<HeadPhones />} />
      </Routes>
      <Routes>
        <Route path="/earphones" element={<EarPhones />} />
      </Routes>
      <Routes>
        <Route path="/speakers" element={<Speakers />} />
      </Routes>
    </Fragment>
  );
}

export default App;
