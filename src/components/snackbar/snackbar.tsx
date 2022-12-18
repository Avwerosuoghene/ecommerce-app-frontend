import { Snackbar } from "@mui/material";

const SnackBar = (props: any) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
    //   onClose={handleClose}
      message="Note archived"
    //   action={action}
    />
  );
};

export default SnackBar;
