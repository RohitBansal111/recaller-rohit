import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { addMultipleContact } from "../../../api/contact";

const ConfirmUpload = ({ step, setStep, ...props }) => {
  const [addNote, setAddNote] = useState(false);
  const handleAddNote = () => {
    setAddNote(true);
  };
  const finishStep = async () => {
    setStep(1);
    props.handleFinish();
    props.handleCsvState();
    const obj = {
      contacts: JSON.stringify(props.data),
      contactType: props.contactType,
      contactProperty: props.contactProperty,
    };
    await addMultipleContact(obj);
  };
  // const backStep = () => {
  //   setStep(step - 1);
  // };

  return (
    <div className="wizard-main-content">
      <h2>Almost There!</h2>
      <p>
        We added the following tag to your upload so that you can filter for
        them later:
      </p>
      <p className="fileInfo">Upload: {props.fileName}</p>
      <p>You can also configure some additional options below:</p>
      <div className="main-form">
        <div className="field-group flexFull note-form-control">
          {!addNote && (
            <div className="add-note-bttn">
              <button onClick={handleAddNote}>
                {" "}
                <AddIcon /> Add Note
              </button>
            </div>
          )}
          {addNote && (
            <>
              <label>Notes</label>
              <textarea type="text" className="form-control"></textarea>
            </>
          )}
          <h3>That's it! You can submit the upload when ready.</h3>
        </div>
        <div className="field-group flexFull text-center mt-3 mb-0">
          <button
            type="button"
            className="btn btn-cancel me-3"
            onClick={props.backStep}
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
