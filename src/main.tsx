import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Login, SignUp, ProtectedRoute, PublicOnlyRoute } from "@/modules/auth";
import { DashboardLayout, Dashboard } from "@/modules/dashboard";
import { Suppliers } from "@/modules/suppliers";
import { Contracts } from "@/modules/contracts";
import { Alerts } from "@/modules/alerts";
import { Reports } from "@/modules/reports";
import { Users } from "@/modules/users";
import { Profile } from "@/modules/profile";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<App />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/proveedores" element={<Suppliers />} />
              <Route path="/contratos" element={<Contracts />} />
              <Route path="/alertas" element={<Alerts />} />
              <Route path="/reportes" element={<Reports />} />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </StrictMode>,
);
