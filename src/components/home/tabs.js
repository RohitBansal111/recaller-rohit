import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ActivityCardContent from "./activityTabs";

const ActivityTabs = () => {
  return (
    <div className="activity-tabs">
      <Tabs
        defaultActiveKey="activity"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        {/* <Tab eventKey="activity" title="Activity Feed">
          <ActivityCardContent />
        </Tab> */}
        <Tab eventKey="updates" title="Campaigns">
          <ActivityCardContent />
        </Tab>
        <Tab eventKey="highlight" title="Highlights">
          <ActivityCardContent />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ActivityTabs;
