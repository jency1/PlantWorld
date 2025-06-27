import React, { useState } from "react";
import { Box, Toolbar, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";

import Header from "../../components/ADMIN/AdminHeader";
import AdminSidebar from "../../components/ADMIN/AdminSidebar";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const currentPath = location.pathname.split("/").pop();
  const pageTitleMap = {
    dashboard: "Admin Dashboard",
    plants: "Manage Plants",
    orders: "Manage Orders",
    users: "Manage Users",
    faqs: "Manage FAQs",
    login: "Login",
  };
  const pageTitle = pageTitleMap[currentPath] || "Admin Panel";

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* Header */}
      <Header handleDrawerToggle={handleDrawerToggle} pageTitle={pageTitle} />

      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f9fff9",
          minHeight: "100vh",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
