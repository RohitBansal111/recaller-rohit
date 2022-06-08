import React from "react";

const Preparation = ({ closeModal, step, setStep, ...props }) => {
  return (
    <div className="wizard-main-content">
      <ul className="wizard-steps-bar">
        <li>1. Create a New Spreadsheet</li>
        <li>2. Add column labels to your first row</li>
        <li>3. Add your contacts below the first row.</li>
        <li>
          4. Done? Save your spreadsheet as a CSV file type and upload it below
        </li>
      </ul>
      <div className="main-form">
        <div
          className={
            props.isFilePicked && props.csvFile
              ? "field-group upload-drag-section text-center activeDrop"
              : "field-group upload-drag-section text-center"
          }
          {...props.getRootProps}
        >
          <i className="material-icons">cloud_upload</i>
          <h3>
            {props.csvFile
              ? " Ready To Upload"
              : "Drag and drop a CSV file here to upload"}
          </h3>
          <h4>{props.isFilePicked && props.csvFile ? props.csvFile : "Or"}</h4>
          <div className="select-file">
            <span>
              {props.isFilePicked && props.csvFile
                ? "Change file"
                : "Select a file"}
            </span>
            <input
              name="file"
              type="file"
              accept=".csv"
              {...props.getInputProps}
            ></input>
          </div>
        </div>
        <div className="field-group flexFull text-center mt-3 mb-0">
          <button
            type="button"
            className="btn btn-cancel me-3"
            onClick={props.onClose}
          >
            {" "}
            Dismiss{" "}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={props.csvFile ? false : true}
            onClick={props.nextStep}
          >
            {" "}
            Proceed{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preparation;
