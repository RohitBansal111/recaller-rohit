import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import SMSMessageGraph from "../../../components/settings/sms-message-graph";

const Usage = () => {
  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>{<Link to={"/settings"}>Settings</Link>} /
            {<Link to={"/settings/text"}>Text</Link>} / Usage</p>
        </div>
      </div>
      <div className="setting-page-main">
        <div className="common-card-ui mb-4">
          <div className="card-header">
            <h3>SMS Messages sent in March</h3>
            <p>
              {" "}
              <b>6042</b> / 8000 SMS
            </p>
          </div>
          <div className="card-body">
            <div className="content-body">
              <div className="sms-progressbar">
                <LinearProgress variant="determinate" value={50} />
              </div>
            </div>
          </div>
        </div>
        <div className="common-card-ui">
          <div className="card-header">
            <h3>SMS Message Usage</h3>
          </div>
          <div className="card-body">
            <div className="content-body">
              <SMSMessageGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usage;
