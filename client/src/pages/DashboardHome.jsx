import React from "react";
import Content from "../components/Content";
import Profile from "../components/Profile";
import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";
import logoImage from "/images/logo.png";

function DashboardHome() {
  return (
    <div className="dashboard-home--content">
      <ContentHeader />
      <div className="content--dashboard">
        <div className="side-graph">
          <Card />
          <div className="graph">
            <div className="">
              <img src={logoImage} alt="" />
              <h3 style={{ color: "#526d82", textAlign: "center" }}>
                House service
              </h3>
            </div>
          </div>
        </div>
        <Profile />
      </div>
    </div>
  );
}

export default DashboardHome;
