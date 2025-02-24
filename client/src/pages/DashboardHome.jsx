import React from "react";
import Content from "../components/Content";
import Profile from "../components/Profile";
import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";
import logoImage from "/images/logo.png";
import { useProtectPage } from "../hooks/useProtectPage";

import { BarChart } from "@mui/x-charts/BarChart";

function DashboardHome() {
  const { userData } = useProtectPage();
  return (
    <div className="dashboard-home--content">
      <ContentHeader />
      <div className="content--dashboard">
        <div className="side-graph">
          <Card />
          <div className="graph">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
              series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
              width={680}
              height={350}
            />
          </div>
        </div>
        <Profile />
      </div>
    </div>
  );
}

export default DashboardHome;
