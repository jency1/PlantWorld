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
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const pages = ["Home", "Shop", "About", "FAQ", "Contact", "Blog"];
const links = ["/", "/shop", "/", "/", "/", "/"];
const settings = ["Profile", "Account", "Dashboard", "Login", "Logout"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#000", // Black
    },
  },
});

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                //   letterSpacing: ".3rem",
              }}
            >
              PlantWorld
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page, i) => (
                  <MenuItem key={page + i} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link
                        to={links[i]}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Responsive */}

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="HomePage"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                // letterSpacing: ".3rem",
              }}
            >
              PlantWorld
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pages.map((page, i) => (
                <>
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
                        textDecoration: "none",
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                </>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile" src="/Profile.jpg" />
                </IconButton>
              </Tooltip>
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
                {settings.map((setting, index) => (
                  <MenuItem key={setting + index} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
