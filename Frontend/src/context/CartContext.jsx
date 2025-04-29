import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";

export const CartContext = createContext({
  cart: [],
  addToCart: (plant) => {},
  updateQuantity: (id, quantity) => {},
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

    // Check if the plant is already in the cart
    const existingPlantIndex = cart.findIndex((item) => item._id === plant._id);
    if (existingPlantIndex !== -1) {
      // If the plant already exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingPlantIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { ...plant, quantity: 1 }]);
    }

    showNotification(`${plant.name} added to cart!`, "success");
  }

  // Update Quantity
  function updateQuantity(id, quantity) {
    if (quantity <= 0) return;

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    showNotification(`Quantity updated to ${quantity}.`, "success");
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
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
