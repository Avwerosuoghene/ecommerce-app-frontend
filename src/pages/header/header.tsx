import IconButton from "@mui/material/IconButton";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as LoveIcon } from "../../assets/images/Love.svg";
import { ReactComponent as CartIcon } from "../../assets/images/Cart.svg";
import classes from "./header.module.scss";
import SearchField from "../../components/UI/searchField/search-field";
import CheckoutDialog from "../../components/dialogs/checkout-dialog/checkout_dialog";
import { useEffect, useState } from "react";
import AccountMenu from "../../components/dialogs/account-menu/account-menu";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { ReactComponent as ProfileIcon } from "../../assets/images/Profile.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/Logout.svg";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store/auth";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { currentUserI } from "../../models/types";
import { getCurrentUser } from "../../services/api";

const Header = () => {
  const [open, setOpen] = useState(false);
  const openCartHandler = (e: any) => {
    setOpen(true);

  };


  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleDialogClose = (value: string) => {
    setOpen(false);
  };
  const baseImagePath = process.env.REACT_APP_IMAGE_URL;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const openUserProfile = () => {
    navigate(`/main/profile`);
  };

  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState<currentUserI>();
  const { sendRequest } = useHttp();


  useEffect(() => {


    fetchUser();


  }, []);

  const fetchUser = async () => {
    try {
      const apiResponse = await sendRequest(getCurrentUser);
      if (apiResponse.isSuccess) {
        setCurrentUser(apiResponse.data);
        console.log(currentUser)

      }

    } catch (error) {
      console.log(`error in fetching user ${error}`);
    }
  }

  return (
    <nav className={classes.nav_container}>
      <div className={classes.nav_body}>
        <Link to="/main/home">
          <h1>audiophile</h1>
        </Link>

        <div className={classes.nav_icons}>
          <SearchField />

          <IconButton
            aria-label="like"
            color="primary"
            className={classes.nav_icon_btn}
          >
            <LoveIcon fill="red" />
          </IconButton>
          <IconButton
            aria-label="cart"
            color="primary"
            className={classes.nav_icon_btn}
            onClick={openCartHandler}
          >
            <CartIcon />
          </IconButton>

          <IconButton onClick={handleMenuOpen} disableRipple>
            <div className={classes.nav_profile_img}>
              {!currentUser?.image &&
                <img src=" /images/user.png" alt="user" />}
              {currentUser?.image &&
                <img src={baseImagePath +
                  currentUser.image} alt='user' />}
            </div>
          </IconButton>
          {/* <AccountMenu open = {openMenu} /> */}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className={classes.user_menu}
        PaperProps={{
          style: {
            padding: "20px",
            width: "300px",
          },
        }}
      >
        <MenuItem onClick={handleClose} className={classes.menu_item}>
          <IconButton
            onClick={openUserProfile}
            className={classes.menu_btn}
            disableRipple
          >
            <ProfileIcon className={classes.menu_icon} />

            <h4 className={classes.menuText}> User Profile</h4>
          </IconButton>
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <IconButton
            onClick={logoutHandler}
            className={classes.menu_btn}
            disableRipple
          >
            <LogoutIcon className={classes.menu_icon} />
            <h4 className={classes.menu_text}>Logout</h4>
          </IconButton>
        </MenuItem>
      </Menu>
      {open && <CheckoutDialog open={open} onClose={handleDialogClose} />}
    </nav>
  );
};

export default Header;
