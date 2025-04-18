import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";

export const CartContext = createContext({
  cart: [],
  addToCart: (plant) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  // Add to Cart
  function addToCart(plant) {
    if (!isAuthenticated) {
      showNotification("Please login to add to cart.", "error");
      return;
    }

    setCart((prev) => [...prev, plant]);
    showNotification("Plant added to cart!", "success");
  }

  // Remove from Cart
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item._id !== id));
    showNotification("Plant removed from cart.", "info");
  }

  // Clear Cart
  function clearCart() {
    setCart([]);
    showNotification("Cart cleared.", "error");
  }

  // Provide all values via context
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
