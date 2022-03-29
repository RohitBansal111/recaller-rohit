import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropertiesTable from "./propertiesTable";

const Properties = ({ step, setStep, ...props }) => {
  const [selectedName, setSelectedName] = useState("name");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectMapValue, setSelectMapValue] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorsSelectMap, setSelectMapErrors] = useState({});

  const [selectedRadioValue, setSelectedRadioValue] = useState("");

  const backStep = () => {
    setStep(step - 1);
  };

  const onRadioChange = (e) => {
    console.log(e.target.value);
    setSelectedRadioValue(e.target.value);
  };

  const handleSubmit = () => {
    if (
      selectedName &&
      (selectedName === selectedPhone || selectedName === selectedEmail)
    ) {
      return toast.error("Cannot map multiple columns to the same property ");
    } else if (
      selectedPhone &&
      (selectedPhone === selectedName || selectedPhone === selectedEmail)
    ) {
      return toast.error("Cannot map multiple columns to the same property ");
    } else if (
      selectedEmail &&
      (selectedEmail === selectedName || selectedEmail === selectedPhone)
    ) {
      return toast.error("Cannot map multiple columns to the same property ");
    } else if (selectedPhone && selectedPhone === null) {
      return setErrors({ error: "please fill out this field" });
    } else if (selectedEmail === null) {
      return setErrors({ error: "please fill out this field" });
    } else if (selectedEmail && selectMapValue === null) {
      return setSelectMapErrors({
        error:
          "Please fill out this field. Options are available once required fields are mapped above.",
      });
    } else {
      return setStep(step + 1);
    }
  };

  const handleSelectChange = (e) => {
    setSelectMapValue(e.target.value);
    setSelectMapErrors({});
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
    setErrors({});
  };
  const handlePhoneChange = (e) => {
    setSelectedPhone(e.target.value);
    setErrors({});
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
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          handleEmailChange={handleEmailChange}
          selectedEmail={selectedEmail}
          selectedName={selectedName}
          selectedPhone={selectedPhone}
          errors={errors.error}
        />
      </div>
      <div className="main-form">
        <h2>Logic For Existing Customers</h2>
        <div className="field-group">
          <label>
            1. Choose which mapped property to match with existing contacts
          </label>
          <select className="form-control" onChange={handleSelectChange}>
            <option value="" selected>
              Selected map property
            </option>
            {selectedPhone && (
              <option value={selectedPhone}>
                {selectedPhone.charAt(0).toUpperCase() + selectedPhone.slice(1)}
              </option>
            )}
            {selectedEmail && (
              <option value={selectedEmail}>
                {selectedEmail.charAt(0).toUpperCase() + selectedEmail.slice(1)}
              </option>
            )}
          </select>
          <span className="spanError">{errorsSelectMap.error}</span>
        </div>
        <div className="field-group">
          <label>2. What would you like to do with existing contacts?</label>
          <div className="multi-checkbox">
            <div className="checkbox-box">
              <input
                name="contacts"
                type="radio"
                onChange={onRadioChange}
              ></input>
              <label>Update Existing Contacts</label>
            </div>
            <div className="checkbox-box">
              <input
                name="contacts"
                type="radio"
                checked={true}
                onChange={onRadioChange}
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
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Properties;
