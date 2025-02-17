import HomePageNav from "@/components/HomePageNav";
import React, { createContext } from "react";
import { Outlet } from "react-router-dom";
import { useProtectPage } from "@/hooks/useProtectPage";
import Navbar from "@/components/house-holder/Navbar";
export const userContext = createContext();

function RootHouseHolder() {
  const { userData, logout } = useProtectPage();
  return (
    <div className="app-container householder">
      <userContext.Provider value={{ userData, logout }}>
        <Navbar />
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default RootHouseHolder;
