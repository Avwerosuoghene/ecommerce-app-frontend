import classes from "./admin-upload.module.scss";
import RemoveIcon from "@mui/icons-material/Remove";

import { ReactComponent as UploadIcon } from "../../../assets/images/upload_icon.svg";
import Button from "../../../components/UI/button/Button";

import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CusForm from "../../../components/form/form";
import CustomSelect from "../../../components/custom-select/custom-select";
import { ReactComponent as AddIcon } from "../../../assets/images/add.svg";
import { FormHelperText, IconButton, TextField } from "@mui/material";
import { editUpload, getProductById, postUpload } from "../../../services/api";
import useHttp from "../../../hooks/useHttp";
import { HelperComponent } from "../../../components/helper/helper.component";




const AdminUpload = () => {
  const helperComponent = new HelperComponent();
  const { sendRequest } = useHttp();
  const baseImagePath = process.env.REACT_APP_IMAGE_URL ;

  const [imageDragOver, setImageDragOver] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [titleState, dispatchTitle] = useReducer(
    helperComponent.defaultReducer,
    {
      value: "",
      isValid: false,
      touched: false,
    }
  );
  const [priceState, dispatchPrice] = useReducer(
    helperComponent.defaultReducer,
    {
      value: "",
      isValid: false,
      touched: false,
    }
  );


  const [descriptionState, dispatchDescription] = useReducer(
    helperComponent.defaultReducer,
    {
      value: "",
      isValid: false,
      touched: false,
    }
  );

  const [featuresDescriptionState, dispatchFeaturesDescription] = useReducer(
    helperComponent.defaultReducer,
    {
      value: "",
      isValid: false,
      touched: false,
    }
  );

  const [featureNameState, dispatchFeatureName] = useReducer(
    helperComponent.defaultReducer,
    {
      value: "",
      isValid: false,
      touched: false,
    }
  );

  const [featureQtyState, dispatchFeatureQty] = useReducer(
    helperComponent.defaultReducer,
    {
      value: "",
      isValid: false,
      touched: false,
    }
  );

  const [selectedFeatures, setSelectedFeatures]: Array<any> = useState([]);
  // let updatedFeatures: Array<Object>;

  const [selectedCategory, setSelectedCategory] = useState("");

  const { isValid: titleIsValid } = titleState;
  const { isValid: priceIsValid } = priceState;
  const { isValid: featuresDescriptionIsValid } = featuresDescriptionState;
  const { isValid: descriptionIsValid } = descriptionState;
  const navigate = useNavigate();
  const { id } = useParams();

  const imageInputRef: any = useRef();
  const [editStatus, setEditStatus] = useState(false)

  const [imageFile, setImageFile]: any = React.useState();

  useEffect(() => {
    if(id !== undefined) {
      console.log(id)
      fetchproduct();
      setEditStatus(true)
    }
  }, [])

  useEffect(() => {
   
    // updatedFeatures = selectedFeatures;
  }, [imageDragOver, selectedFeatures, imageFile]);

  const formSubmissionHandler = async (event: any) => {
    event.preventDefault();

    const userId = helperComponent.getUser();

    let formData = new FormData();
    if(imageFile.file) {
      formData.append("image", imageFile.file);
    }

    formData.append("title", titleState.value);
    formData.append("featuresDescription", featuresDescriptionState.value);
    formData.append("price", priceState.value);
    formData.append("description", descriptionState.value);
    formData.append("category", selectedCategory);
    formData.append("userId", userId!);
    formData.append("features", JSON.stringify(selectedFeatures)!);


    try {
      setIsLoading(true);
      let apiResponse;
      console.log(editStatus)
      if (!editStatus) {
        apiResponse = await sendRequest(postUpload, formData);
      } else {
        apiResponse = await sendRequest(editUpload,{formData:formData, id:id });
      }
  
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        setTimeout(() => {
          navigate("/admin/home")
        },1000)
    
      }

      console.log(apiResponse);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in post upload ${error}`);
    }
  };

  const fetchproduct = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getProductById, id);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        const {
          category,
          description,
          features,
          image,
          price,
          rating,
          title,
          featuresDescription,
          reviews,
        } = apiResponse.data;
        populateFields(apiResponse.data)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }
  };

  const populateFields =(fieldsData: any) => {
    // titleState.value = "test"
    // console.log(descriptionState.value)
    // descriptionState.value = 'testing'
    dispatchTitle({
      type: "INPUT",
      value:fieldsData.title,
      element: "title"
    })
    setSelectedCategory(fieldsData.category)
    dispatchFeaturesDescription({
      type: "INPUT",
      value: fieldsData.featuresDescription,
      element: "description"
   })
    dispatchDescription({
      type: "INPUT",
      value: fieldsData.description,
      element: "description"
   })
   dispatchPrice({
      type: "INPUT",
      value: fieldsData.price.toString(),
      element: "price"
   })
   setImageFile({
    // file: baseImagePath+fieldsData.image,
    url:  baseImagePath+fieldsData.image,
  });
   setSelectedFeatures([...fieldsData.features])
  // descriptionState.value = fieldsData.data.description
  } 

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
          featuresDescriptionIsValid &&
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
    featuresDescriptionIsValid,
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
    setImageFile({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });

  };

  const imageDragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const addFeatureHandler = () => {
    setSelectedFeatures((current: Array<Object>) => [
      ...current,
      { name: featureNameState.value, quantity: featureQtyState.value },
    ]);
    // setSelectedFeatures((current: Array<Object>) => [...current, {name:featureNameState.value, quantity: featureQtyState.value }]);
    console.log(selectedFeatures);
    dispatchFeatureName({
      type: "CLEAR",
      value: undefined,
      element: "featureName",
    });
    dispatchFeatureQty({
      type: "CLEAR",
      value: undefined,
      element: "featureQuantity",
    });
  };

  const removeSelectedFeatureHandler = (index: number) => {
    const updated = selectedFeatures;
    updated.splice(index, 1);
    setSelectedFeatures((current: Array<Object>) => [...updated]);
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

  const uploadForms_descriptions = [
    {
      labelFor: "Description",
      label: "Description",
      placeholder: "",
      inputState: descriptionState,
      dispatchName: dispatchDescription,
      error: !descriptionState.isValid && descriptionState.touched,
      errorMessage: " Kindly enter a valid description",
    },
    {
      labelFor: "Features_Description",
      label: "Features Description",
      placeholder: "",
      inputState: featuresDescriptionState,
      dispatchName: dispatchFeaturesDescription,
      error: !featuresDescriptionState.isValid && featuresDescriptionState.touched,
      errorMessage: " Kindly enter a valid features description",
    },
  ];

  return (
    <section className={classes.upload_container}>
      <h3 className={classes.header}>Products</h3>
      <form
        onSubmit={formSubmissionHandler}
        className={classes.post_upload_form}
        encType="multipart/form-data"
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
            name="file"
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
          {uploadForms_descriptions.map((form: any) => (
            <TextField
            key={form.label}
              className={`${classes.textField} ${classes[form.labelFor]}`}
              label={form.label}
              multiline
              rows={4}
              value={form.inputState.value}
              onChange={(event: any) => {
                defaultChangeHandler(event, "description", form.dispatchName);
              }}
              onBlur={() => {
                defaultValidatorHandler(form.dispatchName);
              }}
              error={form.error}
              // errorMessage={form.errorMessage}
            />
          ))}
        </div>

        <div className={`${classes.textField_container} ${classes.features}`}>
          <div className={classes.features_input}>
            <TextField
              className={classes.featues_textfield}
              label="Feature"
              onChange={(event: any) => {
                defaultChangeHandler(event, "feature", dispatchFeatureName);
              }}
              value={featureNameState.value}
              onBlur={() => {
                defaultValidatorHandler(dispatchFeatureName);
              }}
              error={featureNameState.touched && !featureNameState.isValid}
            >
              {featureNameState.touched && !featureNameState.isValid && (
                <FormHelperText error>Invalid Name</FormHelperText>
              )}
            </TextField>
            <TextField
              className={classes.featues_textfield}
              label="Qty"
              onChange={(event: any) => {
                defaultChangeHandler(event, "price", dispatchFeatureQty);
              }}
              type="number"
              onBlur={() => {
                defaultValidatorHandler(dispatchFeatureQty);
              }}
              value={featureQtyState.value}
            >
              {featureQtyState.touched && !featureQtyState.isValid && (
                <FormHelperText error>Invalid Price</FormHelperText>
              )}
            </TextField>
          </div>

          <div className={classes.features_list}>
            <Button
              type="button"
              design="orange"
              onClick={addFeatureHandler}
              style={classes.action_btn}
              disabled={
                (!featureNameState.isValid && !featureQtyState.isValid) ||
                (featureNameState.isValid && !featureQtyState.isValid) ||
                (featureQtyState.isValid && !featureNameState.isValid) ||
                (featureQtyState.touched && !featureQtyState.isValid) ||
                (featureNameState.touched && !featureNameState.isValid) ||
                (!featureQtyState.touched && !featureNameState.touched)
              }
            >
              ADD FEATURE
            </Button>

            <div className={classes.features_list_elements}>
              {selectedFeatures.map((feature: any, i: number) => (
                <div className={classes.feature_item} key={i + feature.name}>
                  <p className={classes.amount}>{feature.quantity} x</p>
                  <p>{feature.name}</p>
                  <IconButton
                    aria-label="substract"
                    color="primary"
                    className={classes.reduce_btn}
                    onClick={() => {
                      removeSelectedFeatureHandler(i);
                    }}
                  >
                    <RemoveIcon
                      sx={{ color: "#000", fontSize: 12 }}
                      className={classes.add}
                    />
                  </IconButton>
                </div>
              ))}
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
            disabled={
              !formIsValid || selectedFeatures.length <= 0 || !imageFile
            }
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
            <img
              className={classes.uploaded_img}
              src={imageFile.url}
              alt="A product"
            />
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
