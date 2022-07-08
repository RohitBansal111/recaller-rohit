import React from "react";
import { Modal } from "react-responsive-modal";
import DeleteIcon from "@material-ui/icons/Delete";

const EditContactModal = ({ open, handleCloseContactModal, ...props }) => {
  console.log("edit contact data ::::::",props)
  return (
    <Modal
      open={open}
      onClose={handleCloseContactModal}
      center
      closeOnOverlayClick={false}
    >
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
                name="emailSubs"
                value={props.editContact.emailSubs}
                onChange={props.handleEditContactChange}
              >
                <option value={"opted-in"}>Opted In</option>
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
            <label>Campaign</label>
            <div className="foem-field-inner">
            <input
                type="text"
                className="form-control"
                placeholder="Enter Campaign"
                name="compaign"
                value={props.editContact?props.editContact.compaign?props.editContact.compaign:props.editContact.compaignId?props.editContact.compaignId.name:'' :''}
                onChange={props.handleEditContactChange}
              />
              {/* <select
                className="form-control"
                name="phoneSubs"
                value={props.editContact.phoneSubs}
                onChange={props.handleEditContactChange}
              >
                <option value={"opted-in"}>Opted In</option>
                <option value={"opted-out"}>Opted Out</option>
              </select> */}
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
