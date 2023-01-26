

import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../header/header";
import classes from "./main.module.scss";


const Main = () => {
    return (
        <section className={classes.main_container}>
      <Header />
            <div className={classes.main_routes}>
            <Outlet  />
            <Footer/>
            </div>
         
        </section>
    )
};

export default Main;