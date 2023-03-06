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
import { useSelector, useDispatch } from "react-redux";

import classes from "./signup.module.scss";
import { ReactComponent as MailIcon } from "../../../assets/images/Message.svg";
import { ReactComponent as LockIcon } from "../../../assets/images/Lock.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/images/Profile.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../../services/api";
import Button from "../../../components/UI/button/Button";
import CusForm from "../../../components/form/form";
import React from "react";
import SnackBar from "../../../components/snackbar/snackbar";
import { snackBarActions } from "../../../redux/store/snackbar";
import useHttp from "../../../hooks/useHttp";
import Loader from "../../../components/loader/loader";
import CustomSelect from "../../../components/custom-select/custom-select";

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
    return { value: state.value, isValid: state.isValid ,  isTouched: true};
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

const userNameReducer = (state: any, action: any) => {
  let test;
  if (action.value) {
    test = action.value.trim().length > 3;
  } else {
    test = null;
  }
  return reducerFunction(test, "email", action, state);
};

const Signup: React.FC<any> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('Buyer');

  const userTypes = ['Seller', 'Buyer']
  // const snackBarIsOpen = useSelector((state: any) => state.snackBar.isOpen);

  const [emailState, disptachEmaiil] = useReducer(emailReducer, {
    value: " ",
    isValid: false,
    isTouched: false
  });

  const [passwordState, disptachPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
    isTouched: false
  });

  const [userNameState, disptachUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: false,
    isTouched: false
  });

  const [termsnConditionsIsValidState, setTermsnConditionsIsValidState] =
    useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: userNameIsValid } = userNameState;

  // useEffect(() => {
  // }, [snackBarIsOpen])

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();
    const signUpPayload = {
      name: userNameState.value,
      email: emailState.value,
      password: passwordState.value,
    };

    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(signUpPayload, signUp);
      setIsLoading(false);

      if (apiResponse.isSuccess) {
        navigate("/auth/login");
      }
      console.log(apiResponse.isSucces);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in signup is ${error}`);
    }
  };

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          userNameIsValid &&
          termsnConditionsIsValidState
      );
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [
    emailIsValid,
    passwordIsValid,
    userNameIsValid,
    termsnConditionsIsValidState,
  ]);

  const emailChangeHandler = (event: any) => {
    if (event.target.value !== undefined) {
      disptachEmaiil({ type: "INPUT", value: event.target.value });
    }
  };

  const termsNCChangeHandler = () => {
    setTermsnConditionsIsValidState((prevState: any) => {
      return !prevState;
    });
  };

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

  const userTypeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const handleSnackBarClose = () => {
  //   dispatch(snackBarActions.close());
  // };

  const renderedForms = [
    {
      formControlStyle: classes.emailForm,
      labelFor: "signup-username",
      label: "Full Name",
      placeholder: "Insert Full Name",
      inputState: userNameState,
      error: !userNameState.isValid && userNameState.isTouched,
      startAdornmentIcon: <ProfileIcon stroke="green" />,
      endAdornment: null,
      inputChangeHandler: userNameChangeHandler,
      inputValidator: userNameValidatorHandler,
      errorMessage: " Kindly enter a valid name",
      type: "text",
    },
    {
      formControlStyle: classes.email,
      labelFor: "signup-email",
      label: "Email",
      placeholder: "Insert Email",
      inputState: emailState,
      error: !emailState.isValid && emailState.isTouched,
      startAdornmentIcon: <MailIcon stroke="green" />,
      endAdornment: null,
      inputChangeHandler: emailChangeHandler,
      inputValidator: emailValidatorHandler,
      errorMessage: "  Kindly enter a valid mail",
      type: "text",
    },
    {
      formControlStyle: classes.password,
      labelFor: "signup-password",
      label: "Password",
      placeholder: "Enter Password",
      inputState: passwordState,
      error: !passwordState.isValid && passwordState.isTouched,
      startAdornmentIcon: <LockIcon />,
      endAdornmentIcon: showPassword ? <VisibilityOff /> : <Visibility />,
      endAdornmentIconClick: handleClickShowPassword,
      endAdornmentIconMouseDown: handleMouseDownPassword,
      inputChangeHandler: passwordChangeHandler,
      inputValidator: passwordValidatorHandler,
      errorMessage:
        "  Password must contain atleast one number, one upper case character and be atleast 6 characters long",
      type: showPassword ? "text" : "password",
    },
  ];

  return (
    <React.Fragment>
      <section className={classes.signup_container}>
        <h1>Create Account</h1>
        <h4>
          Create an account to start purchasing the best music gadgets on our
          website
        </h4>
        <form onSubmit={formSubmissionHandler} className={classes.signup_form}>
          {/* UserName Form */}

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

          <CustomSelect
            value={userType}
            label="User Type"
            menuItems={userTypes}
            handleChange={userTypeChangeHandler}
            style={classes.select_style}
            rawStyle={{ borderRadius: "4px 0 0 4px" }}
          />

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
            disabled={!formIsValid || isLoading}
            type="submit"
            design="orange"
            style={classes.signup_button}
          >
            SIGNUP
          </Button>
        </form>
        <div className={classes.login_action}>
          <p className={classes.login_text}>Already Have an Account? </p>

          <NavLink to="../login" className={classes.signup_navlink}>
            {/* {" "} */}
            Login
          </NavLink>
        </div>
        {isLoading && <Loader style={classes.loader} design="orange" />}
      </section>
    </React.Fragment>
  );
};

export default Signup;
