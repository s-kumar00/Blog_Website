import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashProfile from "./DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const useParams = new URLSearchParams(location.search);
    const tabFormUrl = useParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="md:w-56">
        <DashboardSidebar />
      </div>

      {tab == "profile" && <DashProfile />}

      {/* main content */}
    </div>
  );
};

export default Dashboard;
