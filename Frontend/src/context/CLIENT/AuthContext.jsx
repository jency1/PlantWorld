import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { NotificationContext } from "../NotificationContext";

// Context structure
export const AuthContext = createContext({
  token: null,
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  login: (token, userData) => {},
  logout: () => {},
});

// Provider
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  // If there's a token, and we don't already have user data,
  // try to fetch user data directly from the login response

  useEffect(() => {
    if (token && !user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token, user]);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data from localStorage
    showNotification("Logged out successfully!", "success");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
