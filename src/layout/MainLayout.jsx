import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import SideBar from "../components/SideBar.";
import { colors } from "../util/colors";
import { DRAWER_WIDTH } from "../util/constant";

const drawerWidth = DRAWER_WIDTH;

export default function MainLayout() {
  const path = useLocation().pathname;
  return (
    <>
      <SideBar />
      <Suspense fallback={<Loader color="Green" />}>
        <Box
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            backgroundColor: colors.background_color,
            height: {
              xs:
                path === "/location"? "230vh"
                  : path === "/addEvent"
                  ? "160vh"
                  : path === "/chat"
                  ? "100vh"
                  : path === "/calculator"
                  ? "130vh"
                  : path === "/"
                  ? "220vh"
                  : path === "/calender"
                  ? "170vh"
                  : path === "/profile"
                  ? "140vh"
                  : "100vh",
              sm: path === "/location" ? "160vh" : "100vh",
              md:
                path === "/"
                  ? "130vh"
                  : path === "/location"
                  ? "320vh"
                  : "200vh",
              lg:
                path === "/"
                  ? "100vh"
                  : path === "/users"
                  ? "245vh"
                  : path === "/feedback"
                  ? "180vh"
                  : path === "/calender"
                  ? "245vh"
                  : path === "/chat"
                  ? "100vh"
                  : path === "/location"
                  ? "130vh"
                  : "120vh",
            },
            paddingTop: 3,
          }}
        >
          <Outlet />
        </Box>

        {/* {isLogin ? <Outlet /> : <Navigate to={"/signup"} replace />} */}
      </Suspense>
    </>
  );
}
