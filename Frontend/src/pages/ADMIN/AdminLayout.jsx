import React, { useState } from "react";
import { Box, Toolbar, CssBaseline } from "@mui/material";
import { useLocation, Outlet } from "react-router-dom";

import Header from "../../components/ADMIN/AdminHeader";
import AdminSidebar from "../../components/ADMIN/AdminSidebar";

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const currentPath = location.pathname.split("/").pop();
  const pageTitleMap = {
    // dashboard: "Admin Dashboard",
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

      {/* Header - fixed */}
      <Header handleDrawerToggle={handleDrawerToggle} pageTitle={pageTitle} />

      {/* Sidebar - fixed */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fff9",
          mb: 5,
          marginLeft: { xs: 0, md: `${drawerWidth}px` },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          pt: { xs: 8, sm: 9 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
