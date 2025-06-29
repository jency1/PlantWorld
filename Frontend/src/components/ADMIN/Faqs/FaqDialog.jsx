import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const FaqDialog = ({ open, onClose, onSave, formData, setFormData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth={isMobile ? "xs" : "sm"}
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: isMobile ? "59vh" : "85vh",
          overflowY: "auto",
          m: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "success.main" }}>
        Add New FAQ
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>

      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(formData)}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FaqDialog;
