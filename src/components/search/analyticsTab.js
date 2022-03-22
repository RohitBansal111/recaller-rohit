import WarningIcon from '@mui/icons-material/Warning';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShareIcon from '@mui/icons-material/Share';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const AnalyticsTab = () => {
  return (
    <div className="content-full-box">
      <div className="wraning-app-bar">
          <WarningIcon />
          <p>To view Analytics, <Link to="/"> activate LocalReferrals</Link></p>
      </div>
      <div className="analytics-section-main">
          <div className="analytics-list flex3">
              <div className="analytics-card-head"> <ShareIcon /> <h4>Referrals</h4> </div>
              <div className="analytics-card-body"> Demo Graph </div>
          </div>
          <div className="analytics-list flex3">
              <div className="analytics-card-head"> <PersonIcon /> <h4>Friends Who Purchased</h4> </div>
              <div className="analytics-card-body"> Demo Graph </div>
          </div>
          <div className="analytics-list flex3">
              <div className="analytics-card-head"> <BarChartIcon /> <h4>Conversion %</h4> </div>
              <div className="analytics-card-body"> Demo Graph </div>
          </div>
          <div className="analytics-list flex2">
              <div className="analytics-card-head"> <ShareIcon /> <h4>New Referrals By Month</h4> </div>
              <div className="analytics-card-body"> Demo Graph </div>
          </div>
          <div className="analytics-list flex2">
              <div className="analytics-card-head"> <SupervisedUserCircleIcon /> <h4>New Advocates By Month</h4> </div>
              <div className="analytics-card-body"> Demo Graph </div>
          </div>
          <div className="analytics-list flexFull">
              <div className="analytics-card-head"> <StarRateIcon /> <h4>Most Active Advocates</h4> </div>
              <div className="analytics-card-body"> Demo Graph </div>
          </div>
      </div>
    </div>
  )
}

export default AnalyticsTab