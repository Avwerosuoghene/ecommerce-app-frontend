import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../../../components/UI/button/Button";
import classes from "./error.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  const authState = useSelector((state: any) => state.auth);


  const onPreviousScreenClick = () => {
    authState.isLoggedIn ? navigate("/main/home") : navigate("/") 
  }
  return (
    <div className={classes.error_container}>
      <img src="/images/404.png" alt="" />

      <div className={classes.action}>
        <Button
          type="button"
          design="orange"
          onClick={onPreviousScreenClick}
          //   disabled = {!formIsValid}
          style={classes.back_btn}
        >
          GO BACK
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
