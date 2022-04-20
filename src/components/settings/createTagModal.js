import React from "react";
import { Modal } from "react-responsive-modal";

const CreateTagModal = ({ open, handleCloseCTModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseCTModal} center>
      <div className="modal-header">
        <h3>Create Conversation Tag</h3>
      </div>
      <div className="modal-body">
        <form className="main-form">
          <div className="field-group flex2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={props.addTags.name}
              onChange={props.handleChange}
            />
            <span className="spanError">{props.errors.name}</span>
          </div>
          <div className="field-group flex2">
            <label>Color</label>
            <input
              type="color"
              className="form-control"
              placeholder="Enter Contact Name"
              name="color"
              value={props.addTags.color}
              onChange={props.handleChange}
            />
          </div>
          <div className="field-group flexFull text-center mt-3">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={() => handleCloseCTModal()}
            >
              {" "}
              Dismiss{" "}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleClick}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTagModal;
