import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DP_AuthContext } from "./context/DP/DP_AuthContext";

export default function DP_ProtectedRoute({ children }) {
  const { isDPAuthenticated } = useContext(DP_AuthContext);

  return isDPAuthenticated ? (
    children
  ) : (
    <Navigate to="/deliveryPartner/login" replace />
  );
}
