import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";

const PlantDialog = ({
  open,
  onClose,
  onSave,
  selectedPlant,
  formData,
  setFormData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageCover: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Handle Plant Care Tips Change
  const handleCareTipChange = (index, value) => {
    const updatedTips = [...(formData.plantCareTips || [])];
    updatedTips[index] = value;
    setFormData((prev) => ({ ...prev, plantCareTips: updatedTips }));
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!selectedPlant && !(formData.imageCover instanceof File)) {
      newErrors.imageCover = "Please upload an image";
    }

    if (!formData.name?.trim()) {
      newErrors.name = "Plant name is required";
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = "Enter a valid price";
    }

    if (!formData.quantity || formData.quantity < 0) {
      newErrors.quantity = "Enter a valid quantity";
    }

    if (!formData.category) {
      newErrors.category = "Select category";
    }

    if (!formData.tag) {
      newErrors.tag = "Select tag";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.shortDescription?.trim()) {
      newErrors.shortDescription = "Short Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = () => {
    if (validateForm()) {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        plantCareTips: (formData.plantCareTips || []).filter(
          (tip) => tip.trim() !== ""
        ),
      };

      delete submitData.imagePreview;

      if (!submitData.imageCover || !(submitData.imageCover instanceof File)) {
        delete submitData.imageCover;
      }

      onSave(submitData);
    }
  };

  const labelStyles = {
    color: "#4caf50",
    fontWeight: 500,
    fontFamily: "Poppins, Roboto, sans-serif",
  };

  const categories = [
    "Flowering Plants",
    "Foliage Plants",
    "Ferns",
    "Herbs",
    "Fruit Plants",
    "Succulent Plants",
    "Vegetables & Herbs",
    "Climbing Plants",
    "Creepers",
    "Succulents & Cacti",
    "Climbers",
  ];

  const tags = ["Indoor", "Outdoor"];
  const availabilityOptions = ["In Stock", "Out of Stock", "Up Coming"];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? "xs" : "md"}
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: isMobile ? "70vh" : "85vh",
          overflowY: "auto",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#4caf50",
          fontWeight: "bold",
          fontSize: isMobile ? 16 : 20,
        }}
      >
        {selectedPlant ? "Edit Plant Details" : "Add New Plant"}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ px: isMobile ? 1.5 : 3, overflowX: "auto" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ fontSize: isMobile ? 13 : 14 }}
        >
          {/* Image Upload */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={labelStyles}>
              Upload Plant Image
            </Typography>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "10px" }}
            />

            {(formData.imagePreview || formData.imageCover) && (
              <img
                src={
                  formData.imagePreview ||
                  (typeof formData.imageCover === "string"
                    ? formData.imageCover
                    : "")
                }
                alt="Preview"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  marginTop: 8,
                }}
              />
            )}
          </Box>

          {/* Plant ID (Read-Only, Only in Edit) */}
          {selectedPlant && (
            <TextField
              label="Plant ID"
              value={formData.plantId}
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          )}

          {selectedPlant && (
            <TextField
              label="Created At"
              value={format(new Date(formData.createdAt), "dd-MM-yyyy")}
              fullWidth
            />
          )}

          {/* CORE FIELDS */}

          {/* Plant Name */}
          <TextField
            name="name"
            label="Plant Name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* Plant Price */}
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.price}
            helperText={errors.price}
          />

          {/* Plant Quantity */}
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
          />

          {/* Short Description */}
          <TextField
            name="shortDescription"
            label="Short Description"
            value={formData.shortDescription}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.shortDescription}
            helperText={errors.shortDescription}
          />

          {/* Description */}
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description}
          />

          {/* Category */}
          <TextField
            name="category"
            label="Category"
            select
            value={formData.category}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.category}
            helperText={errors.category}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* Tag */}
          <TextField
            name="tag"
            label="Tag"
            select
            value={formData.tag}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.tag}
            helperText={errors.tag}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>

          {/* Availability */}
          <TextField
            name="availability"
            label="Availability"
            select
            value={formData.availability}
            onChange={handleInputChange}
            fullWidth
          >
            {availabilityOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          {/* Plant Care Tips */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={labelStyles}>
              Plant Care Tips
            </Typography>
            {[0, 1, 2, 3].map((i) => (
              <TextField
                key={i}
                label={`Tip ${i + 1}`}
                value={formData.plantCareTips?.[i] || ""}
                onChange={(e) => handleCareTipChange(i, e.target.value)}
                fullWidth
                sx={{ my: 1 }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ mx: 2, my: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "red",
            fontSize: isMobile ? "13px" : "14px",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: isMobile ? "13px" : "14px",
            "&:hover": {
              backgroundColor: "#43a047",
              transform: "scale(1.05)",
            },
          }}
        >
          {selectedPlant ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlantDialog;
