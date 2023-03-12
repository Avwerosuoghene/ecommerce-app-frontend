import {
  FormControl,
  InputLabel,
  InputAdornment,
  SvgIcon,
  OutlinedInput,
  IconButton,
  Checkbox,
  FormControlLabel,
  // Button,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import classes from "./password-reset.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import CusForm from "../../../components/form/form";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../../services/api";
import { IpasswordResetPayload } from "../../../models/types";
import useHttp from "../../../hooks/useHttp";
import Loader from "../../../components/loader/loader";
import { HelperComponent } from "../../../components/helper/helper.component";

const PasswordReset: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formPageVisible, setFormPageVisible] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const helperComponent = new HelperComponent();
  const { sendRequest } = useHttp();

  const [confirmPasswordState, setConfirmPasswordState] = useState("");

  const [emailState, disptachEmail] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const [passwordState, disptachPassword] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && passwordMatch);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, passwordIsValid, passwordMatch]);

  useEffect(() => {}, [formPageVisible]);

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();

    const paswordResetPayload: IpasswordResetPayload = {
      email: emailState.value,
      password: passwordState.value,
      confirmPassword: confirmPasswordState,
    };

    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(paswordResetPayload, passwordReset);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        setFormPageVisible(false);
        console.log(formPageVisible);
      }
      console.log(apiResponse);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in login is ${error}`);
    }
  };

  const defaultValidatorHandler = (dispatch: any, element: string) => {
    dispatch({ type: "BLUR", element: element });
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

  const confirmPasswordChangeHandler = (event: any) => {
    setPasswordMatch(event.target.value === passwordState.value);
    setConfirmPasswordState(event.target.value);
  };

  const confirmPasswordValidatorHandler = () => {
    setPasswordMatch(confirmPasswordState === passwordState.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const backToHomePageNavigation = () => {
    navigate("/auth/login");
  };

  const renderedForms = [
    {
      formControlStyle: classes.email,
      labelFor: "email",
      label: "Email",
      placeholder: "Enter Email",
      inputState: emailState,
      dispatchName: disptachEmail,
      error: !emailState.isValid && emailState.touched,
      startAdornmentIcon: <MailIcon stroke="green" />,
      endAdornment: null,
      errorMessage: "  Kindly enter a valid mail",
      type: "text",
    },
    {
      formControlStyle: classes.password,
      labelFor: "sup_password",
      label: "Password",
      placeholder: "Enter Password",
      inputState: passwordState,
      error: !passwordState.isValid && passwordState.touched,
      dispatchName: disptachPassword,
      startAdornmentIcon: <LockIcon />,
      endAdornmentIcon: showPassword ? <VisibilityOff /> : <Visibility />,
      endAdornmentIconClick: handleClickShowPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      errorMessage:
        "  Password must contain atleast one number, one upper case character and be atleast 6 characters long",
      type: showPassword ? "text" : "password",
    },
  ];

  const confirmPassword = {
    formControlStyle: classes.password,
    labelFor: "confirm password",
    label: "Confirm Password",
    placeholder: "Re-enter Password",
    inputState: confirmPasswordState,
    error: !passwordMatch,
    startAdornmentIcon: <LockIcon />,
    endAdornmentIcon: showConfirmPassword ? <VisibilityOff /> : <Visibility />,
    endAdornmentIconClick: handleClickShowConfirmPassword,
    endAdornmentIconMouseDown: handleMouseDownPassword,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputValidator: confirmPasswordValidatorHandler,
    errorMessage: "Passwords do not macth",
    type: showConfirmPassword ? "text" : "password",
  };

  const mainPage = (
    <React.Fragment>
      <div className={classes.formPage}>
        <h1>Reset Password</h1>
        <h4>Enter your email and new password</h4>
        <form
          onSubmit={formSubmissionHandler}
          className={classes.password_reset_form}
        >
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
              inputChangeHandler={(event: any) => {
                defaultChangeHandler(event, form.labelFor, form.dispatchName);
              }}
              inputValidator={() => {
                defaultValidatorHandler(form.dispatchName, form.labelFor);
              }}
              errorMessage={form.errorMessage}
              type={form.type}
              error={form.error}
            />
          ))}

          <CusForm
            key={confirmPassword.label}
            formControlStyle={confirmPassword.formControlStyle}
            labelFor={confirmPassword.labelFor}
            label={confirmPassword.label}
            placeholder={confirmPassword.placeholder}
            inputState={confirmPassword.inputState}
            startAdornmentIcon={
              confirmPassword.startAdornmentIcon && confirmPassword.startAdornmentIcon
            }
            endAdornmentIcon={confirmPassword.endAdornmentIcon && confirmPassword.endAdornmentIcon}
            endAdornmentIconClick={
              confirmPassword.endAdornmentIconClick && confirmPassword.endAdornmentIconClick
            }
            endAdornmentIconMouseDown={
              confirmPassword.endAdornmentIconMouseDown && confirmPassword.endAdornmentIconMouseDown
            }
            inputChangeHandler={
              confirmPasswordChangeHandler
            }
            inputValidator={
              confirmPasswordValidatorHandler
            }
            errorMessage={confirmPassword.errorMessage}
            type={confirmPassword.type}
            error={confirmPassword.error}
          />

          <Button
            disabled={!formIsValid || isLoading}
            type="submit"
            design="orange"
            style={classes.password_reset_button}
          >
            RESET
          </Button>
        </form>

        {isLoading && <Loader style={classes.loader} design="orange" />}
      </div>
    </React.Fragment>
  );

  const successPage = (
    <div className={classes.successPage}>
      <img src="/images/Pass.png" alt="" />
      <h1>Reset Password</h1>
      <h4>
        Your Password has been reset successfully. Click on the button below to
        continue to the login screen
      </h4>

      <Button
        disabled={!formIsValid || isLoading}
        design="orange"
        style={classes.password_reset_button}
        onClick={backToHomePageNavigation}
      >
        CONTINUE
      </Button>
    </div>
  );

  return (
    <section className={classes.password_reset_container}>
      {formPageVisible && mainPage}
      {!formPageVisible && successPage}
    </section>
  );
};

export default PasswordReset;
