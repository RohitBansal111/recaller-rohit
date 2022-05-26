import { Link } from "react-router-dom";
import ScheduledMessagesTable from "../../../components/settings/scheduled-messages-table";
import { MdChevronRight } from "react-icons/md";

const ScheduledMessages = () => {
  return (
    <div className="content-page-layout">
      <div className="page-header subheading-bar">
        <div className="header-text">
          <h1>Settings</h1>
          <p>
            {<Link to={"/settings"}>Settings</Link>}
            <MdChevronRight />
            {<Link to={"/settings/text"}>Text</Link>}
            <MdChevronRight />
            Scheduled Messages
          </p>
        </div>
      </div>
      <div className="setting-page-main">
        <p>
          Only individually scheduled messages are shown here. For bulk
          scheduled messages
        </p>
        <div className="schedule-table-box">
          <ScheduledMessagesTable />
        </div>
      </div>
    </div>
  );
};

export default ScheduledMessages;
