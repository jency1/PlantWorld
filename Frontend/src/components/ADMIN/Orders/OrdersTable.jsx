import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AdminAuthContext } from "../../../context/ADMIN/AdminAuthContext";
import { NotificationContext } from "../../../context/NotificationContext";
import { AdminOrdersContext } from "../../../context/ADMIN/AdminOrdersContext";

const statusOptions = [
  "Order Received",
  "Order Shipped",
  "Out for Delivery",
  "Order Delivered",
  "Order Cancelled",
];

const OrdersTable = ({ orders, onView }) => {
  const { adminToken } = useContext(AdminAuthContext);
  const { fetchAllOrders } = useContext(AdminOrdersContext);
  const { showNotification } = useContext(NotificationContext);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        showNotification("Failed to update status", "error");
        throw new Error(result.message || "Failed to update status");
      }

      fetchAllOrders();
      showNotification("Status updated successfully", "success");
    } catch (error) {
      showNotification("Error updating status", "error");
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    {
      field: "serial",
      headerName: "No.",
      flex: 0.15,
      renderCell: (params) =>
        paginationModel.page * paginationModel.pageSize +
        params.api.getRowIndexRelativeToVisibleRows(params.id) +
        1,
      sortable: false,
      filterable: false,
    },
    { field: "_id", headerName: "Order Id", flex: 0.4 },
    {
      field: "orderTotal",
      headerName: "Order Total",
      flex: 0.2,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.3,
      renderCell: (params) =>
        format(new Date(params.row.createdAt), "dd-MM-yyyy"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      renderCell: (params) => {
        const order = params.row;
        const currentStatus =
          order.status?.[order.status.length - 1]?.stage || "Order Received";

        return (
          <Box display="flex" justifyContent="center">
            <FormControl fullWidth size="small">
              <Select
                value={currentStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                sx={{
                  fontSize: isMobile ? "12px" : "14px",
                  minWidth: isMobile ? 120 : 160,
                }}
              >
                {statusOptions.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{ fontSize: isMobile ? "12px" : "14px" }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: (params) => (
        <Box width="100%" display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="success"
            size={isMobile ? "small" : "medium"}
            sx={{
              fontSize: isMobile ? "11px" : "13px",
              px: isMobile ? 1 : 2,
            }}
            onClick={() => onView(params.row)}
          >
            View
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        px: { xs: 0, sm: 1 },
      }}
    >
      <Box sx={{ minWidth: isMobile ? "810px" : "100%" }}>
        <DataGrid
          rows={orders}
          getRowId={(row) => row._id}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          showToolbar={true}
          sx={{
            fontSize: isMobile ? "12px" : "14px",
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#4caf50",
              fontWeight: "bold",
              fontFamily: "Poppins, Roboto, sans-serif",
            },
            "& .MuiDataGrid-row": {
              alignItems: "center !important",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
            "& .MuiTablePagination-root, & .MuiTablePagination-toolbar, & .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiSelect-icon":
              {
                fontWeight: "bold",
              },
            "& .Mui-disabled": {
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default OrdersTable;
