import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from "@mui/icons-material/Close";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../context/CLIENT/AuthContext";
import { CartContext } from "../../../context/CLIENT/CartContext";

const pages = ["Home", "Shop", "Blog", "About", "FAQ", "Contact"];
const links = ["/", "/shop", "/blog", "/about", "/faqs", "/contact"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#15803D", // Green
    },
  },
});

const drawerIcons = [
  <HomeIcon fontSize="small" />,
  <StoreIcon fontSize="small" />,
  <InfoIcon fontSize="small" />,
  <HelpIcon fontSize="small" />,
  <ContactMailIcon fontSize="small" />,
  <ArticleIcon fontSize="small" />,
];

function Navbar() {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "inline-flex", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src="/frontend/logo/logo.png"
                alt="PlantWorld"
                width="150"
                height="150"
              />
              {/* PlantWorld */}
            </Typography>

            {/* Mobile Right Side Menu Icon */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                marginLeft: "auto",
                alignItems: "center",
                gap: 1,
              }}
            >
              {isAuthenticated && (
                <Link to="/cart" style={{ color: "white" }}>
                  <Badge
                    badgeContent={cart?.length || 0}
                    color="error"
                    overlap="circular"
                  >
                    <ShoppingCartIcon
                      style={{ fontSize: "24px", cursor: "pointer" }}
                    />
                  </Badge>
                </Link>
              )}
              <IconButton
                size="large"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pages.map((page, i) => (
                <Link
                  key={page + i}
                  to={links[i]}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      transition: "color 0.2s ease, transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Desktop Cart and Profile */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                ml: "auto",
                alignItems: "center",
                gap: 2,
              }}
            >
              {isAuthenticated && (
                <Tooltip title="View Cart">
                  <Link to="/cart" style={{ color: "white" }}>
                    <Badge
                      badgeContent={cart?.length || 0}
                      color="error"
                      overlap="circular"
                    >
                      <ShoppingCartIcon
                        style={{ fontSize: "28px", cursor: "pointer" }}
                      />
                    </Badge>
                  </Link>
                </Tooltip>
              )}
              {isAuthenticated ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile" src="/frontend/Profile.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  onClick={() => (window.location.href = "/login")}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>

            {/* Dropdown Menu */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  sx: {
                    width: 170,
                    borderRadius: 2,
                    boxShadow: 5,
                    color: "#15803D",
                    px: 2,
                    py: 1.5,
                  },
                },
              }}
            >
              {isAuthenticated
                ? [
                    <Link
                      key="profile"
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{
                          px: 2,
                          pb: 1.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <AccountCircleIcon fontSize="small" />
                        <Typography>Profile</Typography>
                      </MenuItem>
                    </Link>,

                    <Link
                      key="myOrders"
                      to="/myOrders"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem
                        key="orders"
                        onClick={handleCloseUserMenu}
                        sx={{
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <ReceiptLongIcon fontSize="small" />
                        <Typography>My Orders</Typography>
                      </MenuItem>
                    </Link>,

                    <Link
                      key="settings"
                      to="/settings"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem
                        key="settings"
                        onClick={handleCloseUserMenu}
                        sx={{
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <SettingsIcon fontSize="small" />
                        <Typography>Settings</Typography>
                      </MenuItem>
                    </Link>,

                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleCloseUserMenu();
                        logout();
                      }}
                      sx={{
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LogoutIcon fontSize="small" />
                      <Typography>Logout</Typography>
                    </MenuItem>,
                  ]
                : [
                    <Link
                      key="login"
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{
                          px: 2,
                          py: 1.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <LoginIcon fontSize="small" />
                        <Typography>Login</Typography>
                      </MenuItem>
                    </Link>,
                  ]}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 220, pt: 2, height: "100%" }} role="presentation">
          {/* Close Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 1 }}>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <List>
            {pages.map((page, i) => (
              <Link
                key={page + i}
                to={links[i]}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ px: 2, py: 1 }}>
                    {drawerIcons[i]}
                    <ListItemText primary={page} sx={{ ml: 1 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>

          {/* Cart Option */}
          {isAuthenticated && (
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ px: 2, py: 1 }}>
                  <ShoppingCartIcon fontSize="small" />
                  <ListItemText primary="View Cart" sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {/* Auth Buttons */}
          <Box sx={{ px: 2, mt: 2 }}>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button fullWidth startIcon={<AccountCircleIcon />}>
                    Profile
                  </Button>
                </Link>
                <Link
                  to="/myOrders"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button fullWidth startIcon={<ReceiptLongIcon />}>
                    My Orders
                  </Button>
                </Link>
                <Link
                  to="/settings"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button fullWidth startIcon={<SettingsIcon />}>
                    Settings
                  </Button>
                </Link>
                <Button fullWidth startIcon={<LogoutIcon />} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button fullWidth startIcon={<LoginIcon />}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

export default Navbar;
