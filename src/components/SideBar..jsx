import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Logo } from "../assets";
import {
  Menu,
  MenuItem,
  Stack,
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Calculator,
  Home,
  Calender,
  Chat,
  Profile,
  Setting,
  ProfileWhite,
  FeedbackWhite,
  Feedback,
  Widgets
} from "../assets/sidebarIcons";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "mui-image";
import ResponsiveAppbar from "./Appbar";
import { useLocation, useNavigate } from "react-router-dom";
import { DRAWER_WIDTH } from "../util/constant";
import { logout } from '../store/actions/action'
import { useDispatch, useSelector } from 'react-redux'

const drawerWidth = DRAWER_WIDTH;

function SideBar() {
  const dispatch = useDispatch()

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const [menu, setMenu] = useState([]);


  const path = useLocation().pathname;
  useEffect(() => {
    let adminBar = [{
      id: 1,
      title: "Matches",
      icon: Profile,
      iconLight: ProfileWhite,
      isSelected: false,
      isSelected: path === '/matches' ? true : false,
    },
    {
      id: 2,
      title: "Interest",
      icon: Feedback,
      iconLight: FeedbackWhite,
      isSelected: path === '/interest' ? true : false,
    },
    {
      id: 3,
      title: "Log Out",
      icon: "Logout",
      isSelected: false,
    },]
    setMenu(adminBar)
  }, [path]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // useEffect(() => {
  //   if (path === "/") {
  //     handleClick(1);
  //   }
  //   else if (path === "/interest") {
  //     handleClick(2);
  //   }
  //   else if (path === "/") {
  //     handleClick(3);
  //   }
  // }, [path]);

  const handleClick = (id) => {
    if (id === 1) {
      navigate("/matches");
    }
    else if (id === 2) {
      navigate("/interest");
    }
    else if (id === 3) {
      navigate("/");
      dispatch(logout(navigate))
    }
    const a = menu.map((item) => {
      item.id === id ? (item.isSelected = true) : (item.isSelected = false);
      return item;
    });
    // setMenu(a);
  };

  const navigate = useNavigate();
  const size = menu.length - 1;
  const drawer = (
    <Stack marginTop={2}>
      <Toolbar>
        <Image src={Logo} fit="contain" />
      </Toolbar>

      <Stack marginX={5} marginTop={4}>

        <ListItem
          disablePadding
          sx={{
            borderRadius: 2,
            color: "#868893",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Image
                sx={
                  {
                    filter: "brightness(70%)",
                  }
                }
                src={Widgets}
                width={20}
              />

            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>

        {menu && menu.length > 0 && menu.map((item, index) => (
          <Stack marginTop={index === menu.length - 1 && 18} key={index}>
            <ListItem
              disablePadding
              onClick={() => {
                if (sm) {
                  handleClick(item.id);
                  handleDrawerToggle();
                } else {
                  handleClick(item.id);
                }
              }}
              sx={{
                // backgroundColor: item.isSelected && index !== size && "#24A59E",
                backgroundColor: item.isSelected && index !== size && "#24A59E",
                borderRadius: 2,
                color: item.isSelected && index !== size ? "white" : "#868893",
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {item.icon === "Logout" ? (
                    <LogoutIcon sx={{ color: "#868893" }} />
                  ) : (
                    <Image
                      sx={
                        index === 0
                          ? !item.isSelected && {
                            filter: "brightness(70%)",
                          }
                          : item.isSelected && {
                            filter: "brightness(200%)",
                            imageRendering: "crisp-edges",
                          }
                      }
                      src={item.isSelected ? item.iconLight : item.icon}
                      width={20}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box>
      <ResponsiveAppbar
        handleDrawerToggle={handleDrawerToggle}
        handleProfileMenuOpen={handleProfileMenuOpen}
        renderMenu={renderMenu}
      />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          elevation={0}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SideBar;
