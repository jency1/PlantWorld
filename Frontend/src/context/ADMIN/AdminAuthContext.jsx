import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../NotificationContext";

export const AdminAuthContext = createContext({
  adminToken: null,
  admin: null,
  loginAdmin: (token, adminData) => {},
  logoutAdmin: () => {},
  isAdminAuthenticated: false,
});

export function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  // Auto-load admin from localStorage if token exists
  useEffect(() => {
    if (adminToken && !admin) {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
    }
  }, [adminToken, admin]);

  const loginAdmin = (token, adminData) => {
    if (adminData?.role !== "admin") {
      showNotification("Access denied. Not an admin account.", "error");
      return;
    }

    setAdminToken(token);
    setAdmin(adminData);
    localStorage.setItem("adminToken", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    navigate("/admin/plants");
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdmin(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    showNotification("Admin logged out successfully!", "success");
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminToken,
        admin,
        loginAdmin,
        logoutAdmin,
        isAdminAuthenticated: !!adminToken && admin?.role === "admin",
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
