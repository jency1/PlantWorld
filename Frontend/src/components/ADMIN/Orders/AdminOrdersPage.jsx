import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { NotificationContext } from "../../../context/NotificationContext";
import { AdminOrdersContext } from "../../../context/ADMIN/AdminOrdersContext";

import OrdersTable from "./OrdersTable";
import OrderDetailsDialog from "./OrderDetailsDialog";

const AdminOrdersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { orders, fetchAllOrders } = useContext(AdminOrdersContext);
  const { showNotification } = useContext(NotificationContext);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // console.log("Orders from context:", orders);
    fetchAllOrders();
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
        {orders?.length === 0 ? (
          <Typography variant="h6" color="error">
            No orders data found.
          </Typography>
        ) : (
          <OrdersTable orders={[...orders].reverse()} onView={handleView} />
        )}

        <OrderDetailsDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          order={selectedOrder}
        />
      </Box>
    </Container>
  );
};

export default AdminOrdersPage;
