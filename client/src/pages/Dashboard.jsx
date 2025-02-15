import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet} from "react-router-dom";
import { createContext, useState } from "react";
import { useProtectPage } from "../hooks/useProtectPage";

export const userContext = createContext();

function Dashboard() {
  const {userData} = useProtectPage()
  console.log("inuser",userData)
  return (
    <div className="dashboard">
      <userContext.Provider value={123}>
        <Sidebar />
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default Dashboard;
