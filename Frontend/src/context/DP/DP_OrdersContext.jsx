import { createContext, useContext, useEffect, useState } from "react";
import { DP_AuthContext } from "./DP_AuthContext";
import { NotificationContext } from "../NotificationContext";

export const DP_OrdersContext = createContext({
  orders: [],
  fetchAllOrders: () => {},
});

export function DP_OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const { dpToken, isDPAuthenticated } = useContext(DP_AuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch Orders when DP is authenticated
  useEffect(() => {
    if (isDPAuthenticated) {
      fetchAllOrders();
    }
  }, [isDPAuthenticated]);

  // Get all orders
  async function fetchAllOrders() {
    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dpToken}`,
        },
      });

      const data = await response.json();
      // console.log("Fetched DP Orders Data : ", data);

      if (!response.ok) {
        throw new Error("Failed to fetch delivery partner orders.");
      }

      setOrders(data?.orders || []);
    } catch (err) {
      console.error("Error fetching delivery partner orders:", err);
      showNotification("Failed to load delivery partner orders.", "error");
    }
  }

  return (
    <DP_OrdersContext.Provider
      value={{
        orders,
        fetchAllOrders,
      }}
    >
      {children}
    </DP_OrdersContext.Provider>
  );
}
