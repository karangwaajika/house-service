import React from "react";
import { useProtectPage } from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";

function ProtectDashboard() {
  const { isAuthenticated } = useProtectPage();
  if (Object.keys(isAuthenticated).length > 0) {
    if (!isAuthenticated.status) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }
}

export default ProtectDashboard;
