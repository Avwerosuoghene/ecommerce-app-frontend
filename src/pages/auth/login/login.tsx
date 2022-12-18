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
import { useEffect, useReducer, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./login.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import Button from "../../../components/UI/Button";
import CusForm from "../../../components/form/form";

const emailTest = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

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
    test = action.value.trim().length >= 6;
  } else {
    test = null;
  }
  return reducerFunction(test, "email", action, state);
};

const Login: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailState, disptachEmaiil] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, disptachPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const formSubmissionHandler = (event: any) => {
    event.preventDefault();

  };

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: any) => {
    if (event.target.value !== undefined) {
      disptachEmaiil({ type: "INPUT", value: event.target.value });
    }
  };

  const passwordChangeHandler = (event: any) => {
    disptachPassword({ type: "INPUT", value: event.target.value });
  };

  const emailValidatorHandler = () => {
    disptachEmaiil({ type: "BLUR" });
  };

  const passwordValidatorHandler = () => {
    disptachPassword({ type: "BLUR" });
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
      formControlStyle: classes.emailForm ,
      labelFor: "login-email" ,
      label : "Email",
      placeholder : "Insert Email",
      inputState : emailState,
      error: !emailState.isValid,
      startAdornmentIcon :  <MailIcon stroke="green" /> ,
      endAdornment: null,
      inputChangeHandler : emailChangeHandler,
      inputValidator : emailValidatorHandler,
      errorMessage :"Kindly enter a valid mail",
      type : "text"
    },
    {
      formControlStyle: classes.passwordForm ,
      labelFor: "login-password" ,
      label : "Password",
      placeholder : "Enter Password",
      inputState : passwordState,
      error: !passwordState.isValid,
      startAdornmentIcon :   <LockIcon />,
      endAdornmentIcon:    showPassword ? <VisibilityOff /> : <Visibility />,
      endAdornmentIconClick: handleClickShowPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      inputChangeHandler : passwordChangeHandler,
      inputValidator : passwordValidatorHandler,
      errorMessage :"   Invalid Password",
      type : showPassword ? "text" : "password"
    }
  ]

  return (
    <section className={classes.login_container}>
      <h1>Welcome Back!</h1>
      <h4>Please Login to continue purchasing on our website</h4>
      <form onSubmit={formSubmissionHandler} className={classes.login_form}>
        {/* Email Form */}
        {renderedForms.map((form: any) => (
          <CusForm 
          key = {form.label}
          formControlStyle={form.formControlStyle} 
          labelFor={form.labelFor}
          label = {form.label}
          placeholder = {form.placeholder}
          inputState = {form.inputState}
          startAdornmentIcon = {form.startAdornmentIcon && form.startAdornmentIcon}
          endAdornmentIcon = {  form.endAdornmentIcon && form.endAdornmentIcon}
          endAdornmentIconClick = {form.endAdornmentIconClick && form.endAdornmentIconClick}
          endAdornmentIconMouseDown = {form.endAdornmentIconMouseDown && form.endAdornmentIconMouseDown}
          inputChangeHandler = {form.inputChangeHandler}
          inputValidator = {form.inputValidator}
          errorMessage ={form.errorMessage}
          type = {form.type}
          error = {form.error}
          />
        ))}

      </form>

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
        disabled={!formIsValid}
        type="button"
        design="orange"
        style={classes.login_button}
      >
        LOGIN
      </Button>

      <div className={classes.signup_action}>
        <p className={classes.signup_text}>Don't Have an Account? </p>

        <NavLink to="../signup" className={classes.login_navlink}>
          {" "}
          Sign Up
        </NavLink>
      </div>
    </section>
  );
};

export default Login;
