import classes from "./admin-card.module.scss";
import { Fragment} from "react";
import Button from "../button/Button";

const AdminCard = (props: any) => {
  let adminCardContent = {...props.slideContent};
  const baseImagePath = process.env.REACT_APP_IMAGE_URL ;
;


  return (
    <Fragment>


<section className={`${classes.card_container} ${props.card_container}`} onClick = {props.onCardClick}>
      <div className={classes.image_container}>
        <img src={baseImagePath+adminCardContent.image} alt="" />
      </div>
      <div className={classes.product_description}>
        <h3>{adminCardContent.title}</h3>
        <h4 className={classes.price}>{`$ ${adminCardContent.price}`} </h4>
      </div>
      <Button
            type="button"
            design="orange"
            onClick = {props.onEditClicked}
            style={classes.card_button}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            EDIT
          </Button>
      <Button
            type="button"
            design="outline"
            onClick = {props.onDeleteClicked}
            style={classes.card_button}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            DELETE
          </Button>
    </section>
    </Fragment>
   
  );
};

export default AdminCard;
