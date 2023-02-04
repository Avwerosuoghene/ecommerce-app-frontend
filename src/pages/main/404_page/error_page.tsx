import classes from "./error.module.scss";

const ErrorPage = () => {
  return (
    <div className={classes.error}>
      <h1>Page does not exist</h1>
    </div>
  );
};

export default ErrorPage;
