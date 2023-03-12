import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./login.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import Button from "../../../components/UI/button/Button";
import CusForm from "../../../components/form/form";
import Loader from "../../../components/loader/loader";
import useHttp from "../../../hooks/useHttp";
import { login } from "../../../services/api";
import { authActions } from "../../../redux/store/auth";
import { HelperComponent } from "../../../components/helper/helper.component";


const Login: React.FC<any> = (props) => {

  const helperComponent = new HelperComponent();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { sendRequest } = useHttp();

  const [emailState, disptachEmaiil] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const [passwordState, disptachPassword] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;


  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();
    console.log("button clicked");
    const loginPayload = {
      email: emailState.value,
      password: passwordState.value,
    };

    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(loginPayload, login);
      console.log(apiResponse);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        console.log(apiResponse);
        const userId = apiResponse.data.id;
        const token = apiResponse.data.token;
        const userType = apiResponse.data.userType;
        dispatch(authActions.login({ token, userId, userType }));
        if (userType === 'buyer') {
          navigate("/main/home");
        } else {
          navigate("/admin");
        }
       
      }
      console.log(apiResponse.isSuccess);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in login is ${error}`);
    }
  };

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, passwordIsValid]);

  const defaultValidatorHandler = (dispatch: any, element: string) => {
    dispatch({ type: "BLUR", element:element});
  };

  const defaultChangeHandler = (
    event: any,
    element: string,
    dispatchFunction: any
  ) => {
    dispatchFunction({
      type: "INPUT",
      value: event.target.value,
      element: element,
    });
  };


  const handleClickShowPassword = () => {
    setShowPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const renderedForms = [
    {
      formControlStyle: classes.emailForm,
      labelFor: "email",
      label: "Email",
      placeholder: "Insert Email",
      inputState: emailState,
      dispatchName: disptachEmaiil,
      error: !emailState.isValid && emailState.touched,
      startAdornmentIcon: <MailIcon stroke="green" />,
      endAdornment: null,
      errorMessage: "Kindly enter a valid mail",
      type: "text",
    },
    {
      formControlStyle: classes.passwordForm,
      labelFor: "login-password",
      label: "password",
      placeholder: "Enter Password",
      inputState: passwordState,
      dispatchName: disptachPassword,
      error: !passwordState.isValid && passwordState.touched,
      startAdornmentIcon: <LockIcon />,
      endAdornmentIcon: showPassword ? <VisibilityOff /> : <Visibility />,
      endAdornmentIconClick: handleClickShowPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      errorMessage: "   Invalid Password",
      type: showPassword ? "text" : "password",
    },
  ];

  return (
    <React.Fragment>
      <section className={classes.login_container}>
        <h1>Welcome Back!</h1>
        <h4>Please Login to continue purchasing on our website</h4>
        <form onSubmit={formSubmissionHandler} className={classes.login_form}>
          {/* Email Form */}
          {renderedForms.map((form: any) => (
            <CusForm
              key={form.label}
              formControlStyle={form.formControlStyle}
              labelFor={form.labelFor}
              label={form.label}
              placeholder={form.placeholder}
              inputState={form.inputState}
              startAdornmentIcon={
                form.startAdornmentIcon && form.startAdornmentIcon
              }
              endAdornmentIcon={form.endAdornmentIcon && form.endAdornmentIcon}
              endAdornmentIconClick={
                form.endAdornmentIconClick && form.endAdornmentIconClick
              }
              endAdornmentIconMouseDown={
                form.endAdornmentIconMouseDown && form.endAdornmentIconMouseDown
              }
              // inputChangeHandler={form.inputChangeHandler}
              // inputValidator={form.inputValidator}
              inputChangeHandler={(event: any) => {
                defaultChangeHandler(
                  event,
                  form.labelFor,
                  form.dispatchName
                );
              }}
              inputValidator={() => {
                defaultValidatorHandler(form.dispatchName,form.labelFor );
              }}
              errorMessage={form.errorMessage}
              type={form.type}
              error={form.error}
            />
          ))}

          <div className={classes.loggedIn}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Keep me logged in"
            />

            <NavLink to="../password-reset" className={classes.login_navlink}>
              {" "}
              Forgot Password?
            </NavLink>
          </div>

          <Button
            disabled={!formIsValid || isLoading}
            type="submit"
            design="orange"
            style={classes.login_button}
          >
            LOGIN
          </Button>
        </form>

        <div className={classes.signup_action}>
          <p className={classes.signup_text}>Don't Have an Account? </p>

          <NavLink to="../signup" className={classes.login_navlink}>
            {" "}
            Sign Up
          </NavLink>
        </div>
        {isLoading && <Loader style={classes.loader} design="orange" />}
      </section>
      {/* <SnackBar open={snackBarIsOpen} close={handleSnackBarClose} /> */}
    </React.Fragment>
  );
};

export default Login;
