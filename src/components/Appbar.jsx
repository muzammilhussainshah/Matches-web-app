import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import {
  createTheme,
  InputBase,
  useTheme,
  Avatar,
  Badge,
  CardHeader,
  useMediaQuery,
  Box,
  Toolbar,
  Stack,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Text from "./Text";
import { DRAWER_WIDTH } from "../util/constant";
import { colors } from "../util/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchKeywords } from '../store/actions/action';

const border = createTheme({
  shape: {
    borderRadius: 8,
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: border.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#868893",
}));

const StyledInputBase = styled(InputBase)(({ theme, xs }) => ({
  "& .MuiInputBase-input": {
    padding: xs ? theme.spacing(0, 1, 0, 0) : theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(xs ? 3 : 4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: xs && 30,
    color: xs ? "black" : "#868893",
    fontSize: "12px",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function ResponsiveAppbar({
  handleDrawerToggle,
  handleProfileMenuOpen,
  renderMenu,
}) {
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const drawerWidth = DRAWER_WIDTH;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("md"));

  const tools = {
    background: "white",
    borderRadius: 2,
    width: xs ? 30 : 40,
    height: xs ? 30 : 40,
    cursor: "pointer",
  };

  const path = useLocation().pathname;

  function getTitle() {
    let a = path.slice(1);
    let b = a[0].toUpperCase() + a.slice(1);
    return b;
  }
  let currentUser = useSelector((state) => state.reducer.user);

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100vw - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: `${colors.background_color}`,
          paddingTop: 1,
          paddingLeft: { xs: 0, sm: 3 },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon sx={{ color: colors.green }} />
          </IconButton>
          <Stack direction="row" alignItems={"center"} width="100%">
            <Stack flexGrow={{ xs: 0, md: 1 }} />
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={{ xs: 1, sm: 2 }}
              marginRight={2}
              width="100%"
              justifyContent={"flex-end"}
            >

              {/* <Stack
                justifyContent={"center"}
                width={{ xs: 170, sm: 320, md: 400 }}
                marginRight={{ xs: 0, sm: 10, md: 0 }}
                marginLeft={{ xs: 0, sm: 10, md: 0 }}
              >
                <Search>
                  <SearchIconWrapper xs={xs}>
                    <SearchIcon fontSize={xs ? "small" : "medium"} />
                  </SearchIconWrapper>
                  <StyledInputBase xs={xs} placeholder={role != 'admin' ? "Search events" : "Search Email"} onChange={(e) => { dispatch(setSearchKeywords(e.target.value.split(' '))) }} />
                </Search>
              </Stack> */}

              <Stack direction={"row"} spacing={{ xs: 1, md: 2 }}>
                <Stack
                  sx={{ background: "white", borderRadius: 2 }}
                  height={{ xs: 30, md: 40 }}
                  width={{ xs: 30, md: 40, lg: 220 }}
                  direction="row"
                  alignItems="center"
                  justifyContent={{ xs: "center", lg: "flex-end" }}
                >
                  <Stack display={{ xs: "flex", lg: "none" }}>
                    <IconButton onClick={handleProfileMenuOpen}>
                      <Avatar
                        sx={{
                          width: { xs: 20, md: 25 },
                          height: { xs: 20, md: 25 },
                        }}
                        alt="User"
                        src={
                          null
                        }
                      />
                    </IconButton>
                  </Stack>
                  {/* const items =; */}


                  <Stack display={{ xs: "none", lg: "flex" }} style={{ width: '300%', }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ width: 25, height: 25 }}
                          alt="User"
                          src={
                            null
                          }
                        />
                      }
                      title={
                        <Text color="black">
                          {/* {currentUser.email} */}
                          {JSON.parse(localStorage.getItem('userEmail'))}
                        </Text>
                      }
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
export default ResponsiveAppbar;
