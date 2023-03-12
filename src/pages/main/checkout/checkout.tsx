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
import { HelperComponent } from "../../../components/helper/helper.component";
import Button from "../../../components/UI/button/Button";
import useHttp from "../../../hooks/useHttp";
import classes from "./checkout.module.scss";




const Checkout: React.FC<any> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const helperComponent = new HelperComponent();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );
  const [phoneState, dispatchPhone] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );
  const [userNameState, dispatchUserName] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const [addressState, dispatchAddress] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const [zipState, dispatchZipCode] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const [cityState, dispatchCity] = useReducer(helperComponent.defaultReducer, 
    helperComponent.initialDispatchState
  
  );

  const [countryState, dispatchCountry] = useReducer(
    helperComponent.defaultReducer,
    helperComponent.initialDispatchState
  );

  const [open, setOpen] = useState(false);

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
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [
    emailIsValid,
    userNameIsValid,
    addressIsValid,
    zipIsValid,
    cityIsValid,
    countryIsValid,
  ]);

  const checkoutHandler = () => {
    setOpen(true);
  };

  const handleDialogClose = (value: string) => {
    setOpen(false);
    navigate("/main/home");
  };

  const defaultValidatorHandler = (dispatch: any,  element: string) => {
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
      dispatchName: dispatchUserName,
      error: !userNameState.isValid && userNameState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
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
      dispatchName: dispatchEmail,
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
      dispatchName: dispatchPhone,
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
      dispatchName: dispatchAddress,
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
      dispatchName: dispatchZipCode,
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
      dispatchName: dispatchCity,
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
      dispatchName: dispatchCountry,
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
        <NavLink
          to={`../product-info/${1}`}
          className={classes.checkout_navlink}
        >
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
                    height={20}
                    endAdornmentIconClick={
                      form.endAdornmentIconClick && form.endAdornmentIconClick
                    }
                    endAdornmentIconMouseDown={
                      form.endAdornmentIconMouseDown &&
                      form.endAdornmentIconMouseDown
                    }
                    inputChangeHandler={(event: any) => {
                      defaultChangeHandler(
                        event,
                        form.labelFor,
                        form.dispatchName
                      );
                    }}
                    inputValidator={() => {
                      defaultValidatorHandler(form.dispatchName, form.labelFor);
                    }}
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
                    height={20}
                    endAdornmentIconClick={
                      form.endAdornmentIconClick && form.endAdornmentIconClick
                    }
                    endAdornmentIconMouseDown={
                      form.endAdornmentIconMouseDown &&
                      form.endAdornmentIconMouseDown
                    }
                    inputChangeHandler={(event: any) => {
                      defaultChangeHandler(
                        event,
                        form.labelFor,
                        form.dispatchName
                      );
                    }}
                    inputValidator={() => {
                      defaultValidatorHandler(form.dispatchName, form.labelFor);
                    }}
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
                <div className={classes.sum} key={value.name}>
                  <strong className={classes.amount}>{value.name}</strong>
                  <strong>$ {value.value}</strong>
                </div>
              ))}

              <div className={classes.action}>
                <Button
                  type="button"
                  design="orange"
                  onClick={checkoutHandler}
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
