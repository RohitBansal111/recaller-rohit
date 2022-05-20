import React from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from "@mui/icons-material/Clear";
// import AddIcon from "@mui/icons-material/Add";
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
                {/* <MenuItem value="Source">Source</MenuItem> */}
                {/* <MenuItem value={"Duplicates"}>Duplicates</MenuItem> */}
                {/* <MenuItem value={"Last Message Received"}>
                Last Message Received
                </MenuItem> */}
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
                  {/* {props.properties == "Source" && renderSourceOptions()} */}
                  {/* {props.properties == "Last Message Received" &&
                    renderLastMessageReceivedOptions()} */}
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
                      name="joineddate"
                      min="0"
                      placeholder="Enter Date"
                      value={props.joinedDate.joineddate}
                      onChange={props.handleJDChange}
                    ></Input>
                    <span className="spanError">{props.errors.joinedDate}</span>
                  </>
                )}
                {props.properties == "Last Active" && (
                  <>
                    <Input
                      type="number"
                      name="lastActive"
                      min="0"
                      placeholder="Enter Date"
                      value={props.lastActiveDate.lastActive}
                      onChange={props.handleLAChange}
                    ></Input>
                    <span className="spanError">{props.errors.lastActive}</span>
                  </>
                )}
                {props.properties == "Campaigns" && (
                  <>
                    <Input
                      type="text"
                      name="campaigns"
                      placeholder="Enter Campaigns"
                      value={props.addFilter.campaigns}
                      onChange={props.handleInputChange}
                    ></Input>
                    <span className="spanError">{props.errors.campaigns}</span>
                  </>
                )}
                {/* {props.properties == "Last Message Received" && <Input></Input>} */}
                {/* {props.properties == "Source" && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.daysAgo}
                    label={
                      props.properties == "Campaigns "
                        ? "Campaigns name"
                        : props.properties == "Last Active "
                        ? "Date Ago"
                        : props.properties == "Joined Date "
                        ? "Date Ago"
                        : props.properties == "Joined Date "
                    }
                    onChange={props.handleDaysAgoChange}
                  >
                    <MenuItem value="SmartForms">SmartForms</MenuItem>
                    <MenuItem value="Recallr">Recallr</MenuItem>
                    <MenuItem value="LocalReviews-New Feedback Submission">
                      LocalReviews - New Feedback Submission
                    </MenuItem>
                    <MenuItem value="LocalReviews-Sent Feedback Request">
                      LocalReviews - Sent Feedback Request
                    </MenuItem>
                    <MenuItem value="LocalReferrals-Friend">
                      LocalReferrals - Friend
                    </MenuItem>
                    <MenuItem value="LocalReferrals-Advocate">
                      LocalReferrals - Advocate
                    </MenuItem>
                    <MenuItem value="LocalReferrals-Sent Advocate Invite">
                      LocalReferrals - Sent Advocate Invite
                    </MenuItem>
                    <MenuItem value="LocalContacts - Manually Added">
                      LocalContacts - Manually Added
                    </MenuItem>
                    <MenuItem value="LocalContacts-Batch Imported">
                      LocalContacts - Batch Imported
                    </MenuItem>
                    <MenuItem value="LocalMessages">LocalMessages</MenuItem>
                    <MenuItem value="LocalMessages-Inbound SMS">
                      LocalMessages - Inbound SMS
                    </MenuItem>
                    <MenuItem value="LocalMessages-Inbound Widget">
                      LocalMessages - Inbound Widget
                    </MenuItem>
                    <MenuItem value="LocalMessages-Outbound SMS">
                      LocalMessages - Outbound SMS
                    </MenuItem>
                    <MenuItem value="LocalVisits-Bookings">
                      LocalVisits - Bookings
                    </MenuItem>
                    <MenuItem value="Freshbooks">Freshbooks</MenuItem>
                    <MenuItem value="LocalReviews">LocalReviews</MenuItem>
                    <MenuItem value="LocalContacts">LocalContacts</MenuItem>
                    <MenuItem value="LocalReferrals">LocalReferrals</MenuItem>
                    <MenuItem value="Mindbody">Mindbody</MenuItem>
                    <MenuItem value="QuickBooks">QuickBooks</MenuItem>
                  </Select>
                )} */}
              </FormControl>
              // ) : props.properties == "Duplicates" ? (
              //   <FormControl fullWidth>
              //     <InputLabel id="demo-simple-select-label">Value</InputLabel>
              //     <Select
              //       labelId="demo-simple-select-label"
              //       id="demo-simple-select"
              //       value={props.daysAgo}
              //       label="Value"
              //       onChange={props.handleDaysAgoChange}
              //     >
              //       {renderDuplicatesOptions()}
              //     </Select>
              //   </FormControl>
              // ) : (
              //   ""
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
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewFilter;
