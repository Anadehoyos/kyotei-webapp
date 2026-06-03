import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/modules/auth/utils";

export function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
