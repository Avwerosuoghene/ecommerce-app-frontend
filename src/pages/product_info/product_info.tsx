import StarIcon from "@mui/icons-material/Star";
import { IconButton, LinearProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import classes from "./product_info.module.scss";
import Button from "../../components/UI/button/Button";
import CheckoutDialog from "../../components/dialogs/checkout-dialog/checkout_dialog";
import { addToCart, getProductById } from "../../services/api";
import useHttp from "../../hooks/useHttp";
import { cartType, getProductByIdResponse } from "../../models/payload";

const ProductInfo = () => {
  const [open, setOpen] = useState(false);
  const baseImagePath = process.env.REACT_APP_IMAGE_URL;

  const [itemQty, setItemQty] = useState <number>(1) 

  const addToCartHandler = async (e: any) => {

    // setOpen(true);
    const cart = {cart: [
      {product: product!._id, quantity: itemQty }
    ], type: cartType.single};
    
    e.stopPropagation();
    try {
      setIsLoading(true);
       const apiResponse = await sendRequest(addToCart, cart);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        console.log(apiResponse)
        openCart();
      }
      // setFetchedEarphones(apiResponse.data);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }

  };

  const openCart = () => {
    setOpen(true);
  }

  

  const { id } = useParams();

  const increaseProductSelection = () => {
    const newQty = itemQty+1
    setItemQty(newQty)
  };

  const decreaseProductSelection = () => {
    const newQty = itemQty-1;
    if (newQty >=1)
    setItemQty(newQty)
  };



  const handleDialogClose = (value: string) => {
    setOpen(false);
  };

  const [product, setProduct] = useState<getProductByIdResponse>();

  const [isLoading, setIsLoading] = useState(false);
  const { sendRequest } = useHttp();
  console.log(product);

  useEffect(() => {
    fetchproduct();
  }, []);

  const fetchproduct = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getProductById, id);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        const {
          _id,
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
        setProduct({
          _id,
          category,
          description,
          features,
          image,
          price,
          rating,
          title,
          featuresDescription,
          reviews,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }
  };


  return (
    <Fragment>
      {isLoading && <LinearProgress />}
      <section className={classes.product_detail_container}>
        <div className={classes.product_display}>
          <div className={classes.image_container}>
            <img src={baseImagePath + product?.image} alt="" />
          </div>
          <div className={classes.new_product_heading}>
            
          <div className={classes.top_el}>
              <h4 className={classes.newP}>NEW PRODUCT</h4>
            </div>
            <h2>{product?.title}</h2>
            <p>{product?.description}</p>

        

          
          </div>
          <div className={classes.ratings_actions}>
          <div className={classes.top_el}>
              <NavLink to={`/main/home`} className={classes.goBack_navlink}>
                Go Back
              </NavLink>
            </div>
          <div className={classes.price_rating}>
              <h4>$ {product?.price}</h4>
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

                <h4>{itemQty}</h4>

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

            <p className={classes.p1}>{product?.featuresDescription}</p>
          </div>

          <div className={classes.box_contents}>
            <h3>IN THE BOX</h3>
            {product?.features.map((feature) => (
              <div className={classes.content_values}>
                <p className={classes.amount}>{feature.quantity} x</p>
                <p>{feature.name}</p>
              </div>
            ))}

            {/* <div className={classes.content_values}>
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
            </div> */}
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

      {open && <CheckoutDialog open={open} onClose={handleDialogClose} />}
    </Fragment>
  );
};

export default ProductInfo;
