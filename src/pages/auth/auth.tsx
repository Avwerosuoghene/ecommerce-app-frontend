import { Fragment } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import classes from "./auth.module.scss";
import Login from "./login/login";

const Auth: React.FC<any> = () => {
  return (
    <Fragment>
      <section className={classes.auth_container}>
        <div className={classes.auth_noContent}></div>
        <div className={classes.auth_Content}>
          <img src={"/images/audiophile.png"} alt="" />
       
          <div className={classes.auth_routes}>
            {/* <h2>Text</h2> */}
          <Outlet  />
          </div>
       
        </div>
      </section>
    </Fragment>
  );
};

export default Auth;
