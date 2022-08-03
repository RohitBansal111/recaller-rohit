import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const Addcompaign = (props) => {
  return (
    <Modal
      className="normal-modal Addcompaign"
      show={props.showAddCompaign}
      onHide={props.handleCompaignClose}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>
          {/* <b>Add Compaign</b> */}
          {props.editCompaign == true ? "Edit Compaign" : "Add Compaign"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="field-group flexFull">
          <label>
            {" "}
            {props.editCompaign == true
              ? "Change Compaign Name"
              : "Compaign Name"}{" "}
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter Campaign Name"
            value={props.data.name}
            onChange={props.handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleCompaignClose} variant="secondary">
          Dismiss
        </Button>
        <Button
          type="submit"
          variant="primary"
          value={props.data.name}
          onClick={props.handleCompaignClose}
          onClick={
            props.editCompaign == true ? props.handleEdit : props.handleSubmit
          }
        >
          {props.editCompaign == true ? "Edit Compaign" : "Add Compaign"}
        </Button>
        <span className="spanError">{props.errors.name}</span>
      </Modal.Footer>
    </Modal>
  );
};

export default Addcompaign;
