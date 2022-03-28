import React from "react";
import AddIcon from '@mui/icons-material/Add';

const ConfirmUpload = ({ step, setStep ,...props}) => {
  const finishStep = () => {
    setStep(step + 1);
  };
  const backStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="wizard-main-content">
      <h2>Almost There!</h2>
      <p>We added the following tag to your upload so that you can filter for them later:</p>
      <p className="fileInfo">Upload: {props.fileName} ({props.fileCreatedAt})</p>
      <p>You can also configure some additional options below:</p>
      <div className="main-form">
        <div className="field-group flexFull note-form-control">
          <div className="add-note-bttn">
            <button> <AddIcon /> Add Note</button>
          </div>
          <label>Notes</label>
          <textarea type="text" className="form-control"></textarea>
          <h3>That's it! You can submit the upload when ready.</h3>
        </div>
        <div className="field-group flexFull text-center mt-3">
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
            onClick={finishStep}
          >
            {" "}
            Finish{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpload;
