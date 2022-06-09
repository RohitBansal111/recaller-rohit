import React from "react";
import { Button, Modal } from "react-bootstrap";

const ReScheduleMessageModal = (props) => {
  const toDay = new Date().toISOString().substring(0, 10);
  var today = new Date();
  const curTime = today.getHours() + ":" + today.getMinutes();

  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showReScheduleModal}
        onHide={props.handleCloseReSchedultModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Message</Modal.Title>
        </Modal.Header>
        {props.cancelRescheDule ? (
          <>
            <Modal.Body>
              <h2 className="text-center">
                Are you sure you want to cancel this scheduled message?
              </h2>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={props.handleNoReSchedultModal}
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  onClick={props.handleDeleteReSchedultModal}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </>
        ) : (
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
                    // defaultValue={toDay}
                    value={props.reScheduleData.date}
                    onChange={props.handleReSchaduleChange}
                  ></input>
                </div>
                <div className="field-group flex2">
                  <label>Time*</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Enter name"
                    name="time"
                    // defaultValue={curTime}
                    value={props.reScheduleData.time}
                    onChange={props.handleReSchaduleChange}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={props.handleCloseReSchedultModal}
              >
                Dismiss
              </Button>
              <Button
                variant="primary"
                onClick={
                  props.schaduleData
                    ? props.handleDeleteRechaduletitle
                    : props.handleCancelReSchedultModal
                }
              >
                Cancel Message
              </Button>
              <Button variant="primary" onClick={props.handleReSubmit}>
                Reschedule
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default ReScheduleMessageModal;
