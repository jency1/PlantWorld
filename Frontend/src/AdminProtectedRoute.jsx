import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "./context/ADMIN/AdminAuthContext";

export default function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useContext(AdminAuthContext);

  return isAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
