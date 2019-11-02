import React from "react";
import Sidebar from "../components/sidebar";
import DashboardFeed from "../components/dashboardFeed";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <DashboardFeed />
    </div>
  );
}
