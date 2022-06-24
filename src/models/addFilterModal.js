import { Input } from "@mui/material";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteFilterModal = (props) => {
  return (
    <>
      <Modal
        className="normal-modal"
        show={props.showAddFilterModal}
        onHide={props.handleCloseAddFilterModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Save Filter</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="field-group flexFull">
            <label> Filter Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Filter Name"
              name="filterName"
              value={props.filterName}
              onChange={props.onFilterNameChange}
            />
          </div>
          <span className="spanError">{props.errors.filterName}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseAddFilterModal}>
            Dismiss
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={props.handleAddFilterData}
          >
            Add Name
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteFilterModal;
