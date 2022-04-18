import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateNewFilter from "./Create-new-filter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Dropdown } from "react-bootstrap";
const FilterTabs = (props) => {
  const [properties, setProperties] = useState("");
  const [rules, setRules] = useState("");
  const [daysAgo, setDaysAgo] = useState("");
  const [value, setValue] = useState("");

  const handleCancel = (e) => {
    // console.log(e);
  };
  const onHandleSave = (e) => {
    // console.log(e);
  };
  const handlePropertiesChange = (event) => {
    setProperties(event.target.value);
  };

  const handleSelect = (e) => {
    setValue(e);
  };

  return (
    <div className="filter-tabs">
      <Tabs
        defaultActiveKey="all"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab
          eventKey={"all"}
          title={
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle
                id="dropdown-basic"
                className="btn btn-medium btn-primary filter-dropdown"
              >
                {value ? `${value}` : `All( ${props.totalRecords})`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={props.handleAllTagsData}>
                  {`All(${props.totalRecords})`}
                </Dropdown.Item>
                {props.tags
                  ? props.tags.map((item) => (
                      <>
                        <Dropdown.Item
                          eventKey={item.label}
                          onClick={() => props.handleTagsClick(item)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      </>
                    ))
                  : []}
              </Dropdown.Menu>
            </Dropdown>
          }
        ></Tab>
        <Tab
          eventKey="filter"
          title={
            <span>
              <AddCircleOutlineIcon /> New Filter ({props.totalRecords}){" "}
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
