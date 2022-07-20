import React, { useState } from "react";
import ActivityTabs from "../../components/home/tabs";
import OnlineReviewIcon from "./../../assets/svg/icon-placeholder-online-reviews.svg";
import AnalyticsIcon from "./../../assets/svg/icon-placeholder-analytics.svg";
import PerformanceIcon from "./../../assets/svg/icon-placeholder-performance.svg";
import { Link } from "react-router-dom";
const Dashboard = (props) => {

 
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>
          Welcome To Your Recallr Dashboard <span> {"Company Name"} </span>
        </h1>
      </div>
      <div className="dashboard-performance-card">
        <div className="performance-card-item">
        <Link to="/Detail">
          <h3>Voice</h3>
          <div className="card-media">
            <img src={OnlineReviewIcon} alt="Online Reviews" />
          </div>
          </Link>
        </div>
        <div className="performance-card-item">
        <Link to="/Detail">
          <h3>Text</h3>
          <div className="card-media">
            <img src={AnalyticsIcon} alt="Analytics" />
          </div>
          </Link>
        </div>
        <div className="performance-card-item">
        <Link to="/Detail">
          <h3>Email</h3>
          <div className="card-media">
            <img src={PerformanceIcon} alt="Performance" />
          </div>
          </Link>
        </div>
      </div>
      <div className="dashboard-multi-tabs">
        <ActivityTabs />
      </div>
     
    </div>
  );
};

export default Dashboard;
