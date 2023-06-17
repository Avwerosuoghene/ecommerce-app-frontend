import Button from "../../../components/UI/button/Button";
import classes from "./user-profile.module.scss";
import { useEffect, useReducer, useState, useRef } from "react";
import CusForm from "../../../components/form/form";
import { currentUserI } from "../../../models/types";
import { LinearProgress } from "@mui/material";
import useHttp from "../../../hooks/useHttp";
import { getCurrentUser, updateProfile } from "../../../services/api";

const emailTest = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

const reducerFunction = (test: any, type: string, action: any, state: any) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isValid: test,
    };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.isValid, touched: true };
  }
  return { value: "", isValid: false };
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

const emailReducer = (state: any, action: any) => {
  let test;
  if (action.value) {
    test = emailTest.test(action.value.trim());
  } else {
    test = null;
  }
  return reducerFunction(test, "email", action, state);
};

const addressReducer = (state: any, action: any) => {
  let test;

  if (action.value) {
    test = action.value.trim().length > 3;
  } else {
    test = null;
  }
  return reducerFunction(test, "address", action, state);
};

const phoneReducer = (state: any, action: any) => {
  let test;

  if (action.value) {
    if (action.value.length > 11) {
      return {
        value: state.value,
        isValid: true,
      };
    }
    action.value = action.value.replace(/\D/g, "");

    test = action.value.trim().length === 11;
  } else {
    test = null;
  }
  return reducerFunction(test, "phone", action, state);
};

