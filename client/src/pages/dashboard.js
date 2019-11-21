import React from "react";
import Sidebar from "../components/sidebar";
import DashboardFeed from "../components/dashboardFeed";
import ContentWrapper from "../components/contentWrapper";

export default function Dashboard() {
  return (
    <ContentWrapper>
      <div id="Dashboard">
        <h1>Your Dashboard</h1>
        <p>
          Here you can view all recently posted content tailored to you, as a
          Studii user with a unique profile of courses and interests.
        </p>
        <div css={{ paddingTop: "10px" }}>
          <DashboardFeed />
        </div>
      </div>
    </ContentWrapper>
  );
}
