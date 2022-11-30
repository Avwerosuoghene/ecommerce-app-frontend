import {
  FormControl,
  InputLabel,
  InputAdornment,
  SvgIcon,
  OutlinedInput,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import classes from "./login.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import { NavLink } from "react-router-dom";

const emailTest = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
// const passwordTest = new RegExp(/^(?=.*\d{1,})(?=.*[A-Z]{1,})[\w\d[\]{};:=<>_+^#$@!%*?&\.]{6,}$/)

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

  return (
    <section className={classes.login_container}>
      <h1>Welcome Back!</h1>
      <h4>Please Login to continue purchasing on our website</h4>
      <form onSubmit={formSubmissionHandler} className={classes.login_form}>
        {/* Email Form */}
        <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.login_formControl} ${classes.email}`}
        >
          <InputLabel
            htmlFor="login-email"
            className={classes.login_input_label}
          >
            Email
          </InputLabel>
          <OutlinedInput
            className={classes.login_input}
            placeholder="Insert Email"
            type="text"
            error={!emailState.isValid}
            value={emailState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  stroke="red"
                  className={classes.login_input_icon}
                >
                  <MailIcon stroke="green" />
                </SvgIcon>
              </InputAdornment>
            }
            label="Email"
            onChange={emailChangeHandler}
            onBlur={emailValidatorHandler}
          />
          {!emailState.isValid && (
            <FormHelperText error id="email-error">
              Kindly enter a valid mail
            </FormHelperText>
          )}
        </FormControl>

        {/* Password Form */}
        <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.login_formControl} ${classes.password}`}
        >
          <InputLabel
            htmlFor="login-password"
            className={classes.login_input_label}
          >
            Password
          </InputLabel>
          <OutlinedInput
            className={classes.login_input}
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            error={!passwordState.isValid}
            value={passwordState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon fontSize="small" className={classes.login_input_icon}>
                  <LockIcon />
                </SvgIcon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  className={classes.login_input_iconButton}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordValidatorHandler}
          />
          {!passwordState.isValid && (
            <FormHelperText error id="passwordError">
              Invalid Password
            </FormHelperText>
          )}
        </FormControl>
      </form>

      <div className={classes.loggedIn}>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Keep me logged in"
        />
    
          <NavLink to="../password-reset" className={classes.login_navlink}> Forgot Password?</NavLink>
     
      </div>

      <Button
        variant="text"
        className={classes.login_button}
        disabled={!formIsValid}
      >
        LOGIN
      </Button>

      <div className={classes.signup_action}>
        <p className={classes.signup_text}>Don't Have an Account? </p>
   
          <NavLink to="../signup" className={classes.login_navlink}> Sign Up</NavLink>
    
      </div>
    </section>
  );
};

export default Login;
