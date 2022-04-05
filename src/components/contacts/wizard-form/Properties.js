import React from "react";
import PropertiesTable from "./propertiesTable";

const Properties = ({ step, setStep, ...props }) => {
  const backStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="wizard-main-content">
      <p>
        We detected the following columns. You can map them to an existing
        LocalContacts property if they were not automatically mapped correctly
        or you can unselect them to exclude them from the upload.
      </p>
      <div className="properties-table">
        <PropertiesTable
          tableData={props.tableData}
          handleNameChange={props.handleNameChange}
          handlePhoneChange={props.handlePhoneChange}
          handleEmailChange={props.handleEmailChange}
          selectedEmail={props.selectedEmail}
          selectedName={props.selectedName}
          selectedPhone={props.selectedPhone}
          errors={props.errors}
        />
      </div>
      <div className="main-form">
        <h2>Logic For Existing Customers</h2>
        <div className="field-group">
          <label>
            1. Choose which mapped property to match with existing contacts
          </label>
          <select
            className="form-control"
            name="property"
            onChange={props.handleSelectChange}
            value={props.selectProperty}
          >
            <option value="" selected>
              Selected map property
            </option>
            <option value={"phone"}>Phone</option>
            <option value={"email"}>Email</option>
          </select>
          <span className="spanError">
            {props.errorsSelectMap.selectMapErrors}
          </span>
        </div>
        <div className="field-group">
          <label>2. What would you like to do with existing contacts?</label>
          <div className="multi-checkbox">
            <div className="checkbox-box">
              <input
                name="type"
                type="radio"
                value={"update"}
                checked={props.selectedType == "update" ? true : false}
                onChange={props.onRadioChange}
              ></input>
              <label>Update Existing Contacts</label>
            </div>
            <div className="checkbox-box">
              <input
                name="type"
                type="radio"
                value={"skip"}
                checked={props.selectedType == "skip" ? true : false}
                onChange={props.onRadioChange}
              ></input>
              <label>Skip</label>
            </div>
          </div>
        </div>
        <div className="field-group flexFull text-center mt-3 mb-0">
          <button
            type="button"
            className="btn btn-cancel me-3"
            onClick={backStep}
          >
            {" "}
            Back{" "}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.handleSubmit}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Properties;
