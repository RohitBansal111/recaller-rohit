import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

const Preparation = ({ closeModal, step, setStep }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState("");
console.log(csvData,"csvData");
  const nextStep = () => {
    setStep(step + 1);
  };
  const onClose = () => {
    closeModal(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setCsvFile(acceptedFiles[0].name);
    var formData = new FormData();
    formData.append("file", acceptedFiles[0].name);
    const username = formData.get("file");
    console.log(username, "username");
    Papa.parse(acceptedFiles[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          className="field-group upload-drag-section text-center"
          {...getRootProps()}
        >
          <i className="material-icons">cloud_upload</i>
          <h3>
            {csvFile
              ? " Ready To Upload"
              : "Drag and drop a CSV file here to upload"}
          </h3>
          <h4>{csvFile ? csvFile : "Or"}</h4>
          <div className="select-file">
            <span>{csvFile ? "Change file" : "Select a file"}</span>
            <input
              name="file"
              type="file"
              accept=".csv"
              {...getInputProps()}
            ></input>
          </div>
        </div>
        <div className="field-group flexFull text-center mt-3">
          <button
            type="button"
            className="btn btn-cancel me-3"
            onClick={onClose}
          >
            {" "}
            Dismiss{" "}
          </button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>
            {" "}
            Proceed{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preparation;
