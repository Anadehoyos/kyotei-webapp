import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/modules/auth/utils";

export function PublicOnlyRoute() {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
