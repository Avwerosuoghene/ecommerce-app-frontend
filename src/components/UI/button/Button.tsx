import React from "react";
import { Button } from "@mui/material";
import classes from "./Button.module.scss";

const UIButton = (props: any) => {
  return (
    <Button
      type={props.type}
      className={`${classes.button} ${classes[props.design]} ${props.style}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default UIButton;
