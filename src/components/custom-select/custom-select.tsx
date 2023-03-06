import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import classes from "./custom-select.module.scss";

const CustomSelect = (props: {
  value: string | undefined;
  label: string;
  menuItems: Array<string>;
  handleChange: (event: any) => void;
  style: any
  rawStyle: any
}) => {
  return (
    <FormControl
      sx={{ m: 1, width: "100%" , textAlign: 'start'}}
      variant="outlined"
      className={`${classes.formControl} ${props.style}`}
     
    >
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        style={props.rawStyle}
      >
        {props.menuItems.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
