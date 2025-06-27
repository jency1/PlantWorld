import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { NotificationContext } from "../NotificationContext";

// Context structure
export const AdminAuthContext = createContext({
  adminToken: null,
  admin: null,
  loginAdmin: (token, adminData) => {},
  logoutAdmin: () => {},
  isAdminAuthenticated: false,
});

// Provider
export function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (adminToken && !admin) {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
    }
  }, [adminToken, admin]);

  const loginAdmin = (token, adminData) => {
    setAdminToken(token);
    setAdmin(adminData);
    localStorage.setItem("adminToken", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    navigate("/admin/dashboard");
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
        isAdminAuthenticated: !!adminToken,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
