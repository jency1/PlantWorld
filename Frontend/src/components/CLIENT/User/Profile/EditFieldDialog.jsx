import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function EditFieldDialog({
  open,
  onClose,
  label,
  field,
  value,
  onSave,
}) {
  const [newValue, setNewValue] = useState(value);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSave = async () => {
    setLoading(true);
    await onSave(field, newValue);
    setLoading(false);
    onClose();
  };

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
            px: isMobile ? 1 : 3,
            py: 2,
            mx: 1,
            backgroundColor: "#f6fff8",
            width: isMobile ? "80%" : "100%",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ color: "green", fontSize: isMobile ? "1rem" : "1.25rem" }}
        >
          Edit {label}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <TextField
          label={`New ${label}`}
          onChange={(e) => setNewValue(e.target.value)}
          fullWidth
          autoFocus
          size="small"
          margin="dense"
          sx={{
            p: 1,
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{ display: "flex", justifyContent: "flex-end", gap: 1, px: 3 }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          size="small"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
          size="small"
          sx={{
            backgroundColor: "#2e7d32",
            "&:hover": { backgroundColor: "#27642a" },
          }}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
