import { Checkbox } from "@mui/material";
import { withStyles } from "@mui/styles";

const CustomCheckbox = withStyles({
  root: {
    color: "#24A59E",
    "&$checked": {
      color: "#24A59E",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default CustomCheckbox;
