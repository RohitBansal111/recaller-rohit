import React from "react";
import { Button, Modal } from "react-bootstrap";

const Addcompaign = (props) => {
  console.log(props, "props");
  return (
    <Modal
      className="normal-modal Addcompaign"
      show={props.showAddCompaign}
      onHide={props.handleCompaignClose}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>
          <b>Add Compaign</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="field-group flexFull">
          <label> Compaign Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter compaign Name"
            name="compaignName"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleCompaignClose} variant="secondary">
          Dismiss
        </Button>
        <Button type="button" variant="primary">
          Add Name
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Addcompaign;
