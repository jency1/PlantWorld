// components/common/ConfirmationDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const ConfirmationDialog = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{ fontWeight: "bold", color: "#4caf50" }}>
        {title || "Confirm Action"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>
          {message || "Are you sure you want to proceed?"}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          m: 1,
        }}
      >
        <Button onClick={onCancel} sx={{ color: "red" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            "&:hover": { backgroundColor: "#43a047" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
