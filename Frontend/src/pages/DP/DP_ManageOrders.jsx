import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LoadingSpinner from "../../ui/LoadingSpinner";
import { DP_OrdersContext } from "../../context/DP/DP_OrdersContext";

import DP_OrdersTable from "../../components/DP/DP_Orders/DP_OrdersTable";
import DP_OrderDetailsDialog from "../../components/DP/DP_Orders/DP_OrderDetailsDialog";

const DP_ManageOrders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { orders, fetchAllOrders } = useContext(DP_OrdersContext);

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch All Orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        await fetchAllOrders();
      } catch (error) {
        showNotification("Failed to fetch orders data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleView = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedOrder(null);
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          m: isMobile ? "0px" : "1rem",
          mt: "1.5rem",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            width="100%"
          >
            <LoadingSpinner />
          </Box>
        ) : (
          <>
            {orders?.length === 0 ? (
              <Typography variant="h6" color="error">
                No orders data found.
              </Typography>
            ) : (
              <DP_OrdersTable
                orders={[...orders].reverse()}
                onView={handleView}
              />
            )}

            <DP_OrderDetailsDialog
              open={dialogOpen}
              onClose={handleDialogClose}
              order={selectedOrder}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default DP_ManageOrders;
