import { createContext, useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";
import { NotificationContext } from "../NotificationContext";

export const AdminOrdersContext = createContext({
  orders: [],
  fetchAllOrders: () => {},
});

export function AdminOrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const { adminToken, isAdminAuthenticated } = useContext(AdminAuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function fetchAllOrders() {
    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      //   console.log("Fetched Admin Orders Data : ", data);

      if (!response.ok) {
        throw new Error("Failed to fetch admin orders data.");
      }

      setOrders(data?.orders || []);
    } catch (err) {
      console.error("Error fetching orders data:", err);
      showNotification("Failed to load orders data.", "error");
    }
  }

  // Fetch Orders on Authenticated Admin
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllOrders();
    }
  }, [isAdminAuthenticated]);

  return (
    <AdminOrdersContext.Provider
      value={{
        orders,
        fetchAllOrders,
      }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
}
