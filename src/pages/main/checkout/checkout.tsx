import {
  createTheme,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { pink, purple } from "@mui/material/colors";
import { Fragment, useEffect, useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SuccessDialog from "../../../components/dialogs/success-dialog/success_dialog";
import CusForm from "../../../components/form/form";
import Button from "../../../components/UI/button/Button";
import useHttp from "../../../hooks/useHttp";
import classes from "./checkout.module.scss";



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
    if ( action.value.length > 11) {
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


const zipCodeReducer = (state: any, action: any) => {
  let test;

  if (action.value) {
    action.value = action.value.replace(/\D/g, "");
    test = action.value.trim().length > 3;
  } else {
    test = null;
  }
  return reducerFunction(test, "zipCode", action, state);
};

const cityReducer = (state: any, action: any) => {
  let test;

  if (action.value) {
    test = action.value.trim().length > 3;
  } else {
    test = null;
  }
  return reducerFunction(test, "city", action, state);
};

const countryReducer = (state: any, action: any) => {
  let test;

  if (action.value) {
    test = action.value.trim().length > 3;
  } else {
    test = null;
  }
  return reducerFunction(test, "city", action, state);
};

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmaiil] = useReducer(emailReducer, {
    value: "",
    isValid: false,
    touched: false
  });
  const [phoneState, dispatchPhone] = useReducer(phoneReducer, {
    value: "",
    isValid: false,
    touched: false
  });
  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: false,
    touched: false
  });

  const [addressState, dispatchAddress] = useReducer(addressReducer, {
    value: "",
    isValid: false,
    touched: false
  });

  const [zipState, dispatchZipCode] = useReducer(zipCodeReducer, {
    value: "",
    isValid: false,
    touched: false
  });

  const [cityState, dispatchCity] = useReducer(cityReducer, {
    value: "",
    isValid: false,
    touched: false
  });

  const [countryState, dispatchCountry] = useReducer(countryReducer, {
    value: "",
    isValid: true,
    touched: false
  });

  const [open, setOpen] = useState(false);

 

  //   const navigate = useNavigate();

  const { isValid: emailIsValid } = emailState;
  const { isValid: userNameIsValid } = userNameState;
  const { isValid: addressIsValid } = addressState;
  const { isValid: zipIsValid } = zipState;
  const { isValid: cityIsValid } = cityState;
  const { isValid: countryIsValid } = countryState;
  const [paymentMethodState, setPaymentMethodState] = useState("e-money");
  const navigate = useNavigate();

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();
    // const signUpPayload = {
    //   name: userNameState.value,
    //   email: emailState.value,
    // };
  };

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          userNameIsValid &&
          addressIsValid &&
          zipIsValid &&
          cityIsValid &&
          countryIsValid
      );
      console.log(formIsValid)
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [emailIsValid, userNameIsValid, addressIsValid, zipIsValid,cityIsValid, countryIsValid ]);

  const checkoutHandler = () => {
    setOpen(true);
  };

  const handleDialogClose = (value: string) => {
    setOpen(false);
    navigate("/main/home");
  };

  

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

  const zipValidatorHandler = () => {
    dispatchZipCode({ type: "BLUR" });
  };

  const cityValidatorHandler = () => {
    dispatchCity({ type: "BLUR" });
  };

  const countryValidatorHandler = () => {
    dispatchCountry({ type: "BLUR" });
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

  const zipChangeHandler = (event: any) => {
    dispatchZipCode({ type: "INPUT", value: event.target.value });
  };

  const cityChangeHandler = (event: any) => {
    dispatchCity({ type: "INPUT", value: event.target.value });
  };

  const countryChangeHandler = (event: any) => {
    dispatchCountry({ type: "INPUT", value: event.target.value });
  };

  const paymentMethodHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethodState((event.target as HTMLInputElement).value);
  };

  const cartItems = [
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 2999,
      qty: 1,
      idx: 0,
    },
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 4999,
      qty: 2,
      idx: 1,
    },
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 4999,
      qty: 1,
      idx: 2,
    },
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 4999,
      qty: 1,
      idx: 3,
    },
  ];

  const billingInfoForms = [
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
  ];

  const shoppingInfoForms = [
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
    {
      formControlStyle: classes.zipCode,
      labelFor: "zip code",
      label: "Zip Code",
      placeholder: "Insert Zip Code",
      inputState: zipState,
      error: !zipState.isValid && zipState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: zipChangeHandler,
      inputValidator: zipValidatorHandler,
      errorMessage: "Kindly enter a zip code",
      type: "text",
    },
    {
      formControlStyle: classes.city,
      labelFor: "city",
      label: "City",
      placeholder: "Insert City",
      inputState: cityState,
      error: !cityState.isValid && cityState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: cityChangeHandler,
      inputValidator: cityValidatorHandler,
      errorMessage: "Kindly enter a valid city",
      type: "text",
    },
    {
      formControlStyle: classes.country,
      labelFor: "country",
      label: "Country",
      placeholder: "Insert Country",
      inputState: countryState,
      error: !countryState.isValid && countryState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      inputChangeHandler: countryChangeHandler,
      inputValidator: countryValidatorHandler,
      errorMessage: "Kindly enter a valid country",
      type: "text",
    },
  ];

  const amountValues = [
    {
      name: "TOTAL",
      value: 5396,
    },
    {
      name: "SHIPPING",
      value: 50,
    },
    {
      name: "VAT (INCLUDED)",
      value: 50,
    },
    {
      name: "GRAND TOTAL",
      value: 5446,
    },
  ];

  return (
    <Fragment>
      <section className={classes.checkout_container}>
        <NavLink to={`../product-info/${1}`} className={classes.checkout_navlink}>
          Go Back
        </NavLink>
        <div className={classes.checkout_detail_container}>
          <div className={classes.checkout_form}>
            <h3>CHECKOUT</h3>
            <p className={classes.orange}>BILLING DETAILS</p>
            <div className={classes.form_contents}>
              {billingInfoForms.map((form: any) => (
                <div className={classes.form_container}>
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
                      form.endAdornmentIconClick && form.endAdornmentIconClick
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
                </div>
              ))}
            </div>
            <p className={classes.orange}>SHOPPING INFO</p>
            <div className={classes.form_contents}>
              {shoppingInfoForms.map((form: any) => (
                <div
                  className={`${classes.form_container} ${
                    form.label === "Address" ? classes.full_width : ""
                  }`}
                >
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
                      form.endAdornmentIconClick && form.endAdornmentIconClick
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
                </div>
              ))}
            </div>
            <p className={classes.orange}>PAYMENT DETAILS</p>
            <div className={classes.form_contents}>
              <p className={classes.dark}>Payment Method</p>
              <div className={classes.method_select}>
                <div className={classes.radio}>
                  <Radio
                    checked={paymentMethodState === "e-money"}
                    onChange={paymentMethodHandler}
                    value="e-money"
                    name="radio-buttons"
                    sx={{
                      color: "#d87d4a",
                      "&.Mui-checked": {
                        color: "#d87d4a",
                      },
                    }}
                  />
                  <p className={classes.dark}>e-money</p>
                </div>
                <div className={classes.radio}>
                  <Radio
                    checked={paymentMethodState === "cash"}
                    onChange={paymentMethodHandler}
                    value="cash"
                    name="radio-buttons"
                    sx={{
                      color: "#d87d4a",
                      "&.Mui-checked": {
                        color: "#d87d4a",
                      },
                    }}
                  />
                  <p className={classes.dark}>Cash on Delivery</p>
                </div>
              </div>
            </div>
            <div className={classes.cash_delivery_message}>
              <div className={classes.cash_image_container}>
                <img src="/images/cash_delivery_icon.png" alt="" />
              </div>

              <p>
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          </div>
          <div className={classes.checkout_summary}>
            <div className={classes.summary_header}>
              <h4 className={classes.h_marg}>SUMMARY</h4>
            </div>

            <div className={classes.cart_items}>
              {cartItems.map((cartItem) => (
                <div className={classes.dialog_cart_item} key={cartItem.idx}>
                  <div className={classes.img_price}>
                    <div className={classes.dialog_image_container}>
                      <img src={cartItem.image} alt="" />
                    </div>
                    <div className={classes.dialog_itemName_price}>
                      <strong>{cartItem.name}</strong>
                      <p>$ {cartItem.price}</p>
                    </div>
                  </div>
                  <p>x {cartItem.qty}</p>
                </div>
              ))}
            </div>

            <div className={classes.lower_elements}>
              {amountValues.map((value) => (
                <div className={classes.sum} key = {value.name}>
                  <strong className={classes.amount}>{value.name}</strong>
                  <strong>$ {value.value}</strong>
                </div>
              ))}

              <div className={classes.action}>
                <Button
                  type="button"
                  design="orange"
                  onClick={checkoutHandler}
                //   disabled = {!formIsValid}
                  style={classes.dialog_checkout_button}
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SuccessDialog open={open} onClose={handleDialogClose}></SuccessDialog>
    </Fragment>
  );
};

export default Checkout;
