import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#EBEBEB",
        borderRadius: 5,
      },
      "&:hover fieldset": {
        borderColor: "#EBEBEB",
        borderRadius: 5,
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        borderRadius: 5,
      },
    },
  },
});

export default function InputField({
  label,
  fullWidth,
  multiline,
  rows,
  maxRows,
  size,
  placeholder,
  defaultValue,
  value,
  onChange,
  required,
  sx,
  ...props
}) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      sx={sx}
      label={label}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      size={size}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      required={required}
      variant="outlined"
      {...props}
    />
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  sx: PropTypes.object,
};
