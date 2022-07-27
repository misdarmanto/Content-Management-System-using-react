import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { colors, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextApi } from "../../lib/hooks/useContextApi";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/config/firebase";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import MyArticel from "./components/MyArticel";
import MyProfile from "./components/MyProfile";
import DashboardHome from "./components/DashboardHome";
import CreateArticel from "./components/CreateArticel";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsAuth } = useContextApi();

  const [navigationSelect, setNavigationSelect] = useState("articels");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        navigate("/Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerListNavigation = () => {
    switch (navigationSelect) {
      case "articels":
        return <MyArticel />;
      case "create articel":
        return <CreateArticel />;
      case "profile":
        return <MyProfile />;
      default:
        return <DashboardHome />;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["articels", "create articel", "profile"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                setNavigationSelect(text);
              }}
            >
              <ListItemIcon>
                <IconButton
                  sx={{
                    backgroundColor:
                      navigationSelect === text
                        ? colors.blue[700]
                        : colors.blue[50],
                  }}
                >
                  {text === "articels" && (
                    <ListAltIcon
                      sx={{
                        color:
                          navigationSelect === text
                            ? colors.common.white
                            : colors.blue[700],
                      }}
                    />
                  )}
                  {text === "create articel" && (
                    <CreateNewFolderIcon
                      sx={{
                        color:
                          navigationSelect === text
                            ? colors.common.white
                            : colors.blue[700],
                      }}
                    />
                  )}
                  {text === "profile" && (
                    <PersonRoundedIcon
                      sx={{
                        color:
                          navigationSelect === text
                            ? colors.common.white
                            : colors.blue[700],
                      }}
                    />
                  )}
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: colors.grey[700] }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <ListItemButton onClick={() => navigate("/")}>
              <HomeRoundedIcon />
              <Typography sx={{ fontWeight: "bold" }}>Home</Typography>
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <LogoutOutlinedIcon />
              <Typography sx={{ fontWeight: "bold" }}>Logout</Typography>
            </ListItemButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: colors.grey[100],
          minHeight: "100vh"
        }}
      >
        <Toolbar />
        <DrawerListNavigation />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
