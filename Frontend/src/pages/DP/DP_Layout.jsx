import React, { useState } from "react";
import { Box, Toolbar, CssBaseline } from "@mui/material";
import { useLocation, Outlet } from "react-router-dom";

import DP_Header from "../../components/DP/DP_Header";
import DP_Sidebar from "../../components/DP/DP_Sidebar";

const drawerWidth = 240;

const DP_Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const currentPath = location.pathname.split("/").pop();
  const pageTitleMap = {
    orders: "My Orders",
    profile: "My Profile",
    settings: "Settings",
    login: "Login",
  };
  const pageTitle = pageTitleMap[currentPath] || "Delivery Partner Panel";

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* Header - fixed */}
      <DP_Header
        handleDrawerToggle={handleDrawerToggle}
        pageTitle={pageTitle}
      />

      {/* Sidebar - fixed */}
      <DP_Sidebar
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

export default DP_Layout;
