import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ValueCardContent from "./Valuetabscontent";

const ValueTabs = () => {
  return (
    <div className="value-tabs">
      <Tabs
        defaultActiveKey="Percentage"
        transition={false}
        id="noanim-tab-example"
        className="mb-2"
      >
        <Tab eventKey="Value" title="Value">
          <ValueCardContent />
        </Tab>
        <Tab eventKey="Percentage" title="Percentage">
          <ValueCardContent />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ValueTabs;
