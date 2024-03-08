import { Typography } from "@mui/material";

export default function Text({ children, ...props }) {
  return <Typography {...props}>{children}</Typography>;
}
