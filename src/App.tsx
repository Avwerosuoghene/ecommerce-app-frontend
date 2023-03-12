import "./App.css";
import { Fragment, useEffect } from "react";

import AppRoutes from "./App-routes";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "./components/snackbar/snackbar";
import { snackBarActions } from "./redux/store/snackbar";

function App() {
    const snackBarState = useSelector((state: any) => state.snackBar);
    console.log(snackBarState)

    const handleSnackBarClose = () => {
      dispatch(snackBarActions.close());
    };
    const dispatch = useDispatch();


  return (
    <Fragment>
      {/* <Header/> */}
      <AppRoutes/>
      <SnackBar open={snackBarState.isOpen} close={handleSnackBarClose}  severity = {snackBarState.severity} message = {snackBarState.message} />
    </Fragment>
  );
}

export default App;
