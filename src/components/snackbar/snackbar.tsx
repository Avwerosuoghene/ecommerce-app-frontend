import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";


const SnackBar = (props: any) => {
    // const snackBarMessage = useSelector((state: any) => state.snackBar.message);
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={1500}
      onClose={props.close}
    > 
       <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

export default SnackBar;
