import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const UsersTable = ({ users }) => {
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
      flex: 0.15,
      renderCell: (params) =>
        paginationModel.page * paginationModel.pageSize +
        params.api.getRowIndexRelativeToVisibleRows(params.id) +
        1,
      sortable: false,
      filterable: false,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.3,
      renderCell: (params) => (
        <Box
          sx={{
            textTransform: "capitalize",
            fontSize: isMobile ? "12px" : "14px",
            fontFamily: "Poppins, Roboto, sans-serif",
          }}
        >
          {params.row.role}
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.4,
      renderCell: (params) => {
        const name = params.row.name;
        return name ? name : "-";
      },
    },
    { field: "email", headerName: "Email", flex: 0.6 },
    { field: "phoneNumber", headerName: "Phone No.", flex: 0.4 },
    { field: "_id", headerName: "Id", flex: 0.6 },
    {
      field: "cart",
      headerName: "Cart Items",
      flex: 0.3,
      renderCell: (params) => {
        return params.row.cart.length;
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Box sx={{ minWidth: isMobile ? "810px" : "100%" }}>
        <DataGrid
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
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

export default UsersTable;
