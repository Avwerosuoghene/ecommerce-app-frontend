import { IconButton, LinearProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import classes from "./checkout_dialog.module.scss";
import UIButton from "../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/button/Button";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import { getCart } from "../../../services/api";
import { CartItem } from "../../../models/types";

const CheckoutDialog = (props: any) => {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { sendRequest } = useHttp();
  const [cartItemQtyTouched, setCartItemQtyTouched] = useState<Boolean>(false);
  const baseImagePath = process.env.REACT_APP_IMAGE_URL;
  const [totalAmount, setTotalAmount] = useState<number>(0);


  const handleClose = () => {

    props.onClose("dialog closed");
  };

  const onSave = () => {

  };

  const decreaseProductSelection = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity !== 0) {

      updatedCart[index].quantity -= 1;
      updatedCart[index].sum -= updatedCart[index].product.price
      setTotalAmount(totalAmount - updatedCart[index].product.price);
      setCartItems(updatedCart)
      setCartItemQtyTouched(true)
    }

  }

  const increaseProductSelection = (index: number) => {
    const updatedCart = [...cartItems];


    updatedCart[index].quantity += 1;
    updatedCart[index].sum += updatedCart[index].product.price
    setCartItems(updatedCart);
    setTotalAmount(totalAmount + updatedCart[index].product.price);
    setCartItemQtyTouched(true);

  }

  const addToCartHandler = () => {
    navigate("/main/checkout")
    props.onClose("dialog closed");
  }

  useEffect(() => {
    fetchCartItems()
  }, []);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getCart);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        setCartItems(apiResponse.data.cart)
        setTotalAmount(apiResponse.data.total)
        console.log(apiResponse)
      }

    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }
  }

  // const cartItems = [
  //   {
  //     image: "/images/headphone1.png",
  //     name: "XX99 MK II",
  //     price: 2999,
  //     qty: 1,
  //     idx: 0,
  //   },
  //   {
  //     image: "/images/headphone1.png",
  //     name: "XX99 MK II",
  //     price: 4999,
  //     qty: 2,
  //     idx: 1,
  //   },
  //   {
  //     image: "/images/headphone1.png",
  //     name: "XX99 MK II",
  //     price: 4999,
  //     qty: 1,
  //     idx: 2,
  //   },
  //   {
  //     image: "/images/headphone1.png",
  //     name: "XX99 MK II",
  //     price: 4999,
  //     qty: 1,
  //     idx: 3,
  //   },
  // ];

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      sx={{
        backdropFilter: "blur(2px)",
      }}
      className={classes.dialog}
    >
      <DialogContent className={classes.dialog_content}>
        {isLoading && <LinearProgress />}

        <div className={classes.dialog_header}>
          <h4>CART {cartItems.length !== 0 ? cartItems.length : ''}</h4>
          <h5 className={classes.orange}>Remove all</h5>
        </div>
        {/* <div className={classes.dialog_body}> */}

        {
          cartItems.length > 0 &&
          <div className={classes.cart_items}>
            {cartItems && cartItems?.map((cartItem: CartItem, index) => (
              <div className={classes.dialog_cart_item} key={cartItem._id}>
                <div className={classes.img_price}>
                  <div className={classes.dialog_image_container}>
                    <img src={baseImagePath + cartItem.product.image} alt="" />
                  </div>
                  <div className={classes.dialog_itemName_price}>
                    <strong>{cartItem.product.title}</strong>
                    <p>$ {cartItem.sum}</p>
                  </div>
                </div>

                <div className={classes.product_items_adjust}>
                  <IconButton
                    aria-label="substract"
                    color="primary"
                    className={classes.reduce_btn}
                    onClick={() => {
                      decreaseProductSelection(index)
                    }}
                  // onClick={decreaseProductSelection}
                  >
                    <RemoveIcon
                      sx={{ color: "#000", fontSize: 10 }}
                      className={classes.add}

                    />
                  </IconButton>

                  <p>{cartItem.quantity}</p>

                  <IconButton
                    aria-label="add"
                    color="primary"
                    className={classes.increase_btn}
                    onClick={() => {
                      increaseProductSelection(index)
                    }}
                  >
                    <AddIcon
                      sx={{ color: "#000", fontSize: 10 }}
                      className={classes.add}

                    />
                  </IconButton>
                </div>
              </div>
            ))}

          </div>

        }

        {cartItems.length === 0 && <h5> You currently have no item in your cart</h5>}

        <div className={classes.lower_elements}>
          <div className={classes.total}>
            <strong className={classes.total}>TOTAL</strong>
            <strong>$ {totalAmount}</strong>
          </div>

          <div className={classes.action}>

            <Button
              type="button"
              design="outline"
              onClick={handleClose}
              style={classes.dialog_continue_button}
            >
              CONTINUE SHOPPING
            </Button>
            <Button
              type="button"
              design="orange"
              onClick={addToCartHandler}
              style={classes.dialog_checkout_button}
            >
              CHECKOUT
            </Button>
            {cartItemQtyTouched && <Button
              type="button"
              design="orange"
              onClick={onSave}
              style={classes.dialog_save_button}
            >
              SAVE
            </Button>}

          </div>
        </div>

        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
