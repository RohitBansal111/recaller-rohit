import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateNewFilter from "./Create-new-filter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Dropdown } from "react-bootstrap";
const FilterTabs = (props) => {
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
            <Dropdown onSelect={props.handleSelect}>
              <Dropdown.Toggle
                id="dropdown-basic"
                className="btn btn-medium btn-primary filter-dropdown"
              >
                {props.value ? `${props.value}` : `All(${props.totalRecords})`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={props.handleAllTagsData}>
                  {`All(${props.totalRecords})`}
                </Dropdown.Item>
                {props.compaign
                  ? props.compaign.map((item) => (
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
              <AddCircleOutlineIcon /> New Filter ({props.totalRecords})
            </span>
          }
        >
          <CreateNewFilter
            handlePropertiesChange={props.handlePropertiesChange}
            handleRulesChange={(event) => props.setRules(event.target.value)}
            handleDaysAgoChange={(event) =>
              props.setDaysAgo(event.target.value)
            }
            properties={props.properties}
            rules={props.rules}
            daysAgo={props.daysAgo}
            onCancel={props.handleFilterCancel}
            onHandleSave={props.onHandleSave}
            handleClear={props.handleClear}
            rowsData={props.rowsData}
            addFilter={props.addFilter}
            handleInputChange={props.handleInputChange}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default FilterTabs;
