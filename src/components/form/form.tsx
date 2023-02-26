import { PropaneSharp } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, SvgIcon } from "@mui/material";

import classes from "./form.module.scss"

const CusForm = (props: any) => {

    return (
        <FormControl
        sx={{ m: 1, width: "100%" }}
        variant="outlined"
        className={`${classes.formControl} ${classes[props.formControlStyle]} ${props.customClass}`}
        style={props.rawStyle}
      >
        <InputLabel
          htmlFor={props.labelFor}
          className={classes._input_label}
        >
          {props.label}
        </InputLabel>
        <OutlinedInput
          className={classes._input}
          placeholder={props.placeholder}
          type={props.type}
          error={props.error}
          inputProps={{ sx: { height: props.height } }}
          value={props.inputState.value}  
          
          
          startAdornment=  { props.startAdornmentIcon &&
            <InputAdornment position="start">
            <SvgIcon fontSize="small" className={classes._input_icon}>
            {props.startAdornmentIcon}
            </SvgIcon>
          </InputAdornment>
          }
            endAdornment = {props.endAdornmentIcon &&   <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.endAdornmentIconClick}
              onMouseDown={props.endAdornmentIconMouseDown}
              edge="end"
            //   className={classes.login_input_iconButton}
            >
              {props.endAdornmentIcon}
            </IconButton>
          </InputAdornment>}
          label={props.label}
          onChange={props.inputChangeHandler}
          onBlur={props.inputValidator}
        />
        {props.error && (
          <FormHelperText error>
           {props.errorMessage}
          </FormHelperText>
        )}
        {/* {props.formHelperText &&   <FormHelperText error >
              {props.formHelperText}
            </FormHelperText>} */}
      </FormControl>
    )
   
}

export default CusForm;