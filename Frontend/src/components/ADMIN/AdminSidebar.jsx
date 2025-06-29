import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate, useLocation } from "react-router-dom";
import { AdminAuthContext } from "../../context/ADMIN/AdminAuthContext";
import ConfirmationDialog from "../../ui/ConfirmationDialog";

const drawerWidth = 240;

const AdminSidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const navigate = useNavigate();

  const { logoutAdmin } = useContext(AdminAuthContext);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const navItems = [
    // { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Plants", icon: <LocalFloristIcon />, path: "/admin/plants" },
    { text: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
    { text: "Users", icon: <GroupIcon />, path: "/admin/users" },
    { text: "FAQs", icon: <QuestionAnswerIcon />, path: "/admin/faqs" },
    { text: "Logout", icon: <LogoutIcon />, path: "/admin/logout" },
  ];

  const handleItemClick = (path) => {
    if (path === "/admin/logout") {
      setConfirmLogoutOpen(true);
    } else {
      navigate(path);
    }

    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleConfirmLogout = () => {
    logoutAdmin();
    setConfirmLogoutOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Admin Profile Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        <AccountCircleIcon
          sx={{
            fontSize: {
              xs: 60,
              sm: 70,
              md: 80,
              lg: 90,
            },
            color: "#4ead54",
            mb: 1,
            display: "block",
            mx: "auto",
          }}
        />

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "green", fontSize: "1.5rem" }}
        >
          Admin
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Links */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleItemClick(item.path)}
              sx={{
                width: "100%",
                maxWidth: "100%",
                "&:hover": {
                  backgroundColor: "#43a047",
                  color: "#fff",
                },
                "&.Mui-selected": {
                  backgroundColor: "#4ead54",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#43a047",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    noWrap
                    sx={{
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile + Medium (xs to md) => Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ecffed",
            overflowX: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Large (lg and above) => Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ecffed",
            overflowX: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <ConfirmationDialog
        open={confirmLogoutOpen}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        onCancel={() => setConfirmLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default AdminSidebar;
