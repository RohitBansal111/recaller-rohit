import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateNewFilter from "./Create-new-filter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const FilterTabs = () => {
  const [properties, setProperties] = useState("");
  const [rules, setRules] = useState("");
  const [daysAgo, setDaysAgo] = useState("");
  const handleCancel = (e) => {
    // console.log(e);
  };
  const onHandleSave = (e) => {
    // console.log(e);
  };
  const handlePropertiesChange = (event) => {
    setProperties(event.target.value);
  };
  return (
    <div className="filter-tabs">
      <Tabs defaultActiveKey="all" transition={false} id="noanim-tab-example" className="mb-3">
        <Tab eventKey="all" title="All(234)"></Tab>
        <Tab
          eventKey="filter"
          title={
            <span>
              <AddCircleOutlineIcon /> New Filter (984){" "}
            </span>
          }
        >
          <CreateNewFilter
            handlePropertiesChange={handlePropertiesChange}
            handleRulesChange={(event) => setRules(event.target.value)}
            handleDaysAgoChange={(event) => setDaysAgo(event.target.value)}
            properties={properties}
            rules={rules}
            daysAgo={daysAgo}
            onCancel={handleCancel}
            onHandleSave={onHandleSave}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default FilterTabs;
