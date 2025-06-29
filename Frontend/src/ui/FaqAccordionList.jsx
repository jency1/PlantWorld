import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqAccordionList = ({ faqs }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      {[...faqs].reverse().map((faq) => (
        <Accordion
          key={faq._id}
          sx={{
            my: 2,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                fontSize: isMobile ? "0.85rem" : "0.95rem",
                color: "text.secondary",
              }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqAccordionList;
