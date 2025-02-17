import React from "react";
import { useProtectPage } from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";

function ProtectHouseHolder() {
  const { isAuthenticated, userData } = useProtectPage();
  if (Object.keys(isAuthenticated).length > 0 && userData.email) {
    if (!isAuthenticated.status || userData.is_superuser) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }
}

export default ProtectHouseHolder;
