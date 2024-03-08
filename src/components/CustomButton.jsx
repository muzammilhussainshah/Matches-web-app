import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function CustomButton({
  backColor = "#24A59E",
  children,
  variant,
  color,
  onClick,
  label,
  size,
  startIcon,
  endIcon,
  sx,
  border,
  ...props
}) {
  return (
    <Button
      style={{
        textTransform: "none",
        backgroundColor: backColor,
        border: border
      }}
      {...props}
      variant={variant}
      color={color}
      onClick={onClick}
      label={label}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={sx}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {};
