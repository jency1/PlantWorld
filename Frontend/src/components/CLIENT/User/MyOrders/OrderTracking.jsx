import React from "react";
import { Stepper, Step, StepLabel, useMediaQuery, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";

export default function OrderTracking({ status }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const statusStages = [
    "Order Received",
    "Order Shipped",
    "Out for Delivery",
    "Order Delivered",
  ];

  // Latest status from backend
  const latestStage = status?.length > 0 ? status[status.length - 1].stage : "";
  const activeStep = statusStages.indexOf(latestStage);
  const isCancelled = latestStage === "Order Cancelled";

  return (
    <div className="mb-6">
      <h4 className="text-sm md:text-base font-semibold mb-3 text-gray-800">
        Tracking Status:
      </h4>

      {isCancelled ? (
        <div className="flex justify-center mb-4">
          <Chip
            icon={<CancelIcon />}
            label="This order has been cancelled"
            color="error"
            variant="outlined"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.9rem" }, px: 1.5, py: 1.5 }}
          />
        </div>
      ) : (
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
          alternativeLabel={!isMobile}
          sx={{
            "& .MuiStepLabel-label": {
              fontSize: {
                xs: "0.7rem",
                sm: "0.9rem",
              },
            },
            "& .MuiStepIcon-root": {
              fontSize: {
                xs: "1rem",
                sm: "1.5rem",
              },
            },
            "& .MuiStepConnector-line": {
              minHeight: isMobile ? "16px" : undefined,
            },
          }}
        >
          {statusStages.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </div>
  );
}
