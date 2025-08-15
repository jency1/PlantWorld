import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { Button, Box, useTheme, useMediaQuery } from "@mui/material";

const OrdersTable = ({ orders, onView }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "serial",
      headerName: "No.",
      flex: 0.1,
      renderCell: (params) =>
        paginationModel.page * paginationModel.pageSize +
        params.api.getRowIndexRelativeToVisibleRows(params.id) +
        1,
      sortable: false,
      filterable: false,
    },
    { field: "_id", headerName: "Order Id", flex: 0.4 },
    {
      field: "fullName",
      headerName: "Name",
      flex: 0.3,
      renderCell: (params) => params.row.user?.name || "N/A",
    },
    {
      field: "mobile",
      headerName: "Mobile No.",
      flex: 0.25,
    },
    {
      field: "orderTotal",
      headerName: "Order Total",
      flex: 0.2,
      renderCell: (params) => `₹${params?.value}`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.25,
      renderCell: (params) =>
        format(new Date(params?.row?.createdAt), "dd-MM-yyyy"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.25,
      renderCell: (params) => {
        const statusArray = params?.row?.status || [];
        return statusArray.length
          ? statusArray[statusArray.length - 1]?.stage
          : "Order Received";
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
          showToolbar={true}
          sx={{
            fontSize: isMobile ? "12px" : "14px",
            paddingLeft: "5px",
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
