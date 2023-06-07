import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import classes from "./checkout_dialog.module.scss";
import UIButton from "../../UI/button/Button";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/button/Button";

const CheckoutDialog = (props: any) => {

  const navigate = useNavigate();


  const handleClose = () => {

    props.onClose("dialog closed");
  };

  const addToCartHandler = () => {
    navigate("/main/checkout")
    props.onClose("dialog closed");
  }

  const cartItems = [
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 2999,
      qty: 1,
      idx: 0,
    },
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 4999,
      qty: 2,
      idx: 1,
    },
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 4999,
      qty: 1,
      idx: 2,
    },
    {
      image: "/images/headphone1.png",
      name: "XX99 MK II",
      price: 4999,
      qty: 1,
      idx: 3,
    },
  ];

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
        <div className={classes.dialog_header}>
          <h4>CART (3)</h4>
          <h5 className={classes.orange}>Remove all</h5>
        </div>
        {/* <div className={classes.dialog_body}> */}

        <div className={classes.cart_items}>
          {cartItems.map((cartItem) => (
            <div className={classes.dialog_cart_item} key={cartItem.idx}>
              <div className={classes.img_price}>
                <div className={classes.dialog_image_container}>
                  <img src={cartItem.image} alt="" />
                </div>
                <div className={classes.dialog_itemName_price}>
                  <strong>{cartItem.name}</strong>
                  <p>$ {cartItem.price}</p>
                </div>
              </div>

              <div className={classes.product_items_adjust}>
                <IconButton
                  aria-label="substract"
                  color="primary"
                  className={classes.reduce_btn}
                  // onClick={decreaseProductSelection}
                >
                  <RemoveIcon
                    sx={{ color: "#000", fontSize: 10 }}
                    className={classes.add}
                                     
                  />
                </IconButton>

                <p>{cartItem.qty}</p>

                <IconButton
                  aria-label="add"
                  color="primary"
                  className={classes.increase_btn}
                  // onClick={increaseProductSelection}
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

        <div className={classes.lower_elements}>
          <div className={classes.total}>
            <strong className={classes.total}>TOTAL</strong>
            <strong>$ 5,396</strong>
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
          </div>
        </div>

        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
