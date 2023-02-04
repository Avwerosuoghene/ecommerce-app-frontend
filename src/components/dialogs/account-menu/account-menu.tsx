import { Logout } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Fragment, useState } from "react";
import classes from "./account-menu.module.scss";

const AccountMenu = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    //   <Menu
    //     anchorEl={anchorEl}
    //     id="account-menu"
    //     open={props.open}
    //     onClose={handleClose}
    //     onClick={handleClose}
    //     PaperProps={{
    //       elevation: 0,
    //       sx: {
    //         overflow: "visible",
    //         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //         mt: 1.5,
    //         "& .MuiAvatar-root": {
    //           width: 32,
    //           height: 32,
    //           ml: -0.5,
    //           mr: 1,
    //         },
    //         "&:before": {
    //           content: '""',
    //           display: "block",
    //           position: "absolute",
    //           top: 0,
    //           right: 14,
    //           width: 10,
    //           height: 10,
    //           bgcolor: "background.paper",
    //           transform: "translateY(-50%) rotate(45deg)",
    //           zIndex: 0,
    //         },
    //       },
    //     }}
    //     transformOrigin={{ horizontal: "right", vertical: "top" }}
    //     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    //   >
    //     <MenuItem onClick={handleClose}>
    //       <Avatar /> User Profile
    //     </MenuItem>
    //     <MenuItem onClick={handleClose}>
    //       <Avatar /> My account
    //     </MenuItem>
    //     <Divider />

    //     <MenuItem onClick={handleClose}>
    //       <ListItemIcon>
    //         <Logout fontSize="small" />
    //       </ListItemIcon>
    //       Logout
    //     </MenuItem>
    //   </Menu>

    <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={props.open}
    MenuListProps={{
      "aria-labelledby": "basic-button",
    }}
  >
    <MenuItem >My account</MenuItem>
  </Menu>
  );
};

export default AccountMenu;
