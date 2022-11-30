import { Fragment } from "react";
import classes from "./home.module.scss";

const Home = () => {
  return (
    <Fragment>
      <section className={classes.home_container}>
        <div className={classes.newproduct_page}>
          <div className={classes.item_description}>
            <p className={classes.new_product}>NEW PRODUCT</p>
            <h1>XX99 Mark II Headphones</h1>
            <p>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
          </div>
          <div className={classes.image_container}>
            <img src="/images/home_background.png" alt="" />
          </div>
        </div>
        
      </section>
    </Fragment>
  );
};

export default Home;
