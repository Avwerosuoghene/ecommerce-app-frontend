import classes from "./radio-button.module.scss"

const RadioButton = (props :any) => {
    return (
        <div className={`${classes.radio_btn__container} ${props.class}`}>
        <input
          className={classes.radio_input}
          type="radio"
          value={props.value}
          onChange={props.onChange}
          checked={props.checked}
        />
          <span className={classes.custom_radio} />
      </div>
    )
}

export default RadioButton
