import { Button, IconButton } from "@mui/material";
import { useState, useRef, useEffect, Fragment } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { ReactComponent as LeftArrow } from "../../assets/images/Arrow - Left Circle.svg";
import { ReactComponent as RightArrow } from "../../assets/images/Arrow - Right Circle.svg";

import classes from "./swiper.module.scss";

const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  const swiper = useSwiper();

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);

  return [wrapper, ref];
};

const CusSwiper = (props: any) => {
  const [nextEl, nextSlideRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevSlideRef] = useSwiperRef<HTMLButtonElement>();

  const [swipe, setSwipe] = useState<any>();
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const [lastSlide, setLastSlide] = useState(false);
  const [firstSlide, setFirstSlide] = useState(true);

  // useEffect(() => {

  // }, [firstSlide, lastSlide, slideProgress])

  const slideClickHandler = () => {
    setTimeout(() => {
      setLastSlide(swipe.isEnd);
      setFirstSlide(swipe.isBeginning);
    }, 500);
  };

  const prevButtonClicked = () => {
    slideClickHandler();
    swipe?.slidePrev();
  };

  const nextButtonClicked = () => {
    slideClickHandler();
    swipe?.slideNext();
  };

  return (
    <Fragment>
      <div className={`${classes.swiper_buttons_container} ${props.swiper_btn_container} ${props.btnStyle} `}>
        <IconButton
          aria-label="like"
          color="primary"
          ref={prevSlideRef}
          className={classes.swiper_btn}
          disabled={firstSlide}
          onClick={prevButtonClicked}
        >
          <LeftArrow className={classes.swiperBtn_icon} />
        </IconButton>
        <IconButton
          aria-label="like"
          color="primary"
          ref={nextSlideRef}
          className={classes.swiper_btn}
          disabled={lastSlide}
          onClick={nextButtonClicked}
        >
          <RightArrow className={classes.swiperBtn_icon} />
        </IconButton>
      </div>

      <Swiper
        slidesPerView={props.slidesPerView}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={{
          prevEl,
          nextEl,
        }}
        modules={[Navigation]}
        className={`${classes.swiper} ${props.swiper_style}`}
        onBeforeInit={(swipper) => {
          setSwipe(swipper);
          setLastSlide(swipper.isEnd);
          setFirstSlide(swipper.isBeginning);
        }}
      >

{props.slides.map((slide: any) => (
          <SwiperSlide className={props.slide}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};

export default CusSwiper;
