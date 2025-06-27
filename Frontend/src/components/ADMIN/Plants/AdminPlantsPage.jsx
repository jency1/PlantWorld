import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PlantContext } from "../../../context/PlantsContext";
import { format } from "date-fns";

const AdminPlantsPage = () => {
  const { plants, fetchAllPlants, addPlant, updatePlantById } =
    useContext(PlantContext);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    plantName: "",
    quantity: 0,
    price: 0,
    createdAt: new Date(),
    plantCare: "",
    shortDescription: "",
    description: "",
    category: "",
    tag: "",
    availability: "In Stock",
    ratingsAverage: 0,
    ratingsQuantity: 0,
    plantId: "",
  });

  useEffect(() => {
    console.log("Fetching all plants...");
    fetchAllPlants();
  }, []);

  const handleOpenDialog = (plant) => {
    setSelectedPlant(plant);
    setFormData(
      plant
        ? { ...plant }
        : {
            image: "",
            plantName: "",
            quantity: 0,
            price: 0,
            createdAt: new Date(),
            plantCare: "",
            shortDescription: "",
            description: "",
            category: "",
            tag: "",
            availability: "In Stock",
            ratingsAverage: 0,
            ratingsQuantity: 0,
            plantId: "",
          }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlant(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (selectedPlant) {
      await updatePlantById(selectedPlant._id, formData);
    } else {
      await addPlant(formData);
    }
    fetchAllPlants();
    handleCloseDialog();
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="plant"
          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    { field: "plantName", headerName: "Plant Name", flex: 1 },
    { field: "quantity", headerName: "Qty", width: 80 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      valueFormatter: (params) =>
        params?.value ? format(new Date(params.value), "dd MMM yyyy") : "-",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenDialog(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Manage Plants</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog(null)}>
          Add New Plant
        </Button>
      </Box>

      <Box
        sx={{
          height: "75vh",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#4ead54",
            color: "#fff",
            fontSize: "1rem",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f5fef5",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#4ead54",
            color: "#fff",
          },
        }}
      >
        <DataGrid
          rows={plants}
          getRowId={(row) => row._id}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPlant ? "Edit Plant Details" : "Add New Plant"}
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              mt: 1,
            }}
          >
            {Object.entries(formData).map(
              ([key, value]) =>
                key !== "_id" && (
                  <TextField
                    key={key}
                    name={key}
                    label={key}
                    value={value}
                    onChange={handleInputChange}
                    fullWidth
                    multiline={[
                      "description",
                      "plantCare",
                      "shortDescription",
                    ].includes(key)}
                    rows={
                      ["description", "plantCare", "shortDescription"].includes(
                        key
                      )
                        ? 3
                        : 1
                    }
                  />
                )
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {selectedPlant ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPlantsPage;
