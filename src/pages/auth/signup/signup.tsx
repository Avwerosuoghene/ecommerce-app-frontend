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

import classes from "./signup.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/images/Profile.svg";
import { NavLink } from "react-router-dom";

const emailTest = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
const passwordTest = new RegExp(
  /^(?=.*\d{1,})(?=.*[A-Z]{1,})[\w\d[\]{};:=<>_+^#$@!%*?&\.]{6,}$/
);
const reducerFunction = (test:any, type: string, action:any,state: any) => {
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
}

const emailReducer = (state: any, action: any) => {
    let test
    if(action.value) {
        test = emailTest.test(action.value.trim())
    } else {
        test = null
    }
    return reducerFunction(test, 'email',action, state )
};

const passwordReducer = (state: any, action: any) => {
    let test
    if(action.value) {
        test = passwordTest.test(action.value.trim())
    } else {
        test = null
    }
    return reducerFunction(test, 'email',action, state )
};

const userNameReducer = (state: any, action: any) => {
    let test
    if(action.value) {
        test =  action.value.trim().length > 3
    } else {
        test = null
    }
    return reducerFunction(test, 'email',action, state )

};



const Signup: React.FC<any> = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailState, disptachEmaiil] = useReducer(emailReducer, {
    value: " ",
    isValid: undefined,
  });

  const [passwordState, disptachPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const [userNameState, disptachUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: false,
  });

  const [termsnConditionsIsValidState, setTermsnConditionsIsValidState] = useState(false)

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: userNameIsValid } = userNameState;

  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && userNameIsValid && termsnConditionsIsValidState);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, passwordIsValid, userNameIsValid, termsnConditionsIsValidState]);

  const emailChangeHandler = (event: any) => {
    if (event.target.value !== undefined) {
      disptachEmaiil({ type: "INPUT", value: event.target.value });
    }
  };

  const termsNCChangeHandler = () => {
    setTermsnConditionsIsValidState((prevState: any) => {
        return !prevState
    })
  }

  const passwordChangeHandler = (event: any) => {
    disptachPassword({ type: "INPUT", value: event.target.value });
  };

  const userNameChangeHandler = (event: any) => {
    disptachUserName({ type: "INPUT", value: event.target.value });
  };

  const userNameValidatorHandler = () => {
    disptachUserName({ type: "BLUR" });
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
    <section className={classes.signup_container}>
      <h1>Create Account</h1>
      <h4>
        Create an account to start purchasing the best music gadgets on our
        website
      </h4>
      <form onSubmit={formSubmissionHandler} className={classes.signup_form}>
        {/* UserName Form */}

        <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.signup_formControl} ${classes.userName}`}
        >
          <InputLabel
            htmlFor="signup-username"
            className={classes.signup_input_label}
          >
            Full Name
          </InputLabel>
          <OutlinedInput
            className={classes.signup_input}
            placeholder="Insert Full Name"
            type="text"
            error={!userNameState.isValid}
            value={userNameState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  stroke="red"
                  className={classes.signup_input_icon}
                >
                  <ProfileIcon stroke="green" />
                </SvgIcon>
              </InputAdornment>
            }
            label="Full Name"
            onChange={userNameChangeHandler}
            onBlur={userNameValidatorHandler}
          />
          {!userNameState.isValid && (
            <FormHelperText error id="email-error">
              Kindly enter a valid name
            </FormHelperText>
          )}
        </FormControl>

        {/* Email Form */}
        <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          className={`${classes.signup_formControl} ${classes.email}`}
        >
          <InputLabel
            htmlFor="signup-email"
            className={classes.signup_input_label}
          >
            Email
          </InputLabel>
          <OutlinedInput
            className={classes.signup_input}
            placeholder="Insert Email"
            type="text"
            error={!emailState.isValid}
            value={emailState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  stroke="red"
                  className={classes.signup_input_icon}
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
          className={`${classes.signup_formControl} ${classes.password}`}
        >
          <InputLabel
            htmlFor="signup-password"
            className={classes.signup_input_label}
          >
            Password
          </InputLabel>
          <OutlinedInput
            className={classes.signup_input}
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            error={!passwordState.isValid}
            value={passwordState.value}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon fontSize="small" className={classes.signup_input_icon}>
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
                  className={classes.signup_input_iconButton}
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
              Password must contain atleast one number, one upper case character
              and be atleast 6 characters long
            </FormHelperText>
          )}
        </FormControl>
        <div className={classes.loggedIn}>
        <FormControlLabel
          control={
            <Checkbox
            onChange={termsNCChangeHandler}
              defaultChecked={false}
              sx={{
                color: "#D87D4A",
                "&.Mui-checked": {
                  color: "#D87D4A",
                },
              }}
            />
          }
          label="I agree to the Term & Conditions"
        />
      </div>


      <Button
        variant="text"
        className={classes.signup_button}
        disabled={!formIsValid}
        type = "submit"
      >
        SIGNUP
      </Button>
      </form>

     


      <div className={classes.login_action}>
        <p className={classes.login_text}>Already Have an Account? </p>

        <NavLink to="../login" className={classes.signup_navlink}>    Login</NavLink>
     
     
      </div>
    </section>
  );
};

export default Signup;
