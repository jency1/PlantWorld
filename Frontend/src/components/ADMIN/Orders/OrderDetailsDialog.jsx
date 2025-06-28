import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";

const OrderDetailsDialog = ({ open, onClose, order }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!order) return null;

  const latestStatus =
    order.status?.[order.status.length - 1]?.stage || "Order Received";

  const statusChangedOn = order?.status.length
    ? format(
        new Date(order.status?.[order.status.length - 1]?.changedAt),
        "dd-MM-yyyy"
      )
    : "";

  const keyText = {
    fontWeight: "500",
    color: "#444",
    display: "inline-block",
    minWidth: isMobile ? "130px" : "150px",
    fontSize: isMobile ? "13px" : "14px",
  };

  const valueText = {
    fontSize: isMobile ? "13px" : "14px",
  };

  const tableHeaderStyle = {
    fontWeight: 600,
    padding: "8px",
    textAlign: "left",
    color: "#2e7d32",
    borderBottom: "2px solid #c8e6c9",
    fontSize: isMobile ? "13px" : "14px",
  };

  const tableCellStyle = {
    padding: "8px",
    textAlign: "left",
    fontSize: isMobile ? "13px" : "14px",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? "sm" : "md"}
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          maxHeight: isMobile ? "70vh" : "85vh",
          overflowY: "auto",
          m: isMobile ? "1rem" : "0px",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#f1f8f5",
          color: "#2e7d32",
          fontWeight: 600,
          fontSize: isMobile ? "17px" : "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "10px 16px" : "16px 24px",
        }}
      >
        Order Details - {order?._id}
        <IconButton onClick={onClose} size="small" sx={{ color: "#2e7d32" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          fontSize: isMobile ? "13px" : "14px",
          padding: isMobile ? "12px" : "24px",
        }}
      >
        {/* Customer Info */}
        <Box mb={2}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#388e3c", fontWeight: 600, fontSize: "15px" }}
          >
            Customer Info
          </Typography>
          <Typography>
            <span style={keyText}>Name:</span>
            <span style={valueText}>
              {order?.firstName} {order?.lastName}
            </span>
          </Typography>
          <Typography>
            <span style={keyText}>Mobile:</span>
            <span style={valueText}>{order?.mobile}</span>
          </Typography>
          <Typography>
            <span style={keyText}>Email:</span>
            <span style={valueText}>{order?.email}</span>
          </Typography>
          <Typography>
            <span style={keyText}>Customer Id:</span>
            <span style={valueText}>{order?.user?._id}</span>
          </Typography>
        </Box>

        <Divider />

        {/* Address */}
        <Box mt={2} mb={2}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#388e3c", fontWeight: 600, fontSize: "15px" }}
          >
            Delivery Address
          </Typography>
          <Typography>
            <span style={valueText}>
              {order?.addressLine1}, {order?.addressLine2}, {order?.area},{" "}
              {order?.city}, {order?.state} - {order?.pincode}
            </span>
          </Typography>
        </Box>

        <Divider />

        {/* Order Summary */}
        <Box mt={2} mb={2}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#388e3c", fontWeight: 600, fontSize: "15px" }}
          >
            Order Summary
          </Typography>
          <Typography>
            <span style={keyText}>Order Total:</span>
            <span style={valueText}>₹{order?.orderTotal}</span>
          </Typography>
          <Typography>
            <span style={keyText}>Status:</span>
            <span style={valueText}>{latestStatus}</span>
          </Typography>
          <Typography>
            <span style={keyText}>Status Changed On:</span>
            <span style={valueText}>{statusChangedOn}</span>
          </Typography>
          <Typography>
            <span style={keyText}>Payment Id:</span>
            <span style={valueText}>{order?.paymentId}</span>
          </Typography>
          <Typography>
            <span style={keyText}>Created At:</span>
            <span style={valueText}>
              {format(new Date(order?.createdAt), "dd-MM-yyyy")}
            </span>
          </Typography>
          <Typography>
            <span style={keyText}>Expected Delivery:</span>
            <span style={valueText}>
              {format(new Date(order?.expectedDelivery), "dd-MM-yyyy")}
            </span>
          </Typography>
        </Box>

        <Divider />

        {/* Items in Order */}
        <Box mt={2}>
          <Typography
            variant="subtitle1"
            sx={{ color: "#388e3c", fontWeight: 600, mb: 1, fontSize: "15px" }}
          >
            Items in Order
          </Typography>

          <Box sx={{ overflowX: "auto" }}>
            <Box
              component="table"
              sx={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                mb: 4,
                minWidth: "500px",
              }}
            >
              <Box component="thead" sx={{ backgroundColor: "#e8f5e9" }}>
                <Box component="tr">
                  <Box component="th" sx={tableHeaderStyle}>
                    #
                  </Box>
                  <Box component="th" sx={tableHeaderStyle}>
                    Name
                  </Box>
                  <Box component="th" sx={tableHeaderStyle}>
                    Quantity
                  </Box>
                  <Box component="th" sx={tableHeaderStyle}>
                    Price
                  </Box>
                  <Box component="th" sx={tableHeaderStyle}>
                    Total
                  </Box>
                </Box>
              </Box>

              <Box component="tbody">
                {order.items?.map((item, idx) => (
                  <Box
                    component="tr"
                    key={item?._id || idx}
                    sx={{
                      borderBottom: "1px solid #ddd",
                      "&:last-child td": { borderBottom: 0 },
                    }}
                  >
                    <Box component="td" sx={tableCellStyle}>
                      {idx + 1}
                    </Box>
                    <Box component="td" sx={tableCellStyle}>
                      {item?.plantId?.name}
                    </Box>
                    <Box component="td" sx={tableCellStyle}>
                      {item?.quantity}
                    </Box>
                    <Box component="td" sx={tableCellStyle}>
                      ₹{item?.price}
                    </Box>
                    <Box component="td" sx={tableCellStyle}>
                      ₹{item?.total}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
