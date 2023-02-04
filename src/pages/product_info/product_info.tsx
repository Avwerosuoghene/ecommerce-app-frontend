import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import classes from "./product_info.module.scss";
import Button from "../../components/UI/button/Button";
import CheckoutDialog from "../../components/dialogs/checkout-dialog/checkout_dialog";

const ProductInfo = () => {
  const [open, setOpen] = useState(false);

  const addToCartHandler = (e: any) => {
    setOpen(true);
  };

  const params = useParams();

  const increaseProductSelection = () => {};

  const handleDialogClose = (value: string) => {
    setOpen(false);
  };

  const decreaseProductSelection = () => {};
  return (
    <Fragment>
      <section className={classes.product_detail_container}>
        <div className={classes.product_display}>
          <div className={classes.image_container}>
            <img src="/images/headphone1.png" alt="" />
          </div>
          <div className={classes.new_product_heading}>
            <div className={classes.top_el}>
              <h4 className={classes.newP}>NEW PRODUCT</h4>
              <NavLink
                to={`/main/home`}
                className={classes.goBack_navlink}
              >
                Go Back
              </NavLink>
            </div>

            <h2>XX99 Mark II Headphones</h2>
            <p>
              The new XX99 Mark II headphones is the pinnacle of pristine audio.
              It redefines your premium headphone experience by reproducing the
              balanced depth and precision of studio-quality sound.
            </p>

            <div className={classes.price_rating}>
              <h4>$ 2,999</h4>
              <div className={classes.rating}>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <h4 className={classes.verified}>(12 verified Rating)</h4>
              </div>
            </div>

            <div className={classes.action}>
              <div className={classes.product_items_adjust}>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>

                <h4>1</h4>

                <IconButton
                  aria-label="add"
                  color="primary"
                  className={classes.increase_btn}
                  onClick={increaseProductSelection}
                >
                  <AddIcon
                    sx={{ color: "#000", fontSize: 12 }}
                    className={classes.add}
                  />
                </IconButton>
              </div>
              <Button
                type="button"
                design="orange"
                onClick={addToCartHandler}
                style={classes.product_cart_button}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>

        <div className={classes.features_contained}>
          <div className={classes.features}>
            <h3>FEATURES</h3>

            <p className={classes.p1}>
              Featuring a genuine leather head strap and premium earcups, these
              headphones deliver superior comfort for those who like to enjoy
              endless listening. It includes intuitive controls designed for any
              situation. Whether you’re taking a business call or just in your
              own personal space, the auto on/off and pause features ensure that
              you’ll never miss a beat.
            </p>

            <p>
              The advanced Active Noise Cancellation with built-in equalizer
              allow you to experience your audio world on your terms. It lets
              you enjoy your audio in peace, but quickly interact with your
              surroundings when you need to. Combined with Bluetooth 5. 0
              compliant connectivity and 17 hour battery life, the XX99 Mark II
              headphones gives you superior sound, cutting-edge technology, and
              a modern design aesthetic.
            </p>
          </div>

          <div className={classes.box_contents}>
            <h3>IN THE BOX</h3>
            <div className={classes.content_values}>
              <p className={classes.amount}>1x</p>
              <p>Headphone Unit</p>
            </div>
            <div className={classes.content_values}>
              <p className={classes.amount}>2x</p>
              <p>Replacement Earcups</p>
            </div>

            <div className={classes.content_values}>
              <p className={classes.amount}>1x</p>
              <p>User Manual</p>
            </div>

            <div className={classes.content_values}>
              <p className={classes.amount}>1x</p>
              <p>3.5mm 5m Audio Cable</p>
            </div>
          </div>
        </div>

        <div className={classes.reviews}>
          <h3>Verified Customer Feedback</h3>

          <hr />
          <div className={classes.reviews_body}>
            <div className={classes.reviews_summary}>
              <div className={classes.ratings_box}>
                <h3 className={classes.ratings}>4.6/5</h3>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <p className={classes.ratings}>12 verified ratings</p>
              </div>

              <div className={classes.reviews_breakdown}>
                <div className={classes.review_category}>
                  <p>5(2)</p>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 15 }} />
                  <div
                    className={`${classes.ratings_rec} ${classes.allocated}`}
                  ></div>
                </div>
                <div className={classes.review_category}>
                  <p>4(10)</p>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 15 }} />
                  <div
                    className={`${classes.ratings_rec} ${classes.allocated}`}
                  ></div>
                </div>
                <div className={classes.review_category}>
                  <p>3(0)</p>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 15 }} />
                  <div className={`${classes.ratings_rec} `}></div>
                </div>
                <div className={classes.review_category}>
                  <p>2(0)</p>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 15 }} />
                  <div className={`${classes.ratings_rec} `}></div>
                </div>
                <div className={classes.review_category}>
                  <p>1(0)</p>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 15 }} />
                  <div className={`${classes.ratings_rec} `}></div>
                </div>
              </div>
            </div>

            <div className={classes.reviews_comments}>
              <h4>COMMENTS FROM PURCHASES(6)</h4>
              <div className={classes.comment_item}>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <p className={classes.ratings}>it’s very comfortable</p>
                <p className={classes.commentBy}>03-05-2022by MAUREEN</p>
              </div>

              <div className={classes.comment_item}>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <p className={classes.ratings}>The colour ???? so sweet</p>
                <p className={classes.commentBy}>03-05-2022by MAUREEN</p>
              </div>

              <div className={classes.comment_item}>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <p className={classes.ratings}>Good design</p>
                <p className={classes.commentBy}>03-05-2022by MAUREEN</p>
              </div>

              <div className={classes.comment_item}>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <p className={classes.ratings}>it’s very comfortable</p>
                <p className={classes.commentBy}>03-05-2022by MAUREEN</p>
              </div>

              <div className={`${classes.comment_item} ${classes.last_item}`}>
                <div className={classes.stars}>
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                  <StarIcon sx={{ color: "#FFBF1B", fontSize: 20 }} />
                </div>
                <p className={classes.ratings}>Good design</p>
                <p className={classes.commentBy}>03-05-2022by MAUREEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CheckoutDialog open={open} onClose={handleDialogClose} />
    </Fragment>
  );
};

export default ProductInfo;
