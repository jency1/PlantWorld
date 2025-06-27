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
} from "@mui/material";

const PlantDialog = ({
  open,
  onClose,
  onSave,
  selectedPlant,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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

  const handleCareTipChange = (index, value) => {
    const updatedTips = [...(formData.plantCareTips || [])];
    updatedTips[index] = value;
    setFormData((prev) => ({ ...prev, plantCareTips: updatedTips }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.plantName?.trim())
      newErrors.plantName = "Plant name is required";
    if (!formData.price || formData.price < 0)
      newErrors.price = "Enter a valid price";
    if (!formData.quantity || formData.quantity < 0)
      newErrors.quantity = "Enter a valid quantity";
    if (!formData.category) newErrors.category = "Select category";
    if (!formData.tag) newErrors.tag = "Select tag";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";
    if (
      isNaN(parseFloat(formData.ratingsAverage)) ||
      parseFloat(formData.ratingsAverage) < 1 ||
      parseFloat(formData.ratingsAverage) > 5
    ) {
      newErrors.ratingsAverage = "Rating must be between 1.0 and 5.0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave();
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#4caf50", fontWeight: "bold" }}>
        {selectedPlant ? "Edit Plant Details" : "Add New Plant"}
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
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

          {/* Core Fields */}
          <TextField
            name="plantName"
            label="Plant Name"
            value={formData.plantName}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.plantName}
            helperText={errors.plantName}
          />

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

          <TextField
            name="shortDescription"
            label="Short Description"
            value={formData.shortDescription}
            onChange={handleInputChange}
            fullWidth
          />

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

          <TextField
            name="ratingsAverage"
            label="Ratings (1.0 – 5.0)"
            type="number"
            value={formData.ratingsAverage}
            inputProps={{ step: 0.1, min: 1, max: 5 }}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.ratingsAverage}
            helperText={errors.ratingsAverage}
          />

          <TextField
            name="ratingsQuantity"
            label="Ratings Count"
            type="number"
            value={formData.ratingsQuantity}
            onChange={handleInputChange}
            fullWidth
          />

          {/* Care Tips */}
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
