import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
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

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const pages = ["Home", "Shop", "About", "FAQ", "Contact", "Blog"];
const links = ["/", "/shop", "/about", "/faqs", "/contact", "/"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#15803D", // Green
    },
  },
});

function Navbar() {
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
              PlantWorld
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
                  <ShoppingCartIcon
                    style={{ fontSize: "24px", cursor: "pointer" }}
                  />
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

              {isAuthenticated ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile" src="/Profile.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  onClick={() => (window.location.href = "/login")}
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    minWidth: "auto",
                    padding: "6px 8px",
                  }}
                >
                  Login
                </Button>
              )}
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
                    <ShoppingCartIcon
                      style={{ fontSize: "28px", cursor: "pointer" }}
                    />
                  </Link>
                </Tooltip>
              )}
              {isAuthenticated ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile" src="/Profile.jpg" />
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
            >
              {isAuthenticated ? (
                [
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                    key="profile"
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        Profile
                      </Typography>
                    </MenuItem>
                  </Link>,
                  <MenuItem onClick={logout} key="logout">
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>,
                ]
              ) : (
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        textAlign: "center",
                        transition: "color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                          color: "yellow",
                        },
                      }}
                    >
                      Login
                    </Typography>
                  </MenuItem>
                </Link>
              )}
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
        <Box
          sx={{ width: 200, textAlign: "center", paddingTop: "20px" }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            {pages.map((page, i) => (
              <ListItem
                key={page + i}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(25, 135, 84, 0.7)",
                  },
                  textAlign: "center",
                  backgroundColor: "rgba(25, 135, 84, 0.1)",
                  color: "black",
                }}
              >
                <Link
                  to={links[i]}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  <ListItemText primary={page} />
                </Link>
              </ListItem>
            ))}
          </List>
          {isAuthenticated && (
            <Tooltip title="View Cart">
              <Link
                to="/cart"
                style={{
                  display: "block",
                  padding: "8px 16px",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                View Cart
              </Link>
            </Tooltip>
          )}
          {isAuthenticated ? (
            <Box sx={{ padding: 2 }}>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button fullWidth>Profile</Button>
              </Link>
              <Button fullWidth onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ padding: 2 }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button fullWidth>Login</Button>
              </Link>
            </Box>
          )}
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

export default Navbar;
