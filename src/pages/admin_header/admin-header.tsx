import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { ReactComponent as BellIcon } from "../../assets/images/Notification.svg";
import classes from "./admin-header.module.scss";
import { IconButton } from "@mui/material";

const AdminHeader = () => {
  return (
    <section className={classes.header_container}>
      <form
        className={`${classes.search_form}
        }`}
        id="searchForm"
      >
        <label htmlFor="search"></label>
        <input
          type="text"
          //   ref={searchInputRef}
          className={classes.searchInput}
        />
        <SearchIcon className={classes.searchInput_icon} />
      </form>
      <div className={classes.user_info}>
        <div className={classes.bell_icon_container}>
          <BellIcon className={classes.bell_icon} />
        </div>
        <IconButton  disableRipple>
            <div className={classes.nav_profile_img}>
              <img src="/images/dp_placeholder.png" alt="" />
            </div>
          </IconButton>
          <p>Warren Buffet</p>
      </div>
    </section>
  );
};

export default AdminHeader;
