import React from "react";
import { Modal } from "react-responsive-modal";

const EditTagModal = ({ open, handleCloseETModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseETModal} center>
      <div className="modal-header">
        <h3>Edit Tag</h3>
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
              value={props.editTags && props.editTags.name}
              onChange={props.handleChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Color</label>
            <input
              type="color"
              className="form-control"
              placeholder="Enter Contact Name"
              name="color"
              value={props.editTags && props.editTags.color}
              onChange={props.handleChange}
            />
          </div>
          <div className="field-group flexFull text-center mt-3">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={() => handleCloseETModal()}
            >
              {" "}
              Dismiss{" "}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleEdit}
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

export default EditTagModal;
