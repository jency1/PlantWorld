import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { AuthContext } from "../context/CLIENT/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useRazorpayPayment = () => {
  const { token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  // Initiate Payment
  const initiatePayment = async ({ amount, key, user, onSuccess }) => {
    try {
      // console.log("Amount passed to Razorpay:", amount);
      if (!amount || typeof amount !== "number") {
        throw new Error("Invalid amount passed to Razorpay");
      }

      // STEP 1: Create order on backend
      const res = await fetch(`${BASE_URL}/api/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const result = await res.json();
      // console.log("In initiatePayment");
      // console.log("Result: ", result);

      if (!res.ok || !result.order) {
        showNotification(
          "Failed to initiate payment. Please try again.",
          "error"
        );
        return;
      }

      const { order } = result;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "PlantWorld",
        description: "Plant Purchase",
        image: "/logo/favicon.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            // STEP 2: Verify payment on backend
            const verifyRes = await fetch(
              `${BASE_URL}/api/payment/paymentVerification`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.status === "success") {
              onSuccess(response.razorpay_payment_id);
            } else {
              showNotification("Payment verification failed.", "error");
              console.warn("Verification failed:", verifyData);
            }
          } catch (error) {
            console.error("Verification error:", error);
            showNotification("Verification request failed.", "error");
          }
        },
        prefill: {
          email: user?.email || "guest@example.com",
          contact: user?.phoneNumber || "0000000000",
        },
        notes: {
          address: "PlantWorld HQ",
        },
        theme: {
          color: "#15803D",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment init error:", err);
      showNotification("Payment failed to start.", "error");
    }
  };

  return { initiatePayment };
};
