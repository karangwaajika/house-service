import React from "react";
import { NavLink } from "react-router-dom";
import { useProtectPage } from "../hooks/useProtectPage";
import logoPic from "/images/logo.png";

function Sidebar() {
  const { logout } = useProtectPage();
  return (
    <div className="meu">
      <div className="logos">
        <img src={logoPic} alt="logo-admin" height={100} width={100} />

        {/* <h2>
          <i className="fa fa-user logo-icon" onClick={logout}></i>EduFlex
        </h2> */}
      </div>
      <div className="menu--list">
        <NavLink to="/dashboard" className="item">
          <i className="fa fa-home icon"></i>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/service-category" className="item">
          <i className="fa fa-home icon"></i>
          Service-category
        </NavLink>
        <NavLink to="/dashboard/service" className="item">
          <i className="fa fa-home icon"></i>
          Services
        </NavLink>
        <NavLink to="/dashboard/workers" className="item">
          <i className="fa fa-home icon"></i>
          Workers
        </NavLink>
        <NavLink to="/dashboard/bookings" className="item">
          <i className="fa fa-home icon"></i>
          Reports
        </NavLink>
        <NavLink to="/dashboard/bookings" className="item">
          <i className="fa fa-user icon"></i>
          Settings
        </NavLink>
        <NavLink to="/dashboard/bookings" className="item">
          <i className="fa fa-user icon"></i>
          Help
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
