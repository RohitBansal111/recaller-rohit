import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteContactModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showDeleteContactModal}
        onHide={props.handleCloseDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">
            <b>{props.selectedItems} Contact</b> will be removed. This cannot be undone.
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseDeleteModal}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.handleDeleteContact}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteContactModal;
