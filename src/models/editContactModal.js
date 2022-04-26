import React from "react";
import { Modal } from "react-responsive-modal";
import DeleteIcon from "@material-ui/icons/Delete";

const EditContactModal = ({ open, handleCloseContactModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseContactModal} center>
      <div className="modal-header">
        <h3>Edit Contact Details</h3>
      </div>
      <div className="modal-body">
        <form className="main-form">
          <div className="field-group flex2">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="firstName"
              value={props.editContact.firstName}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              name="lastName"
              value={props.editContact.lastName}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={props.editContact.email}
              disabled={true}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Subscription</label>
            <div className="foem-field-inner">
              <select
                className="form-control"
                name="subscription"
                value={props.selectEmailSubscription}
                onChange={props.handleEmailSubSelectChange}
              >
                <option value={"opted-in"} selected>
                  Opted In
                </option>
                <option value={"opted-out"}>Opted Out</option>
              </select>
            </div>
          </div>
          <div className="field-group flex2">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone"
              name="phone"
              value={props.editContact.phone}
              disabled={true}
              onChange={props.handleEditContactChange}
            />
          </div>
          <div className="field-group flex2">
            <label>Subscription</label>
            <div className="foem-field-inner">
              <select
                className="form-control"
                value={props.selectPhoneSubscription}
                onChange={props.handlePhoneSubSelectChange}
              >
                <option value={"opted-in"} selected>
                  Opted In
                </option>
                <option value={"opted-out"}>Opted Out</option>
              </select>
            </div>
          </div>
          <div className="field-group flexFull text-center mt-5">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={() => handleCloseContactModal()}
            >
              {" "}
              Dismiss{" "}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleConDataEdit}
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

export default EditContactModal;
