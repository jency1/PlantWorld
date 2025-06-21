import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "./NotificationContext";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { useRazorpayPayment } from "../razorpay/initiatePayment";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

// Context Structure
export const OrderContext = createContext({
  createOrder: () => {},
  checkoutHandler: () => {},
  setShippingInfo: (data) => {},
  shippingInfo: null,
  loading: false,
});

export function OrderProvider({ children }) {
  const navigate = useNavigate();
  const { initiatePayment } = useRazorpayPayment();
  const { showNotification } = useContext(NotificationContext);
  const { token, user } = useContext(AuthContext);
  const { clearCart, cart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Autofill shipping info based on logged in user
  useEffect(() => {
    if (user) {
      setShippingInfo((prev) => ({
        ...prev,
        email: user.email || "",
        mobile: user.phoneNumber || "",
      }));
    }
  }, [user]);

  // Create Order
  const createOrder = async ({ paymentId }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentId, ...shippingInfo }),
      });

      if (!res.ok) {
        showNotification("Order creation failed. Please try again.", "error");
        throw new Error("Order creation failed");
      }

      const result = await res.json();
      // console.log("Result", result);

      const newOrder = result.order; // backend returns the new order

      // Clear cart in state and localStorage
      clearCart();
      localStorage.removeItem("cart");

      // Add new order to localStorage user object
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const updatedUser = {
          ...storedUser,
          orders: [...(storedUser.orders || []), newOrder], // Add new order
          cart: [],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      showNotification("Order placed successfully!", "success");
      navigate("/order-success");
    } catch (err) {
      console.error("Order creation failed:", err);
      showNotification("Something went wrong. Try again later.", "error");
    }
  };

  // Razorpay Checkout Handler
  const checkoutHandler = async () => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );

    if (totalAmount <= 0 || isNaN(totalAmount)) {
      showNotification(
        "Invalid cart amount. Please check your cart.",
        "warning"
      );
      return;
    }

    setLoading(true);
    try {
      const amountInPaise = Math.round(totalAmount * 100); // Razorpay expects paise

      await initiatePayment({
        amount: amountInPaise,
        key: RAZORPAY_KEY,
        user,
        onSuccess: (paymentId) => createOrder({ paymentId }),
      });
    } catch (err) {
      showNotification("Payment initiation failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      createOrder,
      checkoutHandler,
      setShippingInfo,
      shippingInfo,
      loading,
    }),
    [shippingInfo, cart, loading]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
