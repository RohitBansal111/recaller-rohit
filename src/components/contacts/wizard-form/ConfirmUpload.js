import React from "react";
import AddIcon from '@mui/icons-material/Add';

const ConfirmUpload = ({ step, setStep }) => {
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
      <p className="fileInfo">Upload: data.csv (2022-03-28 15:36)</p>
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
