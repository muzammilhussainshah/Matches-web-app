import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "#FFB6C1",
    width: { sm: `calc(100% - 300px)` },
    ml: { sm: "300px" },
  },
});

function Div({ children, ...props }) {
  const classes = useStyles();
  return (
    <Box classes={classes.root} {...props}>
      {children}
    </Box>
  );
}
export default Div;
