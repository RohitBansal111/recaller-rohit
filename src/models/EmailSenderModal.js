import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const EmailSenderModal = ({show, handleClose, handleSubmit}) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Sender</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="modal-para">You are required to include your contact information, include a physical mailing address, inside every email you send in order to comply with the U.S CAN-SPAM Act, CASL, and other anti-spam laws of the countries your recipients live in.</p>
          <form className="main-form">
            <div className="field-group flex2">
              <label>From Email*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                name="name"
              />
            </div>
            <div className="field-group flex2">
              <label>From Name*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="phone"
              />
            </div>
            <div className="field-group flexFull">
              <label>Reply-to</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter reply email"
                name="phone"
              />
            </div>
            <div className="field-group flex2">
              <label>Physical Mailing Address*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                name="phone"
              />
            </div>
            <div className="field-group flex2">
              <label>Sender Nickname*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter nick name"
                name="phone"
              />
            </div>
          </form>
          <p className="modal-para">We will send a confirmation email to the "From Email" to verify ownership. Questions? <Link to="/"> Contact Us </Link></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Sender
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmailSenderModal;
