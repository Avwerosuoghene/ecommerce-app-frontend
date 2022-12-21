import "./App.css";
import { Route, Routes, Navigate, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Fragment, useEffect } from "react";

import Header from "./pages/header/header";
import dotenv from "dotenv";
import HeadPhones from "./pages/headphones/headphones";
import EarPhones from "./pages/earphones/earphones";
import Speakers from "./pages/speakers/speakers";
import Auth from "./pages/auth/auth";
import Signup from "./pages/auth/signup/signup";
import PasswordReset from "./pages/auth/password-reset/password-reset";
import AppRoutes from "./App-routes";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "./components/snackbar/snackbar";
import { snackBarActions } from "./redux/store/snackbar";
import { authActions } from "./redux/store/auth";

function App() {
    const snackBarState = useSelector((state: any) => state.snackBar);
    console.log(snackBarState)

    const handleSnackBarClose = () => {
      dispatch(snackBarActions.close());
    };
    const dispatch = useDispatch();


  return (
    <Fragment>
      {/* <Header/> */}
      <AppRoutes/>
      <SnackBar open={snackBarState.isOpen} close={handleSnackBarClose}  severity = {snackBarState.severity} message = {snackBarState.message} />
    </Fragment>
  );
}

export default App;
