import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { PlantContext } from "../../../context/PlantsContext";

import PlantTable from "./PlantTable";
import PlantDialog from "./PlantDialog";
import ConfirmationDialog from "../../../ui/ConfirmationDialog";

const AdminPlantsPage = () => {
  const { plants, fetchAllPlants, addPlant, updatePlantById, deletePlantById } =
    useContext(PlantContext);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const defaultFormData = {
    plantName: "",
    imageCover: "",
    imagePreview: "",
    price: 0,
    quantity: 0,
    createdAt: new Date(),
    plantCareTips: ["", "", "", ""],
    shortDescription: "",
    description: "",
    category: "",
    tag: "",
    availability: "In Stock",
    ratingsAverage: 1,
    ratingsQuantity: 0,
    plantId: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    fetchAllPlants();
  }, []);

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (plantToDelete?._id) {
      await deletePlantById(plantToDelete._id);
      fetchAllPlants();
    }
    setConfirmOpen(false);
    setPlantToDelete(null);
  };

  // Open dialog for edit/add
  const handleOpenDialog = (plant) => {
    setSelectedPlant(plant);
    setFormData(
      plant
        ? {
            ...plant,
            imagePreview: plant.imageCover || "",
            plantId: plant._id || "",
            plantCareTips: Array.isArray(plant.plantCareTips)
              ? plant.plantCareTips
              : ["", "", "", ""],
          }
        : defaultFormData
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlant(null);
  };

  // Save (Add / Update)
  const handleSave = async () => {
    const form = new FormData();
    for (let key in formData) {
      if (key === "imageCover" && typeof formData[key] !== "string") {
        form.append(key, formData[key]);
      } else if (key === "plantCareTips") {
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    }

    if (selectedPlant) {
      await updatePlantById(selectedPlant._id, form);
    } else {
      await addPlant(form);
    }

    fetchAllPlants();
    handleCloseDialog();
  };

  return (
    <Container maxWidth="xl">
      <Box m="20px">
        <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog(null)}
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#43a047",
              },
            }}
          >
            Add New Plant
          </Button>
        </Box>

        {plants?.length === 0 && (
          <Typography variant="body1" color="error" mb={2}>
            No plant data found.
          </Typography>
        )}

        <PlantTable
          plants={plants}
          onEdit={handleOpenDialog}
          onDelete={(plant) => {
            setPlantToDelete(plant);
            setConfirmOpen(true);
          }}
        />

        <PlantDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSave={handleSave}
          selectedPlant={selectedPlant}
          formData={formData}
          setFormData={setFormData}
        />

        <ConfirmationDialog
          open={confirmOpen}
          title="Delete Plant"
          message={`Are you sure you want to delete "${
            plantToDelete?.name || "this plant"
          }"?`}
          onCancel={() => {
            setConfirmOpen(false);
            setPlantToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      </Box>
    </Container>
  );
};

export default AdminPlantsPage;
