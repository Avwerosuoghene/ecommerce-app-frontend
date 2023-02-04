import classes from "./card.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from '@mui/icons-material/Star';
import { Fragment, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Button from "../button/Button";

const Card = (props: any) => {
  const [contentLiked, setContentLiked] = useState(false);
  const [stars, setStars] = useState<Array<{ marked: number}>>([]);
  const [totalStars, setTotalStars] = useState(0);
//   const [slideContent, setSlideContent] = useState <any | undefined>(undefined);
  //   let stars:Array<{marked: boolean}>  = []
  let slideContent = {...props.slideContent};

  useEffect(() => {
    // console.log(slideContent)
    // console.log(slideContent)

    setTimeout(() => {
        // console.log(slideContent)
    }, 2000)
    const starsReceived : any = [];
        for (let i = 1; i <= slideContent.stars; i++) {
        
            starsReceived.push({marked: i})
        }
  
    setStars([...starsReceived]);


  }, []);

  const likeButtonClickHandler = (e: any) => {
    e.stopPropagation();
    console.log("clicked");
    setContentLiked((prevState) => {
      return !prevState;
    });
  };

  // const cardClickedHandler = (e: any) => {
  //   e.stopPropagation();
  // }

  return (
    <Fragment>


<section className={`${classes.card_container} ${props.card_container}`} onClick = {props.onCardClick}>
      <div className={classes.image_container}>
        <IconButton
          aria-label="like"
          color="primary"
          className={classes.like_btn}
          onClick={likeButtonClickHandler}
        >
          <FavoriteIcon
            sx={{ color: contentLiked ? "#d72929" : "#979797", fontSize: 30 }}
            className={classes.love_icon}
          />
        </IconButton>

        <img src={slideContent.img} alt="" />
      </div>
      <div className={classes.product_description}>
        <h3>{slideContent.header}</h3>
        <h4 className={classes.price}>{`$ ${slideContent.price}`} </h4>
      </div>
      <div className={classes.rating}>
        {stars.map((star) => (
            <StarIcon  key={star.marked }      sx={{ color: star.marked ? "#FFBF1B" : "#979797", fontSize: 20 }}/>
        ))}
        <p className={classes.reviews}>({`${slideContent.ratings}  Ratings`})</p>
      </div>
      <Button
            type="button"
            design="orange"
            onClick = {props.addToCartClicked}
            style={classes.card_button}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            ADD TO CART
          </Button>
    </section>
    </Fragment>
   
  );
};

export default Card;
