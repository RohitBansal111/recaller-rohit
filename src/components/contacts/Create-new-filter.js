import React from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import InputLabel from "@mui/material/InputLabel";

const CreateNewFilter = (props) => {
  return (
    <div className="create-filter">
      <div className="select-property-filter">
        <form>
          <div className="filter-top">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Properties</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.properties}
                label="Properties"
                onChange={props.handlePropertiesChange}
              >
                <MenuItem value="Source">Source</MenuItem>
                <MenuItem value={20}>Joined Date</MenuItem>
                <MenuItem value={30}>Last Active</MenuItem>
                <MenuItem value={30}>Last Message Received</MenuItem>
                <MenuItem value={30}>Tags</MenuItem>
                <MenuItem value={30}>Duplicates</MenuItem>
              </Select>
            </FormControl>
            {props.properties && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rules</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.rules}
                  label="Rules"
                  onChange={props.handleRulesChange}
                >
                  <MenuItem value="Source">Source</MenuItem>
                  <MenuItem value={20}>Joined Date</MenuItem>
                  <MenuItem value={30}>Last Active</MenuItem>
                  <MenuItem value={30}>Last Message Received</MenuItem>
                  <MenuItem value={30}>Tags</MenuItem>
                  <MenuItem value={30}>Duplicates</MenuItem>
                </Select>
              </FormControl>
            )}
            {props.rules && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Days Ago</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.daysAgo}
                  label="Days Ago"
                  onChange={props.handleDaysAgoChange}
                >
                  <MenuItem value="Source">Source</MenuItem>
                  <MenuItem value={20}>Joined Date</MenuItem>
                  <MenuItem value={30}>Last Active</MenuItem>
                  <MenuItem value={30}>Last Message Received</MenuItem>
                  <MenuItem value={30}>Tags</MenuItem>
                  <MenuItem value={30}>Duplicates</MenuItem>
                </Select>
              </FormControl>
            )}

            <button type="button" className="clear-button">
              <ClearIcon />
            </button>
          </div>
          <div className="filter-bottom">
            <div className="addRole-action">
              <button type="button" onClick={props.addRoles}>
                <AddIcon /> Add Role
              </button>
            </div>
            <div className="filter-clear-save">
              <button type="button" className="cancel-action" onClick={props.onCancel}>
                <ClearIcon />
                Cancel
              </button>
              <button type="button" className="save-action" onClick={props.onHandleSave}>
                <DoneIcon /> Save Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewFilter;
