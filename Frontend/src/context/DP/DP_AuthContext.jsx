import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../NotificationContext";

export const DP_AuthContext = createContext({
  dpToken: null,
  dp: null,
  loginDP: (token, dpData) => {},
  logoutDP: () => {},
  isDPAuthenticated: false,
});

export function DP_AuthProvider({ children }) {
  const [dpToken, setDPToken] = useState(localStorage.getItem("dpToken"));
  const [dp, setDP] = useState(() => {
    const storedDP = localStorage.getItem("dp");
    return storedDP ? JSON.parse(storedDP) : null;
  });

  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  // Auto-load delivery partner from localStorage if token exists
  useEffect(() => {
    if (dpToken && !dp) {
      const storedDP = localStorage.getItem("dp");
      if (storedDP) {
        setDP(JSON.parse(storedDP));
      }
    }
  }, [dpToken, dp]);

  // login
  const loginDP = (token, dpData) => {
    if (dpData?.role !== "deliverypartner") {
      showNotification(
        "Access denied. Not a delivery partner account.",
        "error"
      );
      return;
    }

    setDPToken(token);
    setDP(dpData);
    localStorage.setItem("dpToken", token);
    localStorage.setItem("dp", JSON.stringify(dpData));
    navigate("/deliveryPartner");
  };

  // logout
  const logoutDP = () => {
    setDPToken(null);
    setDP(null);
    localStorage.removeItem("dpToken");
    localStorage.removeItem("dp");
    showNotification("Delivery Partner logged out successfully!", "success");
    navigate("/deliveryPartner/login");
  };

  return (
    <DP_AuthContext.Provider
      value={{
        dpToken,
        dp,
        loginDP,
        logoutDP,
        isDPAuthenticated: !!dpToken && dp?.role === "deliverypartner",
      }}
    >
      {children}
    </DP_AuthContext.Provider>
  );
}
