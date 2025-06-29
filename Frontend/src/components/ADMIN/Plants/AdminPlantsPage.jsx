import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { PlantContext } from "../../../context/PlantsContext";
import { NotificationContext } from "../../../context/NotificationContext";

import PlantTable from "./PlantTable";
import PlantDialog from "./PlantDialog";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import ConfirmationDialog from "../../../ui/ConfirmationDialog";

const AdminPlantsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { showNotification } = useContext(NotificationContext);
  const { plants, fetchAllPlants, addPlant, updatePlantById, deletePlantById } =
    useContext(PlantContext);

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const defaultFormData = {
    name: "",
    imageCover: null,
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
    plantId: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  // Fetch All Plants
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        await fetchAllPlants();
      } catch (error) {
        showNotification("Failed to fetch plants data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (plantToDelete?._id) {
      await deletePlantById(plantToDelete?._id);
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
            plantId: plant?._id || "",
            plantCareTips: Array.isArray(plant.plantCareTips)
              ? plant?.plantCareTips
              : ["", "", "", ""],
          }
        : defaultFormData
    );
    setOpenDialog(true);
  };

  // Handle Dialog Close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlant(null);
    setFormData(defaultFormData);
  };

  // Save (Add / Update)
  const handleSave = async (formData) => {
    try {
      if (!selectedPlant && !(formData.imageCover instanceof File)) {
        showNotification(
          "Please upload an image before adding a new plant.",
          "info"
        );
        return;
      }

      const form = new FormData();

      // Handle image upload
      if (formData?.imageCover instanceof File) {
        form.append("imageCover", formData.imageCover);
      }

      // Handle plant care tips
      if (formData?.plantCareTips.length < 1) {
        showNotification(
          "There should be atleast 1 plant care tip.",
          "warning"
        );
        return;
      }
      if (formData?.plantCareTips) {
        form.append("plantCareTips", JSON.stringify(formData.plantCareTips));
      }

      // Handle all other fields
      const fieldsToAppend = [
        "name",
        "price",
        "quantity",
        "shortDescription",
        "description",
        "category",
        "tag",
        "availability",
      ];

      fieldsToAppend.forEach((field) => {
        if (formData[field] !== undefined && formData[field] !== null) {
          form.append(field, formData[field]);
        }
      });

      // Debug logs
      // for (let [key, value] of form.entries()) {
      //   console.log(`${key}:`, value);
      // }

      try {
        if (selectedPlant) {
          await updatePlantById(selectedPlant._id, form);
          showNotification("Plant updated successfully!", "success");
        } else {
          await addPlant(form);
          showNotification("Plant added successfully!", "success");
        }

        fetchAllPlants();
        handleCloseDialog();
      } catch (err) {
        console.error("Save failed:", err);
        showNotification(
          `Failed to ${selectedPlant ? "update" : "add"} plant: ${err.message}`,
          "error"
        );
      }
    } catch (err) {
      console.error("Form preparation failed:", err);
      showNotification("Failed to prepare form data", "error");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          m: isMobile ? "0px" : "1rem",
          mt: "1rem",
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
            {/* Add New Plant Button */}
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

            {plants?.length === 0 ? (
              <Box
                display="flex"
                justifyContent="left"
                alignItems="center"
                minHeight="100px"
              >
                <Typography variant="h6" color="error">
                  No plants data found.
                </Typography>
              </Box>
            ) : (
              <PlantTable
                plants={plants}
                onEdit={handleOpenDialog}
                onDelete={(plant) => {
                  setPlantToDelete(plant);
                  setConfirmOpen(true);
                }}
              />
            )}

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
          </>
        )}
      </Box>
    </Container>
  );
};

export default AdminPlantsPage;
