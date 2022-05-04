import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const CreateTemplateModal = (props) => {
  const handleSubmit = () => {}
  return (
    <>
      <Modal className="normal-modal" show={props.showCreateTemplateModal} onHide={props.handleCloseCreateTemplateModal}>
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
                        placeholder="Enter email"
                        name="name"
                    />
                    <span className="sort-hint">e.g. Appointment Reminder</span>
                </div>
                <div className="field-group flexFull">
                    <label>Select Dynamic Tag*</label>
                    <select className="form-control">
                        <option>First Name</option>
                        <option>Last Name</option>
                        <option>Full Name</option>
                    </select>
                </div>
                <div className="field-group flexFull">
                    <label>Message*</label>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="[Employee Full Name]"
                        name="message"
                    />
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseCreateTemplateModal}>
                Dismiss
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default CreateTemplateModal;
