import React from "react";
import AddIcon from "@mui/icons-material/Add";

const ConfirmUpload = ({ step, setStep, ...props }) => {
  if(props.unSavedContacts && props.unSavedContacts.length){
    return(  <div className="wizard-main-content">

    <div className="main-form">
      <div className="field-group flexFull note-form-control">
        <p>These Below contacts are not added </p>
       {props.unSavedContacts.map(c=>{
         return(<div>
           <p>{c.firstName?c.firstName:''}</p>
           <p>{c.lastName?c.lastName:''}</p>
           <p>{c.phone?c.phone:''}</p>
           <p>{c.email?c.email:''}</p>
         </div>)
       })}
      </div>
      <div className="field-group flexFull text-center mt-3 mb-0">

        <button
          type="button"
          className="btn btn-primary"
          onClick={props.closeModal}
        >
          {" "}
          close{" "}
        </button>
      </div>
    </div>
  </div>)
  }else{
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
            {!props.addNote && (
              <div className="add-note-bttn">
                <button onClick={props.handleAddNote}>
                  {" "}
                  <AddIcon /> Add Note
                </button>
              </div>
            )}
            {props.addNote && (
              <>
                <label>Notes</label>
                <textarea
                  type="text"
                  onChange={props.handleNoteChange}
                  value={props.noteData}
                  className="form-control"
                ></textarea>
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
              onClick={props.finishStep}
            >
              {" "}
              Finish{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }

};

export default ConfirmUpload;
