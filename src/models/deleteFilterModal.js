import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteFilterModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showDeleteFilterModal}
        onHide={props.handleCloseDeleteFilterModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">
            You want to Delete this Filter?
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseDeleteFilterModal}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.handleDeleteFilter}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteFilterModal;
