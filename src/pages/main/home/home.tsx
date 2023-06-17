import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RadioButton from "../../../components/UI/radioButton/radio-button";
import classes from "./home.module.scss";
import { LinearProgress } from "@mui/material";
import CusSwiper from "../../../components/swiper/swiper";
import Card from "../../../components/UI/card/card";
import useHttp from "../../../hooks/useHttp";
import { addToCart, getProducts } from "../../../services/api";
import { ProductI } from "../../../models/types";
import { addToCartPayload, addToCartResponse, cartType } from "../../../models/payload";

const Home = () => {
  const [radioBtnCheck, setRadioButtonCheck] = useState("first_page");
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const [fetchedEarphones, setFetchedEarphones] = useState <Array<ProductI>>([]);

  useEffect(() => {
    fetchproducts();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const pageTimer = setTimeout(() => {
      if (radioBtnCheck === "first_page") {
        setRadioButtonCheck("second_page");
      } else {
        setRadioButtonCheck("first_page");
      }
    }, 50000);
    return () => {
      clearTimeout(pageTimer);
    };
  }, [radioBtnCheck]);

  const fetchproducts = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getProducts);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
      }
      setFetchedEarphones(apiResponse.data);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }
  };



  const radioButtonValueChange = (event: any) => {
    const page = event.target.defaultValue;

    setRadioButtonCheck(page);
  };

  const createCards = (requiredType: string) => {

    const generatedDisplayedCards = fetchedEarphones.filter((contentType:any ) => (
      contentType.category.toLowerCase() === requiredType
    ))


    return generatedDisplayedCards.map((earphone: any) => (
      <Card
        slideContent={earphone}
        key={earphone._id}
        onCardClick={() => onCardClicked(earphone._id)}
        card_container={classes.cardContainer}
        addToCartClicked={addToCartHandler}
        isLoading = {isLoading}
      />
    ));
    // return generatedDisplayedCards;
  };

  const onCardClicked = (id: any) => {
    navigate(`../product-info/${id}`);
    console.log("clicked");
  };

  const addToCartHandler =  async (e: any, cartItem: addToCartPayload)=> {
    const cart = {cart: [cartItem], type: cartType.single};
    
    e.stopPropagation();
    try {
      setIsLoading(true);
       const apiResponse = await sendRequest(addToCart, cart);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        console.log(apiResponse)
      }
      // setFetchedEarphones(apiResponse.data);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }
    // console.log("add to cart clicked");
  };

  const newProductPages = [
    {
      pageName: "first_page",
      header: "XX99 Mark II Headphones",
      paragragph:
        " Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
    },
    {
      pageName: "first_page",
      header: (
        <span>
          ZX9 <br /> SPEAKER
        </span>
      ),
      paragragph:
        " Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
    },
  ];

  const headPhones: any = createCards('headphone');
  const speakers: any = createCards('speaker');

  return (
    <Fragment>
      {/* <Header /> */}
      {isLoading && <LinearProgress />}
      <section className={classes.home_container}>
        {/* New Product Page */}
        <div
          className={`${classes.newproduct_page} ${
            radioBtnCheck === "second_page" ? classes.secondPage : ""
          }`}
        >
          {newProductPages.map((pageDetail) => (
            <div className={classes.page_content}>
              <div className={classes.item_description}>
                <p className={classes.new_product}>NEW PRODUCT</p>
                <h1>{pageDetail.header}</h1>
                <p>
                  Experience natural, lifelike audio and exceptional build
                  quality made for the passionate music enthusiast.
                </p>
              </div>
            </div>
          ))}
          <div className={`${classes.image_container}`}>
            <div className={`${classes.imageItem} ${classes.page1}`}>
              <img src="/images/background_pg1.png" alt="" />
            </div>
            <div className={`${classes.imageItem} ${classes.page2}`}>
              <img src="/images/background_pg2.png" alt="" />
            </div>
          </div>

          <div
            className={`${classes.radio_button_container} ${
              radioBtnCheck === "second_page" ? classes.nextPage : ""
            }`}
          >
            <RadioButton
              onChange={radioButtonValueChange}
              checked={radioBtnCheck === "first_page"}
              class={classes.radioBtn}
              value="first_page"
            />
            <RadioButton
              onChange={radioButtonValueChange}
              checked={radioBtnCheck === "second_page"}
              class={classes.radioBtn}
              value="second_page"
            />
          </div>
        </div>

        {/* Products View Page */}
        <div className={classes.products_view}>
          {/* Top deals */}
          <div className={classes.products}>
            <h2>
              <span>HEADPHONES</span>{" "}
              <span className={classes.products_h2_span}></span>
            </h2>
            <CusSwiper
              slides={headPhones}
              slide={classes.swiper_slide}
              slidesPerView={3}
              btnStyle={classes.swiper_btn}
              swiper_style={classes.swiper_body}
              swiper_btn_container={classes.swiper_btn_container}
            />
          </div>

          {/* Trending products */}
          <div className={classes.products}>
            <h2>
              <span>SPEAKERS</span>{" "}
              {/* <span className={classes.products_h2_span}>PRODUCTS</span> */}
            </h2>
            <CusSwiper
              slides={speakers}
              slide={classes.swiper_slide}
              slidesPerView={3}
              btnStyle={classes.swiper_btn}
              swiper_style={classes.swiper_body}
              swiper_btn_container={classes.swiper_btn_container}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
