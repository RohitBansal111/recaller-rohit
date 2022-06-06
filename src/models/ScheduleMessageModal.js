import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import makeAnimated from "react-select/animated";

const ScheduleMessageModal = (props) => {
  const toDay = new Date().toISOString().substring(0, 10);
  var today = new Date();
  const curTime = today.getHours() + ":" + today.getMinutes();

  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showScheduleModal}
        onHide={props.handleCloseSchedultModal}
      >
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
                name="date"
                defaultValue={toDay}
                value={props.dateSelected.date}
                onChange={props.handleDateChange}
              ></input>
            </div>
            <div className="field-group flex2">
              <label>Time*</label>
              <input
                type="time"
                className="form-control"
                placeholder="Enter name"
                name="time"
                defaultValue={curTime}
                value={props.dateSelected.time}
                onChange={props.handleDateChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseSchedultModal}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.handleSubmit}>
            Set Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScheduleMessageModal;
