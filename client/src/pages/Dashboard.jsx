import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

export const userContext = createContext();

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <userContext.Provider value={123}>
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default Dashboard;
