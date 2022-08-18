import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import makeAnimated from "react-select/animated";

const ChangePasswordModal = (props) => {
  console.log(props, "showpasss");
  return (
    <Modal
      className="normal-modal"
      show={props.showPassword}
      onHide={props.handlePasswordClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="main-form">
          <div className="field-group flexFull">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter New Password"
              name="newPassword"
              value={props.addUser && props.addUser.newPassword}
              onChange={props.handleChange}
            />
            <span className="spanError">{props.errors.newPassword}</span>
          </div>
          <div className="field-group flexFull">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              value={props.addUser && props.addUser.confirmPassword}
              onChange={props.handleChange}
            />
            <span className="spanError">{props.errors.confirmPassword}</span>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="flexFull footer-modal-btn">
          <Button
            variant="secondary"
            className="btn-cancel"
            onClick={props.handlePasswordClose}
          >
            Dismiss
          </Button>
          <Button
            className="btn btn-primary"
            variant="contained"
            onClick={props.changePassword}
          >
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
