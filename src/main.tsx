import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Login, SignUp, ProtectedRoute, PublicOnlyRoute } from "@/modules/auth";
import { DashboardLayout, Dashboard } from "@/modules/dashboard";
import { Proveedores } from "@/modules/proveedores";
import { Contratos } from "@/modules/contratos";
import { Alertas } from "@/modules/alertas";
import { Reportes } from "@/modules/reportes";
import { Usuarios } from "@/modules/usuarios";
import { Perfil } from "@/modules/perfil";
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
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/alertas" element={<Alertas />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </StrictMode>,
);
