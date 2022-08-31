import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Detailtabcontent from "./Detailtabcontent";

const DetailTabs = () => {
  return (
    <div className="activity-tabs">
      <Tabs
        defaultActiveKey="Messages"
        transition={false}
        id="noanim-tab-example"
        className="mb-2"
      >
        <Tab eventKey="Messages" title="Messages">
          <Detailtabcontent />
        </Tab>
        <Tab eventKey="Contacts" title="Contacts">
          <Detailtabcontent />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailTabs;
