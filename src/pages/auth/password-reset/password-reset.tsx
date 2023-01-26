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

const emailTest = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
const passwordTest = new RegExp(
  /^(?=.*\d{1,})(?=.*[A-Z]{1,})[\w\d[\]{};:=<>_+^#$@!%*?&\.]{6,}$/
);

const reducerFunction = (test: any, type: string, action: any, state: any) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isValid: test,
    };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.isValid };
  }
  return { value: "", isValid: false };
};

const emailReducer = (state: any, action: any) => {
  let test;
  if (action.value) {
    test = emailTest.test(action.value.trim());
  } else {
    test = null;
  }
  return reducerFunction(test, "email", action, state);
};

const passwordReducer = (state: any, action: any) => {
  let test;
  if (action.value) {
    test = passwordTest.test(action.value.trim());
  } else {
    test = null;
  }
  return reducerFunction(test, "email", action, state);
};

const PasswordReset: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formPageVisible, setFormPageVisible] = useState(true);

  // const snackBarIsOpen = useSelector((state: any) => state.snackBar.isOpen);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { sendRequest } = useHttp();

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBaeMessagee] = useState("");

  const [confirmPasswordState, setConfirmPasswordState] = useState("");

  const [emailState, disptachEmaiil] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, disptachPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

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

    // console.log(formPageVisible);
  };

  // const openSnackBarAction = (message: string) => {
  //   dispatch(snackBarActions.open(message));
  // };

  const emailChangeHandler = (event: any) => {
    if (event.target.value !== undefined) {
      disptachEmaiil({ type: "INPUT", value: event.target.value });
    }
  };

  const passwordChangeHandler = (event: any) => {
    setPasswordMatch(event.target.value === confirmPasswordState);
    disptachPassword({ type: "INPUT", value: event.target.value });
  };

  const confirmPasswordChangeHandler = (event: any) => {
    setPasswordMatch(event.target.value === passwordState.value);
    setConfirmPasswordState(event.target.value);
  };

  const emailValidatorHandler = () => {
    disptachEmaiil({ type: "BLUR" });
  };

  const passwordValidatorHandler = () => {
    disptachPassword({ type: "BLUR" });
    confirmPasswordValidatorHandler();
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
      labelFor: "password_reset",
      label: "Email",
      placeholder: "Insert Email",
      inputState: emailState,
      error: !emailState.isValid,
      startAdornmentIcon: <MailIcon stroke="green" />,
      endAdornment: null,
      inputChangeHandler: emailChangeHandler,
      inputValidator: emailValidatorHandler,
      errorMessage: "  Kindly enter a valid mail",
      type: "text",
    },
    {
      formControlStyle: classes.password,
      labelFor: "password_reset-password",
      label: "Password",
      placeholder: "Enter Password",
      inputState: passwordState,
      error: !passwordState.isValid,
      startAdornmentIcon: <LockIcon />,
      endAdornmentIcon: showPassword ? <VisibilityOff /> : <Visibility />,
      endAdornmentIconClick: handleClickShowPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      inputChangeHandler: passwordChangeHandler,
      inputValidator: passwordValidatorHandler,
      errorMessage: "  Invalid Password",
      type: showPassword ? "text" : "password",
    },
    {
      formControlStyle: classes.password,
      labelFor: "confirm password",
      label: "Confirm Password",
      placeholder: "Re-enter Password",
      inputState: confirmPasswordState,
      error: !passwordMatch,
      startAdornmentIcon: <LockIcon />,
      endAdornmentIcon: showConfirmPassword ? (
        <VisibilityOff />
      ) : (
        <Visibility />
      ),
      endAdornmentIconClick: handleClickShowConfirmPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      inputChangeHandler: confirmPasswordChangeHandler,
      inputValidator: confirmPasswordValidatorHandler,
      errorMessage: "Passwords do not macth",
      type: showConfirmPassword ? "text" : "password",
    },
  ];

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
              inputChangeHandler={form.inputChangeHandler}
              inputValidator={form.inputValidator}
              errorMessage={form.errorMessage}
              type={form.type}
              error={form.error}
            />
          ))}

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
