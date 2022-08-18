import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ActivityCardContent from "./listCompaign";

const ActivityTabs = () => {
  return (
    <div className="activity-tabs">
      <Tabs
        defaultActiveKey="Campaigns"
        transition={false}
        id="noanim-tab-example"
        className="mb-2"
      >
        {/* <Tab eventKey="activity" title="Activity Feed">
          <ActivityCardContent />
        </Tab> 
        <Tab eventKey="Campaigns" title="Campaigns">
          <ActivityCardContent />
        </Tab>
        */}
      </Tabs>
    </div>
  );
};

export default ActivityTabs;
