import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Input } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { joinedDateClick, tagsClick } from "../../helper/list";
import DeleteFilterModal from "../../models/deleteFilterModal";
const EditFilter = (props) => {
  const renderJoinedDateOptions = () => {
    return joinedDateClick.map((item, i) => {
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

  return (
    <div className="create-filter">
      <div className="select-property-filter">
        <form>
          <div className="filter-top">
            <div className="full-width-screen">
              <FormControl fullWidth>
                <InputLabel
                  className="input-label-control"
                  id="demo-simple-select-label"
                >
                  Filter Name *
                </InputLabel>
                <Input
                  type="text"
                  name="name"
                  className="input-field-control"
                  min="0"
                  value={props.editFilterValue.name}
                  onChange={props.onhandleEditFilterChange}
                ></Input>
                <span className="spanError"></span>
              </FormControl>
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Properties</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Properties"
                name="property"
                value={props.editFilterValue.property}
                onChange={props.onhandleEditFilterChange}
              >
                <MenuItem value={"Joined Date"}>Joined Date</MenuItem>
                <MenuItem value={"Campaigns"}>Campaigns</MenuItem>
              </Select>
              <span className="spanError"> </span>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rule</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Rules"
                name="rule"
                value={props.editFilterValue.rule}
                onChange={props.onhandleEditFilterChange}
              >
                {props.editFilterValue.property === "Joined Date" &&
                  renderJoinedDateOptions()}
                {props.editFilterValue.property == "Campaigns" &&
                  renderTagsOptions()}
              </Select>
              <span className="spanError"> </span>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {props.editFilterValue.property == "Joined Date"
                  ? "Days Ago"
                  : "Campaigns name"}
              </InputLabel>
              {props.editFilterValue.property == "Joined Date" && (
                <>
                  <Input
                    type="number"
                    min="0"
                    name="value"
                    value={props.editFilterValue.value}
                    onChange={props.onhandleEditFilterChange}
                  ></Input>
                  <span className="spanError"></span>
                </>
              )}
              {props.editFilterValue.property == "Campaigns" && (
                <>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Properties"
                    name="value"
                    value={props.editFilterValue.value}
                    onChange={props.onhandleEditFilterChange}
                  >
                    {props.compaign &&
                      props.compaign.map((item, i) => (
                        <MenuItem key={i} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                  </Select>
                  <span className="spanError"> </span>
                </>
              )}
            </FormControl>
          </div>
          <div className="filter-bottom filter-edit-action">
            <div className="filter-add-clone"></div>
            <div className="filter-clear-save">
              <button
                type="button"
                className="cancel-action"
                onClick={() => props.deleteFilter(props.editFilterValue)}
              >
                <DeleteIcon />
                Delete Filter
              </button>
              <button
                type="button"
                className="cancel-action"
                onClick={props.handleContactFilterCancel}
              >
                <ClearIcon />
                Cancel
              </button>
              <button
                type="button"
                className="save-action"
                onClick={props.handleFilterEdit}
              >
                <DoneIcon /> Save Changes
              </button>
            </div>
            <DeleteFilterModal
              showDeleteFilterModal={props.showDeleteFilterModal}
              handleCloseDeleteFilterModal={props.handleCloseDeleteFilterModal}
              handleDeleteFilter={props.handleDeleteFilter}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFilter;
