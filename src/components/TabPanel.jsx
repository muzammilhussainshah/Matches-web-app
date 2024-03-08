import { Box } from "@mui/material";
import { Suspense } from "react";
import Loader from "./Loader";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: "100%" }}>
          <Suspense fallback={<Loader color="black" />}>{children}</Suspense>
        </Box>
      )}
    </div>
  );
}
