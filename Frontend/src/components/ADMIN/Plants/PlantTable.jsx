import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const PlantTable = ({ plants, onEdit, onDelete }) => {
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
      renderCell: (params) => {
        return (
          paginationModel.page * paginationModel.pageSize +
          params.api.getRowIndexRelativeToVisibleRows(params.id) +
          1
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "imageCover",
      headerName: "Image",
      flex: 0.2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" height="100%">
          <img
            src={params.value}
            alt="plant"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        </Box>
      ),
    },
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "quantity", headerName: "Quantity", flex: 0.2 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.2,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.3,
      renderCell: (params) => {
        const date = params.row?.createdAt;
        return date ? format(new Date(date), "dd-MM-yyyy") : "-";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Tooltip title="Edit">
            <IconButton
              onClick={() => onEdit(params.row)}
              sx={{ color: "green", mr: 1 }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => onDelete(params.row)}
              sx={{ color: "red" }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
          rows={plants}
          getRowId={(row) => row._id}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          showToolbar={true}
          sx={{
            fontSize: isMobile ? "12px" : "14px",
            "& .MuiDataGrid-row": {
              alignItems: "center !important",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#4caf50",
              fontWeight: "bold",
              fontFamily: "Poppins, Roboto, sans-serif",
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

export default PlantTable;
