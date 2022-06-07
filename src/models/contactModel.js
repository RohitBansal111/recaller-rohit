import React from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import LoadingButton from "@mui/lab/LoadingButton";

const animatedComponents = makeAnimated();

const ContactModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="main-form">
            <div className="field-group flex2">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                name="firstName"
                value={props.addContactData.firstName}
                onChange={props.onChange}
              />
              <span className="spanError">{props.errors.firstName}</span>
            </div>
            <div className="field-group flex2">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                name="lastName"
                value={props.addContactData.lastName}
                onChange={props.onChange}
              />
              <span className="spanError">{props.errors.lastName}</span>
            </div>
            <div className="field-group flex2">
              <label>Phone</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone"
                name="phone"
                value={props.addContactData.phone}
                onChange={props.onChange}
              />
              <span className="spanError">{props.errors.phone}</span>
            </div>

            <div className="field-group flex2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={props.addContactData.email}
                onChange={props.onChange}
              />
              <span className="spanError">{props.errors.email}</span>
            </div>
            <div className="field-group flex2">
              <label>Country</label>
              <select>
                <option>Select Country</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <span className="spanError">{props.errors.country}</span>
            </div>
            <div className="field-group flex2">
              <label> State/Prov </label>
              <select>
                <option>Select State</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <span className="spanError">{props.errors.state}</span>
            </div>
            <div className="field-group flex2">
              <label> City </label>
              <select>
                <option>Select City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <span className="spanError">{props.errors.city}</span>
            </div>
            <div className="field-group flex2">
              <label> Zip Code/Postal Code </label>
              <input
                type="number"
                className="form-control"
                placeholder="Zip Code/Postal Code"
                name="compaign"
              />
              <span className="spanError">{props.errors.zipcode}</span>
            </div>
            <div className="field-group flexFull">
              <label>Street Address </label>
              <input
                type="text"
                className="form-control"
                placeholder="Street Address"
                name="Address"
              />
              <span className="spanError">{props.errors.address}</span>
            </div>
           
            <div className="field-group flexFull">
              <label> Create Campaign </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Campaign"
                name="compaign"
                value={props.addContactData.compaign}
                onChange={props.onChange}
              />
              <span className="spanError">{props.errors.compaign}</span>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Dismiss
          </Button>
          <LoadingButton
            loadingPosition="center"
            loading={props.loading}
            onClick={props.handleSubmit}
            className="btn btn-primary"
            variant="contained"
          >
            Add Contact
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactModal;
