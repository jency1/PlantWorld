// src/lib/razorpay/initiatePayment.js
import axios from "axios";

export const initiatePayment = async ({ amount, key, user, onSuccess }) => {
  try {
    if (!amount || typeof amount !== "number") {
      throw new Error("Invalid amount passed to Razorpay");
    }

    const {
      data: { order },
    } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/payment/checkout`,
      { amount }
    );

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "PlantWorld",
      description: "Plant purchase",
      order_id: order.id,
      handler: async function (response) {
        try {
          // STEP 1: Call backend to verify signature
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/payment/paymentVerification`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyRes.data.status === "success") {
            // ✅ STEP 2: Only now call onSuccess
            onSuccess(response.razorpay_payment_id);
          } else {
            alert("Payment verification failed. No order was created.");
            console.warn("Verification failed response:", verifyRes.data);
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Payment verification request failed.");
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
        color: "#22c55e",
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
    console.error("Payment failed:", err);
    alert("Payment initialization failed.");
  }
};
