import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Navbar from "../components/CLIENT/Navbar/Navbar";

const ErrorPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "90vh",
          backgroundColor: "#f0fdf4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          color="text.primary"
          mb={1}
        >
          404 - Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={3}
          maxWidth="500px"
        >
          Oops! The page you’re looking for doesn’t exist or may have been
          moved.
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to="/"
          color="success"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Go Back to Home
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
