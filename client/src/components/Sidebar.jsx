import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useProtectPage } from "../hooks/useProtectPage";
import logoPic from "/images/logo.png";

function Sidebar() {
  const { logout } = useProtectPage();
  const [openCategory, setOpenCategory] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openWorkers, setOpenWorkers] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="meu">
      <div className="logos">
        <img src={logoPic} alt="logo-admin" height={100} width={100} />
      </div>
      <div className="menu--list">
        <NavLink to="/dashboard" className="item">
          <i className="fa fa-home icon "></i>
          Dashboard
        </NavLink>
        <div className={openCategory ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-layer-group icon"></i> Category
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenCategory((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="#"
              className={
                openCategory
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="#"
              className={
                openCategory
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openService ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-toolbox icon"></i> Services
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenService((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="#"
              className={
                openService
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="#"
              className={
                openService
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openWorkers ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-user-group icon"></i> Workers
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenWorkers((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="#"
              className={
                openWorkers
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="#"
              className={
                openWorkers
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openBookings ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-file icon"></i> Bookings
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenBookings((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="#"
              className={
                openBookings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="#"
              className={
                openBookings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openReports ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-folder-open icon"></i> Reports
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenReports((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="#"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="#"
              className={
                openReports
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>
        <div className={openSettings ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              <i className="fa-solid fa-gears icon"></i> Settings
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => setOpenSettings((old) => !old)}
            ></i>
          </div>
          <div className="sidebar-content">
            <NavLink
              to="#"
              className={
                openSettings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-square-plus icon"></i>
              Add
            </NavLink>
            <NavLink
              to="#"
              className={
                openSettings
                  ? "item-sub open animated slideInDown"
                  : "animated slideInUp item-sub"
              }
            >
              <i className="fa-regular fa-eye icon"></i>
              View
            </NavLink>
          </div>
        </div>

        <NavLink to="#" className="item">
          <i className="fa-regular fa-circle-question icon"></i>
          Help
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
