import React from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import InputLabel from "@mui/material/InputLabel";
import {
  duplicatedClick,
  joinedDateClick,
  lastActiveClick,
  lastMessageRecivedClick,
  sourceClick,
  tagsClick,
} from "./../../helper/list";
import { Input } from "@mui/material";
import DeleteFilterModal from "../../models/addFilterModal";

const CreateNewFilter = (props) => {
  const renderJoinedDateOptions = () => {
    return joinedDateClick.map((item, i) => {
      return (
        <MenuItem key={i} value={item.name}>
          {item.name}
        </MenuItem>
      );
    });
  };
  const renderLastActiveOptions = () => {
    return lastActiveClick.map((item, i) => {
      return (
        <MenuItem key={i} value={item.name}>
          {item.name}
        </MenuItem>
      );
    });
  };
  const renderTagsOptions = () => {
    return tagsClick.map((item, i) => {
      return (
        <MenuItem key={i} value={item.name}>
          {item.name}
        </MenuItem>
      );
    });
  };
  // const renderDuplicatesOptions = () => {
  //   return duplicatedClick.map((item, i) => {
  //     return (
  //       <MenuItem key={i} value={item.name}>
  //         {item.name}
  //       </MenuItem>
  //     );
  //   });
  // };
  // const renderLastMessageReceivedOptions = () => {
  //   return lastMessageRecivedClick.map((item, i) => {
  //     return (
  //       <MenuItem key={i} value={item.name}>
  //         {item.name}
  //       </MenuItem>
  //     );
  //   });
  // };
  // const renderSourceOptions = () => {
  //   return sourceClick.map((item, i) => {
  //     return (
  //       <MenuItem key={i} value={item.name}>
  //         {item.name}
  //       </MenuItem>
  //     );
  //   });
  // };

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
                <MenuItem value={"Joined Date"}>Joined Date</MenuItem>
                <MenuItem value={"Last Active"}>Last Active</MenuItem>
                <MenuItem value={"Campaigns"}>Campaigns</MenuItem>
              </Select>
              <span className="spanError">{props.errors.properties}</span>
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
                  {props.properties == "Joined Date" &&
                    renderJoinedDateOptions()}
                  {props.properties == "Last Active" &&
                    renderLastActiveOptions()}
                  {props.properties == "Campaigns" && renderTagsOptions()}
                </Select>
                <span className="spanError">{props.errors.rules}</span>
              </FormControl>
            )}
            {props.rules && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {props.properties == "Campaigns"
                    ? "Campaigns name"
                    : "Days Ago"}
                </InputLabel>
                {props.properties == "Joined Date" && (
                  <>
                    <Input
                      type="number"
                      name="val"
                      min="0"
                      value={props.inputValue.val}
                      onChange={props.handleJDChange}
                    ></Input>
                    <span className="spanError">{props.errors.error}</span>
                  </>
                )}
                {props.properties == "Last Active" && (
                  <>
                    <Input
                      type="number"
                      name="val"
                      min="0"
                      value={props.inputValue.val}
                      onChange={props.handleJDChange}
                    ></Input>
                    <span className="spanError">{props.errors.error}</span>
                  </>
                )}
                {props.properties == "Campaigns" && (
                  <>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="val"
                      value={props.inputValue.val}
                      label="Compaigns"
                      onChange={props.handleJDChange}
                    >
                      {props.compaign &&
                        props.compaign.map((item, i) => (
                          <MenuItem key={i} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                    </Select>
                    <span className="spanError">{props.errors.error}</span>
                  </>
                )}
              </FormControl>
            )}

            <button
              type="button"
              className="clear-button"
              onClick={props.handleClear}
            >
              <ClearIcon />
            </button>
          </div>
          <div className="filter-bottom">
            <div className="filter-clear-save">
              <button
                type="button"
                className="cancel-action"
                onClick={props.onCancel}
              >
                <ClearIcon />
                Cancel
              </button>
              <button
                type="button"
                className="save-action"
                onClick={props.onHandleSave}
              >
                <DoneIcon /> Save Filter
              </button>
              <DeleteFilterModal
                showAddFilterModal={props.showAddFilterModal}
                handleCloseAddFilterModal={props.handleCloseAddFilterModal}
                handleAddFilterData={props.handleAddFilterData}
                filterName={props.filterName}
                onFilterNameChange={props.onFilterNameChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewFilter;
