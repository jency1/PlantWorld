import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useNotification } from "../../../../context/NotificationContext";
import { AuthContext } from "../../../../context/CLIENT/AuthContext";

export default function CancelOrder({
  orderId,
  open,
  onClose,
  onCancelSuccess,
}) {
  const [isCancelling, setIsCancelling] = useState(false);
  const { showNotification } = useNotification();
  const { token } = useContext(AuthContext);

  async function handleCancel() {
    if (!token) {
      return;
    }

    try {
      setIsCancelling(true);

      const BASE_URL = import.meta.env.VITE_BASE_URL;

      const res = await fetch(`${BASE_URL}/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      // console.log("Cancel Order Response: ", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel order.");
      }

      showNotification("Order cancelled successfully!", "success");
      onClose();

      if (onCancelSuccess) {
        onCancelSuccess();
      }
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setIsCancelling(false);
    }
  }

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
          Confirm Cancellation
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Are you sure you want to cancel this order? This action cannot be
          undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ display: "flex", gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          No, Go Back
        </Button>
        <Button
          onClick={handleCancel}
          color="error"
          variant="contained"
          disabled={isCancelling}
        >
          {isCancelling ? "Cancelling..." : "Yes, Cancel Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
