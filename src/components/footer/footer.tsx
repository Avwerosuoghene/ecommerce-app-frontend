import { IconButton } from "@mui/material";
import classes from "./footer.module.scss";
import { ReactComponent as FaceBookIcon } from "../../assets/images/Facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/images/Twitter.svg";
import { ReactComponent as InstagramIcon } from "../../assets/images/Instagram.svg";

const Footer = (props: any) => {
  return (
    <section className={classes.footer_container}>
      <div className={classes.top_elements}>
        <h2>audiophile</h2>
        <div className={classes.social_media_icons}>
          <IconButton
            aria-label="like"
            color="primary"
            className={classes.social_btn}
          >
            <FaceBookIcon />
          </IconButton>
          <IconButton
            aria-label="like"
            color="primary"
            className={classes.social_btn}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            aria-label="like"
            color="primary"
            className={classes.social_btn}
          >
            <InstagramIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.main_text}>
        <p className={classes.descrp1}>
        Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
        </p>
        <p>
        Copyright 2021. All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
