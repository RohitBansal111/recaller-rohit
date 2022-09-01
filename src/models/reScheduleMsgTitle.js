import React from "react";
import { Button, Modal } from "react-bootstrap";

const ReScheduleTitleModal = (props) => {
  const toDay = new Date().toISOString().substring(0, 10);
  var today = new Date();
  const curTime = today.getHours() + ":" + today.getMinutes();

  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showReScheduleTitleModal}
        onHide={props.handleCloseReSchedulTitle}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Message</Modal.Title>
        </Modal.Header>

        <>
          <Modal.Body>
            <form className="main-form">
              <div className="field-group flex2">
                <label>Date*</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter email"
                  name="date"
                  value={props.reScheduleTitle.date}
                  onChange={props.handleReSchaduleTChange}
                ></input>
              </div>
              <div className="field-group flex2">
                <label>Time*</label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Enter name"
                  name="time"
                  value={props.reScheduleTitle.time}
                  onChange={props.handleReSchaduleTChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={props.handleCloseReSchedulTitle}
            >
              Dismiss
            </Button>
            <Button
              variant="primary"
              onClick={props.handleDeleteRechaduletitleM}
            >
              Cancel Message
            </Button>
            <Button variant="primary" onClick={props.handleReTitleSubmit}>
              Reschedule
            </Button>
          </Modal.Footer>
        </>
      </Modal>
    </>
  );
};

export default ReScheduleTitleModal;
