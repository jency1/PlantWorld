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
});

export function OrderProvider({ children }) {
  const navigate = useNavigate();
  const { initiatePayment } = useRazorpayPayment();
  const { showNotification } = useContext(NotificationContext);
  const { token, user } = useContext(AuthContext);
  const { clearCart, cart } = useContext(CartContext);

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

  // Create Order
  const createOrder = async ({ paymentId }) => {
    if (!shippingInfo || !shippingInfo.firstName || !shippingInfo.city) {
      showNotification("Please fill all required shipping fields.", "warn");
      return;
    }

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

      clearCart();
      showNotification("Order placed successfully!", "success");
      navigate("/order-success");
    } catch (err) {
      console.error("Order creation failed:", err);
      showNotification("Something went wrong. Try again later.", "error");
    }
  };

  // Razorpay Checkout Handler
  const checkoutHandler = async () => {
    console.log("Cart items:", cart);
    console.log(
      "Calculated totalAmount:",
      cart.reduce(
        (acc, item) => acc + Number(item.quantity) * Number(item.price),
        0
      )
    );

    const totalAmount = cart.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );

    if (totalAmount <= 0 || isNaN(totalAmount)) {
      showNotification("Invalid cart amount. Please check your cart.", "warn");
      return;
    }

    console.log("Cart items:", cart);
    console.log("Total amount:", totalAmount);

    const amountInPaise = Math.round(totalAmount * 100); // Razorpay expects paise

    await initiatePayment({
      amount: amountInPaise,
      key: RAZORPAY_KEY,
      user,
      onSuccess: (paymentId) => createOrder({ paymentId }),
    });
  };

  // useEffect(() => {
  //   console.log("Live cart inside OrderProvider:", cart);
  // }, [cart]);

  // Memoized context value
  const value = useMemo(
    () => ({
      createOrder,
      checkoutHandler,
      setShippingInfo,
      shippingInfo,
    }),
    [shippingInfo, cart]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

// import { createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { NotificationContext } from "./NotificationContext";
// import { AuthContext } from "./AuthContext";
// import { CartContext } from "./CartContext";
// import { useRazorpayPayment } from "../razorpay/initiatePayment";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

// // Context Structure
// export const OrderContext = createContext({
//   createOrder: () => {},
//   checkoutHandler: () => {},
// });

// export function OrderProvider({ children }) {
//   const navigate = useNavigate();
//   const { initiatePayment } = useRazorpayPayment();
//   const { showNotification } = useContext(NotificationContext);
//   const { token, user } = useContext(AuthContext);
//   const { clearCart, cart } = useContext(CartContext);

//   // Create Order
//   const createOrder = async ({ paymentId }) => {
//     const dummyShippingInfo = {
//       firstName: "Shreya",
//       lastName: "Painter",
//       mobile: "9876543210",
//       email: "shreya@example.com",
//       addressLine1: "123 Green Street",
//       addressLine2: "Apt 4B",
//       area: "Botanical Garden",
//       city: "Pune",
//       state: "Maharashtra",
//       pincode: "411001",
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ paymentId, ...dummyShippingInfo }),
//       });

//       if (!res.ok) {
//         showNotification("Order creation failed. Please try again.", "error");
//         throw new Error("Order creation failed");
//       }

//       clearCart();
//       showNotification("Order placed successfully!", "success");
//       navigate("/order-success");
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       showNotification("Something went wrong. Try again later.", "error");
//     }
//   };

//   // Checkout Handler
//   const checkoutHandler = async () => {
//     const totalAmount = cart.reduce(
//       (acc, item) => acc + item.quantity * item.price,
//       0
//     );

//     const amountInPaise = totalAmount * 100;

//     await initiatePayment({
//       amount: amountInPaise,
//       key: RAZORPAY_KEY,
//       user,
//       onSuccess: (paymentId) => createOrder({ paymentId }),
//     });
//   };

//   return (
//     <OrderContext.Provider value={{ createOrder, checkoutHandler }}>
//       {children}
//     </OrderContext.Provider>
//   );
// }
