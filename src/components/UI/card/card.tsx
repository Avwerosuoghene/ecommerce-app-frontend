import classes from "./card.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from '@mui/icons-material/Star';
import { Fragment, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Button from "../button/Button";
import { cartType } from "../../../models/payload";

const Card = (props: any) => {
  const [contentLiked, setContentLiked] = useState(false);
  const [stars, setStars] = useState<Array<{ marked: number}>>([]);
  const [totalStars, setTotalStars] = useState(0);
  let slideContent = {...props.slideContent};
  const baseImagePath = process.env.REACT_APP_IMAGE_URL ;
;

  useEffect(() => {

    setTimeout(() => {
    }, 2000)
    const starsReceived : any = [];
        for (let i = 1; i <= slideContent.rating; i++) {
        
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
        <img src={baseImagePath+slideContent.image} alt="" />
      </div>
      <div className={classes.product_description}>
        <h3>{slideContent.title}</h3>
        <h4 className={classes.price}>{`$ ${slideContent.price}`} </h4>
      </div>
      <div className={classes.rating}>
        {stars.map((star) => (
            <StarIcon  key={star.marked }      sx={{ color: star.marked ? "#FFBF1B" : "#979797", fontSize: 20 }}/>
        ))}
        <p className={classes.reviews}>({`${slideContent.reviews}  Ratings`})</p>
      </div>
      <Button
            type="button"
            design="orange"
            onClick = {(event:any) => {
              props.addToCartClicked(event, {product: props.slideContent._id, quantity: 1, type: cartType.single})
            } }
            style={classes.card_button}
            disabled= {props.isLoading}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            ADD TO CART
          </Button>
    </section>
    </Fragment>
   
  );
};

export default Card;
