import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";

import Popover from "@mui/material/Popover";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Button, colors, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextApi } from "../../lib/hooks/useContextApi";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/config/firebase";
import { grey } from "@mui/material/colors";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { isAuth, setIsAuth, allArticles } = useContextApi();
  const titleArticles = allArticles.map((data) => data.title);

  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState([]);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopUpSearch = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopUpSearch = () => {
    setAnchorEl(null);
    setSearchResult([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchResult([]);
      return;
    }
    const regex = titleArticles.filter((title) => {
      if (title.toUpperCase().search(e.target.value.toUpperCase()) !== -1) {
        return title;
      }
    });
    setSearchResult(regex);
  };

  const handleNavigateSearchResult = (title) => {
    const result = allArticles.find((data) => data.title === title);
    navigate("/DetailArticle", { state: result });
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        navigate("/login");
      })
      .catch((error) => {});
  };

  const hanldeDialogLogOut = () => {
    setOpenDialogLogout(!openDialogLogout);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = isAuth ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate("/Dashboard", { replace: true })}>
        <IconButton>
          <DashboardRoundedIcon />
        </IconButton>
        <p>Dashboard</p>
      </MenuItem>
      <MenuItem onClick={hanldeDialogLogOut}>
        <IconButton>
          <LogoutOutlinedIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate("/Login")}>
        <IconButton>
          <LoginRoundedIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/SignUp")}>
        <IconButton>
          <ExitToAppTwoToneIcon />
        </IconButton>
        <p>Sign Up</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <LocalFireDepartmentIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontWeight="bold"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            My Blog
          </Typography>
          <Search onFocus={handleOpenPopUpSearch}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* poper search */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopUpSearch}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{
                width: { xs: "300px", sm: "500px" },
                height: { xs: "300px", sm: "500px" },
                padding: "20px",
              }}
            >
              <Search
                onChange={handleSearch}
                sx={{
                  border: "1px solid #f3f3f3",
                  borderRadius: "10px",
                  backgroundColor: grey[50],
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <List sx={{ mt: 2 }}>
                {searchResult.map((title, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleNavigateSearchResult(title);
                        handleClosePopUpSearch();
                      }}
                    >
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Popover>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuth ? (
              <>
                <ListItemButton onClick={() => navigate("/Dashboard")}>
                  <DashboardRoundedIcon />
                  <Typography sx={{ fontWeight: "bold", pl: 1 }}>
                    Dashboard
                  </Typography>
                </ListItemButton>

                <ListItemButton onClick={hanldeDialogLogOut}>
                  <LogoutOutlinedIcon />
                  <Typography sx={{ fontWeight: "bold", pl: 1 }}>
                    Logout
                  </Typography>
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton onClick={() => navigate("/login")}>
                  <LoginRoundedIcon />
                  <Typography
                    sx={{
                      color: colors.common.white,
                      fontWeight: "bold",
                      pl: 0.7,
                    }}
                  >
                    Login
                  </Typography>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/signin")}>
                  <ExitToAppTwoToneIcon />
                  <Typography
                    sx={{
                      color: colors.common.white,
                      fontWeight: "bold",
                      pl: 0.7,
                    }}
                  >
                    Sign Up
                  </Typography>
                </ListItemButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      <Dialog
        open={openDialogLogout}
        onClose={hanldeDialogLogOut}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={hanldeDialogLogOut}>Cancel</Button>
          <Button
            onClick={() => {
              hanldeDialogLogOut();
              handleLogout();
            }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
