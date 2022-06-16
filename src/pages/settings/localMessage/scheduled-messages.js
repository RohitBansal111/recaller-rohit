import { Link } from "react-router-dom";
import ScheduledMessagesTable from "../../../components/settings/scheduled-messages-table";
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { getScheduleMessageApi } from "../../../api/setting-Api/schMsgSetting";

const ScheduledMessages = () => {
  useEffect(() => {
    getScheduleMessage();
  }, []);
  const [data, setData] = useState([]);
  const getScheduleMessage = async () => {
    const res = await getScheduleMessageApi();
    console.log(res.data.data, "lllllll");
    if (res && res.data && res.data.data.length > 0) {
      let filterData = [];
      filterData = res.data.data.filter((val) => {
        if (val.sheduled == true && new Date(val.sheduleDate) >= new Date()) {
          return val;
        }
      });
      setData(filterData);
    } else {
      setData([]);
    }
  };

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
          <ScheduledMessagesTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default ScheduledMessages;
