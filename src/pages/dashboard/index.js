import React from 'react'
import ActivityTabs from '../../components/home/tabs'
import OnlineReviewIcon from './../../assets/svg/icon-placeholder-online-reviews.svg'
import AnalyticsIcon from './../../assets/svg/icon-placeholder-analytics.svg'
import PerformanceIcon from './../../assets/svg/icon-placeholder-performance.svg'


const Dashboard = () => {

  return (
    <div className="dashboard-content">
        <div className="dashboard-header">
            <h1>Welcome To Your OneLocal Dashboard <span>Natures Harvest-Apparel</span></h1>
        </div>
        <div className="dashboard-performance-card">
            <div className="performance-card-item">
                <h3>Online Reviews</h3>
                <div className="card-media">
                    <img src={OnlineReviewIcon} alt="Online Reviews" />
                </div>
            </div>
            <div className="performance-card-item">
                <h3>Analytics</h3>
                <div className="card-media">
                    <img src={AnalyticsIcon} alt="Analytics" />
                </div>
            </div>
            <div className="performance-card-item">
                <h3>Performance</h3>
                <div className="card-media">
                    <img src={PerformanceIcon} alt="Performance" />
                </div>
            </div>
        </div>
        <div className="dashboard-multi-tabs">
            <ActivityTabs />
        </div>
    </div>
  )
}

export default Dashboard