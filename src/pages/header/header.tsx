import IconButton from "@mui/material/IconButton";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as LoveIcon } from "../../assets/images/Love.svg";
import { ReactComponent as CartIcon } from "../../assets/images/Cart.svg";
import classes from "./header.module.scss";
import SearchField from "../../components/UI/searchField/search-field";

const Header = () => {
  return (
    <nav className={classes.nav_container}>
      <div className={classes.nav_body}>
        <h1>audiophile</h1>
        <div className={classes.nav_icons}>
        <SearchField/>
       
          <IconButton
            aria-label="like"
            color="primary"
            className={classes.nav_icon_btn}
          >
            <LoveIcon fill="red"/>
          </IconButton>
          <IconButton
            aria-label="cart"
            color="primary"
            className={classes.nav_icon_btn}
          >
            <CartIcon />
          </IconButton>
        
          <div className={classes.nav_profile_img}>
            <img src="/images/dp_placeholder.png" alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
