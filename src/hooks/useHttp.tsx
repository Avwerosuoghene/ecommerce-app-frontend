import { signUp } from "../services/api";
import { IsignUpPayload } from "../models/types";
import { useDispatch, useSelector } from "react-redux";
import { snackBarActions } from "../redux/store/snackbar";
import { useEffect, useState } from "react";

const useHttp = () => {
  const dispatch = useDispatch();
  // const snackBarIsOpen = useSelector((state: any) => state.snackBar.isOpen);
  // const [apiSuccess, setApiSuccess] = useState(false);

  const sendRequest = async (httpFunction: any, payload?: any) => {
    let message = "";

    let asyncResponse;
    if (payload ){
      asyncResponse = await httpFunction(payload);
    } else {
      asyncResponse = await httpFunction()
    }
    if (asyncResponse.response) {
      asyncResponse= asyncResponse.response
    }
  
    console.log(asyncResponse);
    if (!asyncResponse && !asyncResponse.data) {
      message = asyncResponse.message;
      openSnackBarAction(message, "error");
      return false;
    }

    const isSuccess = asyncResponse.data.isSuccess;
    if (isSuccess === true) {
      message = asyncResponse.data.message;
      const data = asyncResponse.data;
      openSnackBarAction(message, "success");
      return data;
    }
    message = asyncResponse.data.message;
    // console.log(asyncResponse.response.data.data[0].message);
    // message = asyncResponse.response.data.data
    //   ?asyncResponse.response.data.data[0].message
    //   : asyncResponse.response.data.message ;
    openSnackBarAction(message, "warning");
    return false;
  };

  const openSnackBarAction = (message: string, severity: string) => {
    dispatch(snackBarActions.open({ message, severity }));
  };

  return { sendRequest };
};

export default useHttp;
