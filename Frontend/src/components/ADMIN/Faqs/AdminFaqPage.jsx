import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { NotificationContext } from "../../../context/NotificationContext";
import { FaqContext } from "../../../context/FaqContext";

import FaqDialog from "./FaqDialog";
import FaqAccordionList from "../../../ui/FaqAccordionList";
import LoadingSpinner from "../../../ui/LoadingSpinner";

const AdminFaqsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { faqs, fetchAllFaqs, addFaq } = useContext(FaqContext);
  const { showNotification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        await fetchAllFaqs();
      } catch (err) {
        showNotification("Failed to fetch FAQs", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setFormData({ question: "", answer: "" });
    setOpenDialog(false);
  };

  const handleSaveFaq = async (data) => {
    if (!data.question.trim() || !data.answer.trim()) {
      showNotification("Both question and answer are required", "warning");
      return;
    }

    try {
      await addFaq(data);
      handleDialogClose();
    } catch (err) {
      showNotification("Failed to add FAQ", "error");
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ m: isMobile ? "0px" : "1rem", mt: "1rem" }}>
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
            {/* Add FAQ Button */}
            <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
              <Button
                variant="contained"
                onClick={handleDialogOpen}
                sx={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#43a047" },
                }}
              >
                Add New FAQ
              </Button>
            </Box>

            {/* FAQ List */}
            {faqs?.length === 0 ? (
              <Typography color="error">No FAQs found.</Typography>
            ) : (
              <FaqAccordionList faqs={faqs} />
            )}

            {/* Add FAQ Dialog */}
            <FaqDialog
              open={openDialog}
              onClose={handleDialogClose}
              onSave={handleSaveFaq}
              formData={formData}
              setFormData={setFormData}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default AdminFaqsPage;
