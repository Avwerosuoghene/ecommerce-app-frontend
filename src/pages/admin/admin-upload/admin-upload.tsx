import classes from "./admin-upload.module.scss";
import RemoveIcon from "@mui/icons-material/Remove";

import { ReactComponent as UploadIcon } from "../../../assets/images/upload_icon.svg";
import Button from "../../../components/UI/button/Button";

import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CusForm from "../../../components/form/form";
import CustomSelect from "../../../components/custom-select/custom-select";
import { ReactComponent as AddIcon } from "../../../assets/images/add.svg";
import { IconButton, TextField } from "@mui/material";
import { IpostUploadPayload } from "../../../models/types";
import { postUpload } from "../../../services/api";
import useHttp from "../../../hooks/useHttp";

const reducerFunction = (test: any, action: any, state: any) => {
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

const defaultReducer = (state: any, action: any) => {
  let test;
  if (action.value) {
    switch (action.element) {
      case "price":
        action.value = action.value.replace(/\D/g, "");
        test = action.value > 0;
        break;
      default:
        test = action.value.trim().length > 3;
        break;
    }
  } else {
    test = null;
  }
  return reducerFunction(test, action, state);
};

const AdminUpload = () => {
  const { sendRequest } = useHttp();

  const [imageDragOver, setImageDragOver] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [titleState, dispatchTitle] = useReducer(defaultReducer, {
    value: "",
    isValid: false,
    touched: false,
  });
  const [priceState, dispatchPrice] = useReducer(defaultReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  //   const [categoryState, dispatchCategory] = useReducer(defaultReducer, {
  //     value: "",
  //     isValid: false,
  //     touched: false,
  //   });

  const [descriptionState, dispatchDescription] = useReducer(defaultReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  const [featureNameState, dispatchFeatureName] = useReducer(defaultReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  const [featureQtyState, dispatchFeatureQty] = useReducer(defaultReducer, {
    value: "",
    isValid: false,
    touched: false,
  });

  const [selectedFeatures, setSelectedFeatures]: Array<any> = useState([{}]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const { isValid: titleIsValid } = titleState;
  const { isValid: priceIsValid } = priceState;
  //   const { isValid: categoryIsValid } = categoryState;
  const { isValid: descriptionIsValid } = descriptionState;
  const navigate = useNavigate();

  const imageInputRef: any = useRef();

  const [imageFile, setImageFile]: any = useState();

  useEffect(() => {}, [imageDragOver]);

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();

    const postUploadPayload: IpostUploadPayload = {
      title: titleState.value,
      price: priceState.value,
      category: selectedCategory,
      description: descriptionState.value,
      features: selectedFeatures,
      image: imageFile,
    };

    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(postUploadPayload, postUpload);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        // setFormPageVisible(false);
        // console.log(formPageVisible);
      }
      console.log(apiResponse);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in post upload ${error}`);
    }
  };

  const categorySelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const effectsSession = setTimeout(() => {
      setFormIsValid(
        titleIsValid &&
          priceIsValid &&
          //   categoryIsValid &&
          descriptionIsValid &&
          selectedFeatures.length > 0 &&
          selectedCategory !== undefined
      );
      console.log(formIsValid);
    }, 500);

    return () => {
      clearTimeout(effectsSession);
    };
  }, [
    titleIsValid,
    priceIsValid,
    // categoryIsValid,
    descriptionIsValid,
    selectedFeatures,
    selectedCategory,
  ]);

  const clearFileInput = () => {
    imageInputRef.current.value = null;
  };

  const onChangeImage = () => {
    // const imageInput = document.getElementById("imageChangeInput");
    imageInputRef.current.click();
  };

  const handleImageChange = (e: any) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  const imageDragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const imageDragEnterHandler = (event: any) => {
    event.preventDefault();
    setImageDragOver(true);
  };

  const imageDragLeaveHandler = (event: any) => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setImageDragOver(false);
  };

  const imageDropHandler = (event: any) => {
    console.log(event);
    setImageDragOver(false);
    event.preventDefault();
    setImageFile(URL.createObjectURL(event.dataTransfer.files[0]));
    // setImageDragOver(!imageDragOver);
    console.log(imageDragOver);
    // console.log(event.dataTransfer.files);
  };

  const defaultValidatorHandler = (dispatch: any) => {
    dispatch({ type: "BLUR", element: "name" });
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

  const uploadForms_indx1 = [
    {
      formControlStyle: classes.titleInput,
      labelFor: "title",
      label: "Title",
      placeholder: "",
      inputState: titleState,
      dispatchName: dispatchTitle,
      error: !titleState.isValid && titleState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      errorMessage: " Kindly enter a valid title",
      type: "text",
    },
    {
      formControlStyle: classes.price,
      labelFor: "price",
      label: "Price",
      placeholder: "",
      inputState: priceState,
      error: !priceState.isValid && priceState.touched,
      startAdornmentIcon: null,
      endAdornment: null,
      dispatchName: dispatchPrice,
      errorMessage: "Kindly enter a valid price",
      type: "text",
    },
  ];

  return (
    <section className={classes.upload_container}>
      <h3 className={classes.header}>Products</h3>
      <form
        onSubmit={formSubmissionHandler}
        className={classes.post_upload_form}
      >
        <div
          className={`${classes.uplodFile_container} ${
            imageDragOver ? classes.dragActive : ""
          }`}
          onDragOver={imageDragOverHandler}
          onDragLeave={imageDragLeaveHandler}
          onDrop={imageDropHandler}
          onDragEnter={imageDragEnterHandler}
        >
          <div></div>
          <UploadIcon className={classes.upload_icon} />
          {!imageDragOver && <p>Drag your file in here</p>}
          {imageDragOver && <p>Drop your file</p>}

          <Button
            type="button"
            design="orange"
            onClick={onChangeImage}
            style={classes.upload_btn}
          >
            BROWSE
          </Button>
          <input
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={imageInputRef}
            onClick={clearFileInput}
          />
        </div>
        <div className={classes.title_price_container}>
          {/* <form onSubmit={formSubmissionHandler}  className={classes.post_upload_form}> */}
          {uploadForms_indx1.map((form: any) => (
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
                form.endAdornmentIconMouseDown && form.endAdornmentIconMouseDown
              }
              inputChangeHandler={(event: any) => {
                defaultChangeHandler(event, form.labelFor, form.dispatchName);
              }}
              inputValidator={() => {
                defaultValidatorHandler(form.dispatchName);
              }}
              errorMessage={form.errorMessage}
              type={form.type}
              error={form.error}
              rawStyle={{ margin: "0" }}
            />
          ))}
          {/* </form> */}
        </div>
        <div className={classes.category}>
          {/* <div className={classes.select_container}> */}
          <CustomSelect
            value={selectedCategory}
            label="Category"
            menuItems={["Headphone", "Speaker"]}
            handleChange={categorySelectionChange}
            style={classes.select_style}
            rawStyle={{ borderRadius: "4px 0 0 4px" }}
          />
          {/* </div> */}
          <Button style={classes.category_create_btn} type="button">
            <AddIcon className={classes.add} />
          </Button>
        </div>

        <div className={classes.textField_container}>
          <TextField
            className={classes.textField}
            label="Description"
            multiline
            rows={4}
            onChange={(event: any) => {
              defaultChangeHandler(event, "description", dispatchDescription);
            }}
            onBlur={() => {
              defaultValidatorHandler(dispatchDescription);
            }}
          />
        </div>

        <div className={`${classes.textField_container} ${classes.features}`}>
          <div className={classes.features_input}>
            <TextField
              className={classes.featues_textfield}
              label="Feature"
              onChange={(event: any) => {
                defaultChangeHandler(event, "feature", dispatchFeatureName);
              }}
              onBlur={() => {
                defaultValidatorHandler(dispatchFeatureName);
              }}
            />
            <TextField
              className={classes.featues_textfield}
              label="Qty"
              onChange={(event: any) => {
                defaultChangeHandler(event, "qty", dispatchFeatureQty);
              }}
              type="number"
              onBlur={() => {
                defaultValidatorHandler(dispatchFeatureQty);
              }}
            />
          </div>

          <div className={classes.features_list}>
            <Button
              type="submit"
              design="orange"
              // onClick={addToCartHandler}
              style={classes.action_btn}
            >
              ADD FEATURE
            </Button>

            <div className={classes.features_list_elements}>
              {/* {selectedFeatures.map((form: any) => (

))} */}
              <div className={classes.feature_item}>
                <p className={classes.amount}>1x</p>
                <p>Headphone Unit</p>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
              <div className={classes.feature_item}>
                <p className={classes.amount}>1x</p>
                <p>Headphone Unit</p>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
              <div className={classes.feature_item}>
                <p className={classes.amount}>1x</p>
                <p>Headphone Unit</p>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
              <div className={classes.feature_item}>
                <p className={classes.amount}>1x</p>
                <p>Headphone Unit</p>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
              <div className={classes.feature_item}>
                <p className={classes.amount}>1x</p>
                <p>Headphone Unit</p>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
              <div className={classes.feature_item}>
                <p className={classes.amount}>1x</p>
                <p>Headphone Unit</p>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.action}>
          <Button
            type="button"
            design="outline"
            //   onClick={handleClose}
            style={classes.action_btn}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            design="orange"
            // onClick={addToCartHandler}
            style={classes.action_btn}
          >
            SAVE
          </Button>
        </div>
      </form>

      <div className={classes.upload_preview}>
        <div
          className={`${classes.image_preview} ${
            imageFile ? classes.image_active : ""
          }`}
        >
          {!imageFile && <img src="/images/default_admin_upload.png" alt="" />}
          {imageFile && (
            <img className={classes.uploaded_img} src={imageFile} />
          )}
        </div>
        <div className={classes.text_area}>
          {" "}
          <p>Product Review</p>
        </div>
      </div>
    </section>
  );
};

export default AdminUpload;
