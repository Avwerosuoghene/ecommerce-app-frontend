import classes from "./loader.module.scss";

const Loader = (props: any) => {
  return (
    <section>
      <div className={`${classes.lds_ripple} ${classes[props.design]} ${props.style}`}>
        <div className={classes.first_ripple}></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loader;
