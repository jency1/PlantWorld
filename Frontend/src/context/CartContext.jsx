import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";

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
});

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  // Sync user.cart into cart state after login
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  // Fetch cart items from the API
  const fetchCartItems = async () => {
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
      console.log("Fetched Cart Data : ", data);

      if (!response.ok) {
        showNotification("Failed to fetch cart items.", "error");
        return;
      }

      // Set the fetched cart items into the state
      setCart(data.cart || []);
    } catch (error) {
      showNotification("Error fetching cart items.", "error");
      console.error("Fetch cart error:", error);
    }
  };

  // Helper to check for token and handle error
  const checkAuthToken = () => {
    const token = localStorage.getItem("token");
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

    if (!plant || !plant._id) {
      showNotification("Invalid plant details. Cannot add to cart.", "error");
      return;
    }

    // Check if the item is already in the cart
    const existingItem = cart.find((item) => item._id === plant._id);

    if (existingItem) {
      showNotification(
        `${plant.name} is already in your cart. Quantity updated!`,
        "info"
      );
      updateCartQuantity(plant?._id, quantity);
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
      console.log("Add to cart data: ", data);

      if (!response.ok) {
        showNotification("Failed to add item to cart.", "error");
        setAddToCartLoading(false);
        return;
      }

      setCart((prev) => [
        ...prev,
        {
          ...plant,
          quantity,
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
      console.log("Update Cart API Response: ", data);

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
  function clearCart() {
    setCart([]);
    showNotification("Cart cleared.", "error");
  }

  // Get the QUANTITY of a plant by its ID
  const getPlantQuantity = (plantId) => {
    const plant = cart.find((item) => item._id === plantId);
    return plant ? plant?.quantity : 0;
  };

  useEffect(() => {
    console.log("Current Cart:", cart);
  }, [cart]);

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
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// ----------------------------------------------------------

// import { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { NotificationContext } from "./NotificationContext";

// export const CartContext = createContext({
//   cart: [],
//   addToCart: (plant) => {},
//   updateQuantity: (id, quantity) => {},
//   removeFromCart: (id) => {},
//   clearCart: () => {},
//   handleIncrease: (plantId, quantity) => {},
//   handleDecrease: (plantId, quantity) => {},
//   addToCartLoading: false,
//   getPlantQuantity: (plantId) => {},
// });

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [addToCartLoading, setAddToCartLoading] = useState(false);
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const { showNotification } = useContext(NotificationContext);

//   // Sync user.cart into cart state after login
//   useEffect(() => {
//     if (isAuthenticated && user?.cart) {
//       setCart(user.cart);
//     }
//   }, [isAuthenticated]);

//   // Fetch cart items from the API
//   const fetchCartItems = async () => {
//     const token = checkAuthToken();
//     if (!token) return;

//     try {
//       const response = await fetch(`${BASE_URL}/api/users/cart`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         showNotification("Failed to fetch cart items.", "error");
//         return;
//       }

//       // Set the fetched cart items into the state
//       setCart(data.cart || []);
//     } catch (error) {
//       showNotification("Error fetching cart items.", "error");
//       console.error("Fetch cart error:", error);
//     }
//   };

//   // Helper to check for token and handle error
//   const checkAuthToken = () => {
//     const token = localStorage.getItem("token");
//     // const lastCartData = localStorage.getItem("cartData");
//     if (!token) {
//       showNotification("Please login to proceed.", "error");
//       return false;
//     }
//     return token;
//   };

//   // ADD to Cart with API call and loading state
//   const addToCart = async (plant) => {
//     if (!isAuthenticated) {
//       showNotification("Please login to add items to the cart.", "error");
//       return;
//     }

//     if (!plant || !plant._id) {
//       showNotification("Failed to add to cart, Invalid plantId", "error");
//       return;
//     }

//     // Check if the item is already in the cart
//     const existingItem = cart.find((item) => item._id === plant._id);
//     if (existingItem) {
//       // If item exists, update its quantity (instead of adding a new one)
//       updateCartQuantity(plant._id, existingItem.quantity + 1);
//       return;
//     }

//     setAddToCartLoading(true);

//     const token = checkAuthToken();
//     if (!token) {
//       setAddToCartLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/api/users/addtocart`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           plantId: plant._id,
//           quantity: 1,
//           price: plant.price,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (
//           response.status === 400 &&
//           data.message === "Item is already in the cart."
//         ) {
//           showNotification(`${plant.name} is already in your cart!`, "info");
//         } else {
//           showNotification("Failed to add to cart!", "error");
//         }
//         setAddToCartLoading(false);
//         return;
//       }

//       // Only add the plant if it's not already in the cart
//       setCart((prev) => [
//         ...prev,
//         {
//           name: plant.name,
//           quantity: 1,
//           price: plant.price,
//           _id: plant._id,
//         },
//       ]);
//       showNotification(`${plant.name} added to cart successfully!`, "success");
//     } catch (error) {
//       showNotification("Error adding to cart!", "error");
//       console.error("Add to cart error:", error);
//     } finally {
//       setAddToCartLoading(false);
//     }
//   };

//   // Function to UPDATE cart item quantity
//   const updateCartQuantity = async (plantId, quantity) => {
//     if (quantity < 0) return;

//     const token = checkAuthToken();
//     if (!token) return;

//     // Check if the plant is in the cart before updating
//     const plantInCart = cart.find((item) => item._id === plantId);

//     if (!plantInCart) {
//       showNotification(
//         "Please add the plant to the cart first, before updating its quantity.",
//         "warning"
//       );
//       return;
//     }

//     try {
//       localStorage.setItem(
//         "cartData",
//         JSON.stringify({
//           plantId,
//           quantity,
//         })
//       );
//       const response = await fetch(`${BASE_URL}/api/users/updatecart`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           plantId,
//           quantity,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         showNotification("Failed to update cart", "error");
//         return;
//       }

//       // Update the cart state with the new quantity
//       setCart((prev) =>
//         prev.map((item) =>
//           item._id === plantId ? { ...item, quantity } : item
//         )
//       );

//       showNotification("Cart updated successfully!", "success");
//     } catch (error) {
//       showNotification("Unable to update quantity.", "error");
//       console.error("Update cart error:", error);
//     }
//   };

//   // Function to DELETE cart item
//   const deleteCartItem = async (plantId) => {
//     const token = checkAuthToken();
//     if (!token) return;

//     try {
//       const response = await fetch(
//         `${BASE_URL}/api/users/deleteitem/${plantId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         showNotification("Failed to remove item from cart", "error");
//         return;
//       }

//       setCart((prev) => prev.filter((item) => item._id !== plantId));
//       showNotification("Item removed from cart!", "success");
//     } catch (error) {
//       showNotification("Error removing item from cart!", "error");
//       console.error("Delete cart error:", error);
//     }
//   };

//   // Update Quantity
//   function updateQuantity(id, quantity) {
//     updateCartQuantity(id, quantity);
//   }

//   // Remove item from Cart
//   function removeFromCart(id) {
//     deleteCartItem(id);
//   }

//   // Clear Cart
//   function clearCart() {
//     setCart([]);
//     showNotification("Cart cleared.", "error");
//   }

//   // Handle quantity increase
//   const handleIncrease = (plantId, currentQuantity) => {
//     updateCartQuantity(plantId, currentQuantity + 1);
//   };

//   // Handle quantity decrease
//   const handleDecrease = (plantId, currentQuantity) => {
//     if (currentQuantity > 1) {
//       updateCartQuantity(plantId, currentQuantity - 1);
//     } else {
//       deleteCartItem(plantId);
//     }
//   };

//   // Get the QUANTITY of a plant by its ID
//   const getPlantQuantity = (plantId) => {
//     const plant = cart.find((item) => item._id === plantId);
//     return plant ? plant?.quantity : 0;
//   };

//   useEffect(() => {
//     console.log("Current Cart:", cart);
//   }, [cart]);

//   const contextValue = {
//     cart,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     handleIncrease,
//     handleDecrease,
//     addToCartLoading,
//     getPlantQuantity,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
//   );
// }

// ------------------------------------------------------------------------

// import { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { NotificationContext } from "./NotificationContext";

// export const CartContext = createContext({
//   cart: [],
//   addToCart: (plant) => {},
//   updateQuantity: (id, quantity) => {},
//   removeFromCart: (id) => {},
//   clearCart: () => {},
// });

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const { showNotification } = useContext(NotificationContext);

//   // Sync user.cart into cart state after login
//   useEffect(() => {
//     if (isAuthenticated && user?.cart) {
//       setCart(user.cart);
//     }
//   }, [isAuthenticated, user]);

//   // Add to Cart
//   function addToCart(plant) {
//     if (!isAuthenticated) {
//       showNotification("Please login to add to cart.", "error");
//       return;
//     }

//     // Check if the plant is already in the cart
//     const existingPlantIndex = cart.findIndex((item) => item._id === plant._id);
//     if (existingPlantIndex !== -1) {
//       // If the plant already exists in the cart, update its quantity
//       const updatedCart = [...cart];
//       updatedCart[existingPlantIndex].quantity += 1;
//       setCart(updatedCart);
//     } else {
//       setCart((prev) => [...prev, { ...plant, quantity: 1 }]);
//     }

//     showNotification(`${plant.name} added to cart!`, "success");
//   }

//   // Update Quantity
//   function updateQuantity(id, quantity) {
//     if (quantity <= 0) return;

//     const updatedCart = cart.map((item) =>
//       item._id === id ? { ...item, quantity } : item
//     );
//     setCart(updatedCart);
//     showNotification(`Quantity updated to ${quantity}.`, "success");
//   }

//   // Remove from Cart
//   function removeFromCart(id) {
//     setCart((prev) => prev.filter((item) => item._id !== id));
//     showNotification("Plant removed from cart.", "info");
//   }

//   // Clear Cart
//   function clearCart() {
//     setCart([]);
//     showNotification("Cart cleared.", "error");
//   }

//   // Provide all values via context
//   const contextValue = {
//     cart,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
//   );
// }
