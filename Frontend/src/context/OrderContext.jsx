// src/context/OrderContext.jsx
import { createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "./NotificationContext";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { initiatePayment } from "../../lib/razorpay/initiatePayment";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const { token, user } = useContext(AuthContext);
  const { clearCart, cart } = useContext(CartContext);

  const createOrder = async ({ paymentId }) => {
    const dummyShippingInfo = {
      firstName: "Shreya",
      lastName: "Painter",
      mobile: "9876543210",
      email: "shreya@example.com",
      addressLine1: "123 Green Street",
      addressLine2: "Apt 4B",
      area: "Botanical Garden",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/orders`,
        {
          paymentId,
          ...dummyShippingInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      showNotification("Order placed successfully!", "success");
      navigate("/order-success");
    } catch (err) {
      console.error("Order creation failed:", err);
      showNotification("Order creation failed. Please try again.", "error");
    }
  };

  const checkoutHandler = async () => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const amountInPaise = totalAmount * 100;

    await initiatePayment({
      amount: amountInPaise,
      key: import.meta.env.VITE_RAZORPAY_KEY,
      user,
      onSuccess: (paymentId) => {
        createOrder({ paymentId });
      },
    });
  };

  return (
    <OrderContext.Provider value={{ createOrder, checkoutHandler }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
