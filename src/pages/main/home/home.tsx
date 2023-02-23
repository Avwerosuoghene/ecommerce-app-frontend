import { Fragment, useEffect, useRef, useState } from "react";
import { createSearchParams, NavLink, useNavigate } from "react-router-dom";

import RadioButton from "../../../components/UI/radioButton/radio-button";
import Header from "../../header/header";
import classes from "./home.module.scss";
import { Button } from "@mui/material";
import CusSwiper from "../../../components/swiper/swiper";
import Card from "../../../components/UI/card/card";
import Footer from "../../../components/footer/footer";

// const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
//   const [wrapper, setWrapper] = useState<T | null>(null)
//   const ref = useRef<T>(null)

//   useEffect(() => {
//     if (ref.current) {
//       setWrapper(ref.current)
//     }
//   }, [])

//   return [wrapper, ref]
// }

const Home = () => {
  const [radioBtnCheck, setRadioButtonCheck] = useState("first_page");
  const navigate = useNavigate();


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

  const radioButtonValueChange = (event: any) => {
    const page = event.target.defaultValue;

    setRadioButtonCheck(page);
  };

  const createCards = (cardsArray: any) => {
    const generatedDisplayedCards = cardsArray.map((slide: any) => (
      <Card slideContent={slide} key= {slide.serial} onCardClick = {onCardClicked} card_container = {classes.cardContainer} addToCartClicked = {addToCartHandler} />
    ));
    // console.log(generatedDisplayedCards)
    return generatedDisplayedCards;
  };

  const onCardClicked = () => {
  
    navigate(`../product-info/${1}`);
    
  //   navigate({
  //     pathname: "../product-info/",
  //     search: createSearchParams({
  //         id: "1"
  //     }).toString()
  // });
    console.log('clicked')
  }

  const addToCartHandler = (e: any) => {
    e.stopPropagation();
    console.log('add to cart clicked')
  }

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

  const topDeals: any = [
    {
      img: "/images/headphone1.png",
      header: "YX1 WIRELESS EARPHONES",
      price: "1,750",
      stars: 3,
      ratings: 12,
      serial: 1
    },
    {
      img: "/images/headphone1.png",
      header: "YX1 WIRELESS EARPHONES",
      price: "1,750",
      stars: 5,
      ratings: 10,
      serial: 2
    },
    {
      img: "/images/headphone1.png",
      header: "YX1 WIRELESS EARPHONES",
      price: "1,750",
      stars: 5,
      ratings: 8,
      serial: 3
    },
    {
      img: "/images/headphone1.png",
      header: "YX1 WIRELESS EARPHONES",
      price: "1,750",
      stars: 1,
      ratings: 6,
      serial: 4
    },
  ];

  const trendingProducts: any = [
    {
      img: "/images/speaker1.png",
      header: "YX1 WIRELESS EARPHONES",
      price: "1,750",
      stars: 3,
      ratings: 12,
      serial: 1
    },
    {
      img: "/images/speaker1.png",
      header: "XX59 Headphones",
      price: "1,750",
      stars: 5,
      ratings: 10
    },
    {
      img: "/images/speaker1.png",
      header: "XX59 Headphones",
      price: "1,750",
      stars: 5,
      ratings: 8
    },
    {
      img: "/images/speaker1.png",
      header: "YX1 WIRELESS EARPHONES",
      price: "1,750",
      stars: 1,
      ratings: 6
    },
  ];

  const cardsTopDeals: any = createCards(topDeals);
  const cardsTrendingProducts: any = createCards(trendingProducts);
  

  return (
    <Fragment>
      {/* <Header /> */}
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
              <span>TOP</span>{" "}
              <span className={classes.products_h2_span}>DEALS</span>
            </h2>
            <CusSwiper
              slides={cardsTopDeals}
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
              <span>TRENDING</span>{" "}
              <span className={classes.products_h2_span}>PRODUCTS</span>
            </h2>
            <CusSwiper
              slides={cardsTrendingProducts}
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
