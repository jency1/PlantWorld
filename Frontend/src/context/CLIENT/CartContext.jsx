import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { NotificationContext } from "../NotificationContext";

export const CartContext = createContext({
  cart: [],
  addToCart: (plant) => {},
  updateCartQuantity: (id, quantity) => {},
  handleIncrease: (id, quantity) => {},
  handleDecrease: (id, quantity) => {},
  deleteCartItem: (id) => {},
  clearCart: () => {},
  getPlantQuantity: (plantId) => {},
  addToCartLoading: false,
  cartLoading: true,
});

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { user, token, isAuthenticated } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  // Sync user.cart into cart state after login
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  // Fetch cart items from the API
  const fetchCartItems = async () => {
    setCartLoading(true);
    const token = checkAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/api/users/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log("Fetched Cart Data : ", data);

      if (!response.ok) {
        showNotification("Failed to fetch cart items.", "error");
        return;
      }

      // Set the fetched cart items into the state
      setCart(data.cart || []);
    } catch (error) {
      showNotification("Error fetching cart items.", "error");
      console.error("Fetch cart error:", error);
    } finally {
      setCartLoading(false);
    }
  };

  // Helper to check for token and handle error
  const checkAuthToken = () => {
    if (!token) {
      showNotification("Please login to proceed.", "error");
      console.error("Token Authorization error");
      return false;
    }
    return token;
  };

  // ADD to Cart with API call and loading state
  const addToCart = async (plant, quantity) => {
    if (!isAuthenticated) {
      showNotification("Please login to add items to the cart.", "error");
      return;
    }

    // console.log("Plant data in ADD to cart: ", plant);

    if (!plant || !plant._id) {
      showNotification("Invalid plant details. Cannot add to cart.", "error");
      return;
    }

    // Check if the item is already in the cart
    const existingItem = cart.find(
      (item) => item?.plantId?._id === plant._id || item?.plantId === plant._id
    );

    if (existingItem) {
      showNotification(
        `${plant.name} is already in your cart. Updating the quantity!`,
        "info"
      );
      setTimeout(() => {
        updateCartQuantity(plant._id, quantity);
      }, 3000);
      return;
    }

    const token = checkAuthToken();
    if (!token) {
      return;
    }

    setAddToCartLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/users/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plantId: plant?._id,
          quantity,
          price: plant?.price,
        }),
      });

      const data = await response.json();
      // console.log("Add to cart data: ", data);

      if (!response.ok) {
        showNotification("Failed to add item to cart.", "error");
        setAddToCartLoading(false);
        return;
      }

      setCart((prev) => [
        ...prev,
        {
          plantId: plant._id,
          quantity,
          price: plant.price,
          name: plant.name,
        },
      ]);

      fetchCartItems();
      showNotification(`${plant.name} added to cart successfully!`, "success");
    } catch (error) {
      console.error("Add to cart error:", error);
      showNotification("An error occurred while adding to cart.", "error");
    } finally {
      setAddToCartLoading(false);
    }
  };

  // Handle quantity increase
  const handleIncrease = (plantId, currentQuantity) => {
    updateCartQuantity(plantId, currentQuantity + 1);
  };

  // Handle quantity decrease
  const handleDecrease = (plantId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity(plantId, currentQuantity - 1);
    } else {
      deleteCartItem(plantId);
    }
  };

  // Function to UPDATE cart item quantity
  const updateCartQuantity = async (plantId, quantity) => {
    if (quantity < 0) return;

    const token = checkAuthToken();
    if (!token) return;

    // console.log("Attempting to update quantity:", { plantId, quantity });

    try {
      const response = await fetch(`${BASE_URL}/api/users/updatecart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plantId,
          quantity,
        }),
      });

      const data = await response.json();
      // console.log("Update Cart API Response: ", data);

      if (!response.ok || response.message === "Item not found in cart") {
        showNotification("Failed to update cart", "error");
        console.error("API Error:", data.message || data);
        return;
      }

      // Update the local cart state with the new quantity
      setCart((prev) =>
        prev.map((item) =>
          item._id === plantId || item.plantId === plantId
            ? { ...item, quantity }
            : item
        )
      );

      showNotification("Cart updated successfully!", "success");
      fetchCartItems();
    } catch (error) {
      showNotification("Unable to update quantity.", "error");
      console.error("Update cart error:", error);
    }
  };

  // Function to DELETE cart item
  const deleteCartItem = async (plantId) => {
    const token = checkAuthToken();
    if (!token) return;

    // console.log("In delete cart item");
    // console.log("delete cart item - plantId : ", plantId);

    try {
      const response = await fetch(
        `${BASE_URL}/api/users/deleteitem/${plantId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Delete cart item response: ", response);

      if (!response.ok) {
        showNotification("Failed to remove item from cart", "error");
        return;
      }

      setCart((prev) => prev.filter((item) => item._id !== plantId));
      fetchCartItems();
      showNotification("Item removed from cart!", "success");
    } catch (error) {
      showNotification("Error removing item from cart!", "error");
      console.error("Delete cart error:", error);
    }
  };

  // Clear Cart

  const clearCart = async () => {
    const token = checkAuthToken();
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/users/clear-cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        showNotification("Failed to clear cart", "error");
        return;
      }

      setCart([]);

      // Clear cart in localStorage user object
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.cart = [];
        localStorage.setItem("user", JSON.stringify(user));
      }

      showNotification("Cart cleared successfully.", "success");
    } catch (error) {
      showNotification(
        "Error clearing the cart. Please try again later!",
        "error"
      );
      console.error("Clear cart error:", error);
    }
  };

  // Get the QUANTITY of a plant by its ID
  const getPlantQuantity = (plantId) => {
    const plant = cart.find((item) => item._id === plantId);
    return plant ? plant?.quantity : 0;
  };

  // useEffect(() => {
  //   console.log("Current Cart:", cart);
  // }, [cart]);

  const contextValue = {
    cart,
    addToCart,
    updateCartQuantity,
    handleIncrease,
    handleDecrease,
    deleteCartItem,
    clearCart,
    getPlantQuantity,
    addToCartLoading,
    cartLoading,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
