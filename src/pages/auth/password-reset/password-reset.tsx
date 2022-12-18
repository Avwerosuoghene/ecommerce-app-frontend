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

import classes from "./password-reset.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/Button";
import CusForm from "../../../components/form/form";

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
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [formPageVisible, setFormPageVisible] = useState(true);

  const [confirmPasswordState, setConfirmPasswordState] = useState("");

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

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && passwordMatch);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, passwordIsValid, passwordMatch]);

  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
    setFormPageVisible(false)
    console.log(formPageVisible)

    
  };

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
    // disptachComfirmPasswordState({ type: "BLUR" });
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
    navigate('/auth/login')
  }

  const renderedForms = [
    {
      formControlStyle: classes.email ,
      labelFor: "password_reset" ,
      label : "Email",
      placeholder : "Insert Email",
      inputState : emailState,
      error: !emailState.isValid,
      startAdornmentIcon :    <MailIcon stroke="green" />,
      endAdornment: null,
      inputChangeHandler : emailChangeHandler,
      inputValidator : emailValidatorHandler,
      errorMessage :"  Kindly enter a valid mail",
      type : "text"
    },
    {
      formControlStyle: classes.password ,
      labelFor: "password_reset-password" ,
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
      errorMessage :"  Invalid Password",
      type : showPassword ? "text" : "password",
    },
    {
      formControlStyle: classes.password ,
      labelFor: "confirm password" ,
      label : "Confirm Password",
      placeholder : "Re-enter Password",
      inputState : confirmPasswordState,
      error: !passwordMatch,
      startAdornmentIcon :   <LockIcon />,
      endAdornmentIcon:    showConfirmPassword ? <VisibilityOff /> : <Visibility />,
      endAdornmentIconClick: handleClickShowConfirmPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      inputChangeHandler : confirmPasswordChangeHandler,
      inputValidator : confirmPasswordValidatorHandler,
      errorMessage :"Passwords do not macth",
      type : showConfirmPassword ? "text" : "password",
    }
  ]


  const mainPage = (
    <div className={classes.formPage}>
      <h1>Reset Password</h1>
      <h4>Enter your email and new password</h4>
      <form
        onSubmit={formSubmissionHandler}
        className={classes.password_reset_form}
      >
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
        {/* Email Form */}

        {/* <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.password_reset_formControl} ${classes.email}`}
        >
          <InputLabel
            htmlFor="password_reset-email"
            className={classes.password_reset_input_label}
          >
            Email
          </InputLabel>
          <OutlinedInput
            className={classes.password_reset_input}
            placeholder="Insert Email"
            type="text"
            error={!emailState.isValid}
            value={emailState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  stroke="red"
                  className={classes.password_reset_input_icon}
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
        </FormControl> */}

        {/* Password Form */}
        {/* <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.password_reset_formControl} ${classes.password}`}
        >
          <InputLabel
            htmlFor="password_reset-password"
            className={classes.password_reset_input_label}
          >
            Password
          </InputLabel>
          <OutlinedInput
            className={classes.password_reset_input}
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            error={!passwordState.isValid}
            value={passwordState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  className={classes.password_reset_input_icon}
                >
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
                  className={classes.password_reset_input_iconButton}
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
        </FormControl> */}

        {/* Confirm Pass */}
        {/* <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.password_reset_formControl} ${classes.password}`}
        >
          <InputLabel
            htmlFor="confirm password"
            className={classes.password_reset_input_label}
          >
            Confirm Password
          </InputLabel>
          <OutlinedInput
            className={classes.password_reset_input}
            placeholder="Re-enter Password"
            type={showConfirmPassword ? "text" : "password"}
            error={!passwordMatch}
            value={confirmPasswordState}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  className={classes.password_reset_input_icon}
                >
                  <LockIcon />
                </SvgIcon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  className={classes.password_reset_input_iconButton}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="confirm password"
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordValidatorHandler}
          />
          {!passwordMatch && (
            <FormHelperText error id="passwordError">
              Passwords do not macth
            </FormHelperText>
          )}
        </FormControl> */}
    

      <Button
        disabled={!formIsValid}
        type = "submit"
        design = "orange"
        style = {classes.password_reset_button}

      >
        RESET
      </Button>
      </form>

     
    </div>
  );

  const successPage = (
    <div className={classes.successPage}>
      <img src="/images/Pass.png" alt="" />
      <h1>Reset Password</h1>
      <h4>
        Your Password has been reset successfully. Click on the button below to
        continue to the login screen
      </h4>

      <Button variant="text" className={classes.password_reset_button} onClick = {backToHomePageNavigation}>
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
