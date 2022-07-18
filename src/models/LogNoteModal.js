import React from "react";
import { Button, Modal } from "react-bootstrap";

const LogNoteModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showLogModal}
        onHide={props.handleCloseNoteModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="main-form">
            <div className="field-group flexFull">
              <label>Notes *</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter your note here.."
                name="notes"
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseNoteModal}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.handleLogNote}>
            Log Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogNoteModal;
