import React from "react";
import { useProtectPage } from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";

function ProtectDashboard() {
  const { isAuthenticated, userData } = useProtectPage();

  if (Object.keys(isAuthenticated).length > 0) {
    if (!isAuthenticated.status || !userData.is_superuser) {
      return <Navigate to="/" replace />;
    }
    // this is returning the outlet which is only one page that's why we see one
    // that is Dashboard, however it has children. so the <outlet> is not return as single but
    // the whole content of Dashboard so the outlet is just a part of it.
    return <Outlet />;
  }
}

export default ProtectDashboard;
