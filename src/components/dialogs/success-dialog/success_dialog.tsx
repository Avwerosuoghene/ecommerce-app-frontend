import { Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../models/types";
import Button from "../../UI/button/Button";

import classes from "./success.module.scss";

const SuccessDialog = (props: any) => {
  const navigate = useNavigate();

  const handleClose = () => {
    props.onClose("dialog closed");
  };

  const baseImagePath = process.env.REACT_APP_IMAGE_URL;

  const continueBtnClicked = () => {
    props.onClose();
  }

  const purchasedItems = [
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
    >
      <DialogContent className={classes.dialog_content}>
        <div className={classes.succes_icon_container}>
          <img src="/images/purchase_success_icon.png" alt="" />
        </div>
        <h3 className={classes.title_msg}>
          THANK YOU <br />
          FOR YOUR ORDER
        </h3>
        <p className={classes.confirmation}>
          You will receive an email confirmation shortly.
        </p>
        <div className={classes.success_summary}>
          <div className={classes.items_listing}>
            <div className={classes.cart_items}>
              {props.order.cartItems.map((item:CartItem) => (
                <div className={classes.dialog_cart_item} key={item._id}>
                  <div className={classes.img_price}>
                    <div className={classes.dialog_image_container}>
                      <img src={baseImagePath + item.product.image} alt="" />
                    </div>
                    <div className={classes.dialog_itemName_price}>
                      <strong>{item.product.title}</strong>
                      <p>$ {item.sum}</p>
                    </div>
                  </div>
                  <p>x {item.quantity}</p>
                </div>
              ))}
            </div>
            <hr />
            {/* <a href="">
            View less
            </a> */}
          </div>
          <div className={classes.total}>
            <h5>
                GRAND TOTAL
            </h5>
            <h5 className={classes.amount}>
                $ {props.order.total}
            </h5>
          </div>
        </div>

        <div className={classes.action}>
                <Button
                  type="button"
                  design="orange"
                  onClick={continueBtnClicked}
                //   disabled = {!formIsValid}
                  style={classes.dialog_checkout_button}
                >
                  BACK TO HOME
                </Button>
              </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
