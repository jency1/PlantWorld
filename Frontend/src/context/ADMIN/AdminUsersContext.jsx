import { createContext, useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";
import { NotificationContext } from "../NotificationContext";

export const AdminUsersContext = createContext({
  users: [],
  fetchAllUsers: () => {},
});

export function AdminUsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const { adminToken, isAdminAuthenticated } = useContext(AdminAuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function fetchAllUsers() {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();
      // console.log("Fetched Users: ", data);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      setUsers(data?.data?.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      showNotification("Failed to load users data.", "error");
    }
  }

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAllUsers();
    }
  }, [isAdminAuthenticated]);

  return (
    <AdminUsersContext.Provider value={{ users, fetchAllUsers }}>
      {children}
    </AdminUsersContext.Provider>
  );
}
