import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteTagsModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showDeleteTagModal}
        onHide={props.handleCloseDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">
            Are you sure you want to delete this tag?
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseDeleteModal}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.handleDeleteTagsData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTagsModal;
