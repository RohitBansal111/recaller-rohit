import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AddTag = ({ ...props }) => {
  return (
    <div className="wizard-main-content">
      <div className="add-tag-contact">
        <div className="main-form">
          <div className="field-group">
            <div className="field-group flexFull">
              <label> Create Campaign </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Campaign"
                name="compaign"
                value={props.addCampaigns.compaign}
                onChange={props.handleCampaignChange}
              />
              <span className="spanError">{props.errors.compaign}</span>
            </div>
          </div>

          <div className="field-group flexFull text-center mt-5 mb-0">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={props.onClose}
            >
              {" "}
              Back{" "}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleSubmit}
            >
              {" "}
              Proceed{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTag;