const UserProfile = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmaiil] = useReducer(emailReducer, {
    value: "",
    isValid: false,
    touched: false,
  });
  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: "",
    isValid: false,
    touched: false,
  });
  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  const [addressState, dispatchAddress] = useReducer(addressReducer, {
    value: "",
    isValid: false,
    touched: false,
  });
  const [imageFile, setImageFile]: any = useState();
  const imageInputRef: any = useRef();

  const [currentUser, setCurrentUser] = useState<currentUserI>()

  const { isValid: emailIsValid } = emailState;
  const { isValid: userNameIsValid } = userNameState;
  const { isValid: addressIsValid } = addressState;
  //   const { isValid: phoneIsValid } = phoneState;

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();
  };

  const { sendRequest } = useHttp();

  useEffect(() => {
    console.log(imageFile)

  }, [imageFile]);

  useEffect(() => {
    dispatchEmaiil({ type: "INPUT", value: currentUser?.email ? currentUser.email : '' });
    dispatchUserName({ type: "INPUT", value: currentUser?.name ? currentUser.name : '' });
    dispatchPhone({ type: "INPUT", value: currentUser?.phone ? currentUser.phone : '' });
    dispatchAddress({ type: "INPUT", value: currentUser?.address ? currentUser?.address : '' });
  }, [currentUser])




  useEffect(() => {


    fetchUser();


  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getCurrentUser);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        setCurrentUser(apiResponse.data);
        console.log(currentUser)

      }

    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching user ${error}`);
    }
  }

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(emailIsValid && userNameIsValid && addressIsValid);
      console.log(formIsValid);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, userNameIsValid, addressIsValid]);

  const baseImagePath = process.env.REACT_APP_IMAGE_URL;

  const userNameValidatorHandler = () => {
    dispatchUserName({ type: "BLUR" });
  };

  const emailValidatorHandler = () => {
    dispatchEmaiil({ type: "BLUR" });
  };

  const phoneValidatorHandler = () => {
    dispatchPhone({ type: "BLUR" });
  };

  const addressValidatorHandler = () => {
    dispatchAddress({ type: "BLUR" });
  };

  const userNameChangeHandler = (event: any) => {
    dispatchUserName({ type: "INPUT", value: event.target.value });
  };

  const emailChangeHandler = (event: any) => {
    if (event.target.value !== undefined) {
      dispatchEmaiil({ type: "INPUT", value: event.target.value });
    }
  };

  const phoneChangeHandler = (event: any) => {
    dispatchPhone({ type: "INPUT", value: event.target.value });
  };

  const addressChangeHandler = (event: any) => {
    dispatchAddress({ type: "INPUT", value: event.target.value });
  };

  const onSaveForm = async (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    if (imageFile?.file) {
      formData.append("image", imageFile.file);
    }
    formData.append("phone", phoneState.value);
    formData.append("email", emailState.value);
    formData.append("name", userNameState.value);
    formData.append("address", addressState.value);
    formData.append("remove", JSON.stringify(false));


    try {
      setIsLoading(true);
      let apiResponse;
      apiResponse = await sendRequest(updateProfile, formData);


      setIsLoading(false);
      if (apiResponse.isSuccess) {


      }

      console.log(apiResponse);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in profile update ${error}`);
    }
  }


  const handleImageChange = (e: any) => {

    setImageFile({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });

  }

  const onRemoveImage = async () => {
    const newCurrent = currentUser!;
    newCurrent!.image = '';
    setImageFile(undefined);
    setCurrentUser(newCurrent);

    let formData = new FormData();
    formData.append("phone", phoneState.value);
    formData.append("email", emailState.value);
    formData.append("name", userNameState.value);
    formData.append("address", addressState.value);
    formData.append("remove", JSON.stringify(true));

    try {
      setIsLoading(true);
      let apiResponse;
      apiResponse = await sendRequest(updateProfile, formData);


      setIsLoading(false);
      if (apiResponse.isSuccess) {


      }

      console.log(apiResponse);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in profile update ${error}`);
    }
  };

  const clearFileInput = () => {
    imageInputRef.current.value = null;
  }

  const onChangeImage = () => {
    // const imageInput = document.getElementById("imageChangeInput");
    imageInputRef.current.click();



  };

  const profileUpdateForm = [
    {
      formControlStyle: classes.nameInput,
      labelFor: "full name",
      label: "Full Name",
      placeholder: "Insert Full Name",
      inputState: userNameState,
      error: !userNameState.isValid && userNameState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: userNameChangeHandler,
      inputValidator: userNameValidatorHandler,
      errorMessage: " Kindly enter a valid name",
      type: "text",
    },
    // {
    //   formControlStyle: classes.emailInput,
    //   labelFor: "email",
    //   label: "Email",
    //   placeholder: "Insert Email",
    //   inputState: userNameState,
    //   error: !emailState.isValid && emailState.touched,
    //   startAdornmentIcon: null,
    //   endAdornment: null,
    //   inputChangeHandler: userNameChangeHandler,
    //   inputValidator: userNameValidatorHandler,
    //   errorMessage: " Kindly enter a valid name",
    //   type: "text",
    // },
    {
      formControlStyle: classes.emailInput,
      labelFor: "email",
      label: "Email",
      placeholder: "Insert Email",
      inputState: emailState,
      error: !emailState.isValid && emailState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: emailChangeHandler,
      inputValidator: emailValidatorHandler,
      errorMessage: "Kindly enter a valid mail",
      type: "text",
    },
    {
      formControlStyle: classes.phoneInput,
      labelFor: "phone",
      label: "Phone",
      placeholder: "Insert Phone Number",
      inputState: phoneState,
      error: !phoneState.isValid && phoneState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: phoneChangeHandler,
      inputValidator: phoneValidatorHandler,
      errorMessage: "Kindly enter a valid phone",
      type: "text",
    },
    {
      formControlStyle: classes.address,
      labelFor: "address",
      label: "Address",
      placeholder: "Enter Address",
      inputState: addressState,
      error: !addressState.isValid && addressState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: addressChangeHandler,
      inputValidator: addressValidatorHandler,
      errorMessage: " Kindly enter a valid address",
      type: "text",
    },
  ];

  return (
    <section className={classes.profile_container}>
      {isLoading && <LinearProgress />}
      <div className={classes.profile_content}>
        <h1>USER PROFILE</h1>

        <div className={classes.img_form_container}>
          <div className={classes.image_area}>
            {(!currentUser?.image &&
              !imageFile) &&
              <img src=" /images/user.png" alt="user" />}
            {(!currentUser?.image &&
              imageFile) &&
              <img src={imageFile.url} alt="user" />}
            {currentUser?.image &&
              <img src={baseImagePath +
                currentUser.image} alt='user' />}


            <div className={classes.img_actions}>
              <Button
                type="button"
                design="orange"
                onClick={onChangeImage}
                style={classes.img_btn}
              >
                {
                  !currentUser?.image ? 'ADD' : 'CHANGE'
                }

              </Button>
              <input type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={imageInputRef}
                onClick={clearFileInput} />
              {
                currentUser?.image && <Button
                  type="button"
                  design="outline"
                  onClick={onRemoveImage}
                  style={classes.img_btn}
                >
                  REMOVE
                </Button>
              }

            </div>
          </div>
          <div className={classes.form_area}>
            <form onSubmit={formSubmissionHandler}
              className={classes.userProfile_form}>
              {profileUpdateForm.map((form: any) => (
                <CusForm
                  key={form.label}
                  formControlStyle={form.formControlStyle}
                  labelFor={form.labelFor}
                  label={form.label}
                  placeholder={form.placeholder}
                  inputState={form.inputState}
                  //   startAdornmentIcon={
                  //     form.startAdornmentIcon && form.startAdornmentIcon
                  //   }
                  //   endAdornmentIcon={
                  //     form.endAdornmentIcon && form.endAdornmentIcon
                  //   }
                  height={20}
                  endAdornmentIconClick={
                    form.endAdornmentIconClick &&
                    form.endAdornmentIconClick
                  }
                  endAdornmentIconMouseDown={
                    form.endAdornmentIconMouseDown &&
                    form.endAdornmentIconMouseDown
                  }
                  inputChangeHandler={form.inputChangeHandler}
                  inputValidator={form.inputValidator}
                  errorMessage={form.errorMessage}
                  type={form.type}
                  error={form.error}
                />
              ))}
              <div className={classes.form_actions}>
                <Button
                  type="submit"
                  design="orange"
                  style={classes.save_btn}
                  onClick={onSaveForm}

                >
                  SAVE
                </Button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;


