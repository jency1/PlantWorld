import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ReturnOrder({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            px: 2,
            py: 1.5,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <WarningAmberIcon color="warning" />
        <Typography variant="h6" fontWeight={600}>
          Return Unavailable
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Return for this order is not available.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ display: "flex", gap: 1 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
