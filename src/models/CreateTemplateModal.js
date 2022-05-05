import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const CreateTemplateModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showCreateTemplateModal}
        onHide={props.handleCloseCreateTemplateModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Message Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="main-form">
            <div className="field-group flexFull">
              <label>Template Name*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={props.templateName}
                onChange={props.handleTemplateName}
              />
              <span className="sort-hint">e.g. Appointment Reminder</span>
              <span className="spanError">{props.errors.templateName}</span>
            </div>
            <div className="field-group flexFull">
              <label>Select Dynamic Tag</label>
              <select
                className="form-control"
                name="tempTags"
                value={props.templateTags}
                onChange={props.handleTemplateTagChange}
              >
                <option value={""}></option>
                <option value={"[Employee First Name]"}>
                  [Employee First Name]
                </option>
                <option value={"[Employee Last Name]"}>
                  [Employee Last Name]
                </option>
              </select>
            </div>
            <div className="field-group flexFull">
              <label>Message*</label>
              <textarea
                type="text"
                className="form-control"
                name="message"
                value={props.templateMessage}
                onChange={props.handleTempMessageChange}
              >
                {props.templateMessage}
              </textarea>
              <span className="spanError">{props.errors.templateMessage}</span>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={props.handleCloseCreateTemplateModal}
          >
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.handleTemplateSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTemplateModal;
