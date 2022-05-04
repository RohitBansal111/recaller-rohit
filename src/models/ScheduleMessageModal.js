import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const ScheduleMessageModal = (props) => {
  const handleSubmit = () => {}
  return (
    <>
      <Modal className="normal-modal" show={props.showScheduleModal} onHide={props.handleCloseSchedultModal}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="main-form">
                <div className="field-group flex2">
                    <label>Date*</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Enter email"
                        name="name"
                    />
                </div>
                <div className="field-group flex2">
                    <label>Time*</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Enter name"
                        name="phone"
                    />
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseSchedultModal}>
                Dismiss
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Set Schedule
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default ScheduleMessageModal;
