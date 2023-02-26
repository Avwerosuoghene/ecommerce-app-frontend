import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import classes from "./admin-sidebar.module.scss";

const AdminSideBar = () => {
  const hanldeActiveNavlink = ({ isActive }: { isActive: boolean }) => {
    return `${classes.navlink} ${isActive ? classes.active : ""}`;
  };
  return (
    <section className={classes.sideBar_container}>
      <h3>audiophile</h3>

      <div className={classes.navigation}>
        <NavLink to="home" className={hanldeActiveNavlink} end>
          <img src="/images/admin_home.png" alt="" />
          <h4>Home</h4>
        </NavLink>
        <NavLink to="upload" className={hanldeActiveNavlink} end>
          <img src="/images/admin_products.png" alt="" />
          <h4>Upload</h4>
        </NavLink>
      </div>

      <div className={classes.logout}>
        <Button className={`${classes.logout_button}`} type ="button">
        <img src="/images/admin_logout.png" alt="" />
         <h4>Logout</h4>
        </Button>
      </div>
    </section>
  );
};

export default AdminSideBar;
