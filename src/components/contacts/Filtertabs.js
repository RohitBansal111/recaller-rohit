import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateNewFilter from "./Create-new-filter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Dropdown } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import EditFilter from "./edit-filter";

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
                <Dropdown.Item
                  eventKey={`All(${props.totalRecords})`}
                  onClick={props.handleAllTagsData}
                >
                  {`All(${props.totalRecords})`}
                </Dropdown.Item>
                {props.filterList
                  ? props.filterList.map((item) => (
                      <>
                        <Dropdown.Item
                          eventKey={`${item.name}(${item.resultCount})`}
                          onClick={() => props.handleTagsClick(item)}
                        >
                          {`${item.name}(${item.resultCount})`}
                        </Dropdown.Item>
                      </>
                    ))
                  : []}
              </Dropdown.Menu>
            </Dropdown>
          }
        >
          {props.showSelect && (
            <div className="edit-filter-bar">
              <span>
                {props.editFilterData.property == "joinedDate"
                  ? `${props.editFilterData.property} ${props.editFilterData.rule} ${props.editFilterData.value}`
                  : props.editFilterData.property == "campaigns"
                  ? `${props.editFilterData.name} `
                  : ""}
              </span>
              <button
                type="button"
                onClick={() => props.handleEditFilter(props.editFilterData)}
                className="btn btn-edit"
              >
                {" "}
                <EditIcon /> Edit{" "}
              </button>
            </div>
          )}
          {props.editFilter && (
            <EditFilter
              editFilterValue={props.editFilterValue}
              onhandleEditFilterChange={props.onhandleEditFilterChange}
              compaign={props.compaign}
              handleFilterEdit={props.handleFilterEdit}
              deleteFilter={props.deleteFilter}
              handleContactFilterCancel={props.handleContactFilterCancel}
              showDeleteFilterModal={props.showDeleteFilterModal}
              handleCloseDeleteFilterModal={props.handleCloseDeleteFilterModal}
              handleDeleteFilter={props.handleDeleteFilter}
            />
          )}
        </Tab>
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
            handleRulesChange={props.handleRulesChange}
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
            inputValue={props.inputValue}
            handleInputChange={props.handleInputChange}
            handleJDChange={props.handleJDChange}
            showAddFilterModal={props.showAddFilterModal}
            handleCloseAddFilterModal={props.handleCloseAddFilterModal}
            handleAddFilterData={props.handleAddFilterData}
            errors={props.errors}
            filterName={props.filterName}
            onFilterNameChange={props.onFilterNameChange}
            compaign={props.compaign}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default FilterTabs;
