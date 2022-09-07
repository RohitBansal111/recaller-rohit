import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
const label = { inputProps: { "aria-label": "Switch demo" } };

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
          {props.editCompaign == true ? (
            <span className="switch-button">
              <Switch
                checked={props.data.toggle == false ? false : true}
                value={props.data.toggle == false ? false : true}
                {...label}
                name="toggle"
                onChange={props.handleChange}
                // onChange={props.handleChange}
              />
            </span>
          ) : (
            ""
          )}
        </Modal.Title>
        <div className="field-group flexFull">
          <label>
            {/* {props.editCompaign == true ? (
              <input id="checkbox" name="checkbox" type="checkbox" />
            ) : (
              ""
            )} */}
          </label>
        </div>
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
            placeholder={"Enter Campaign Name"}
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
          onClick={
            props.editCompaign == true ? props.handleEdit : props.handleSubmit
          }
          disabled={!props.data.name}
        >
          {props.editCompaign == true ? "Edit Compaign" : "Add Compaign"}
        </Button>
        <span className="spanError">{props.errors.name}</span>
      </Modal.Footer>
    </Modal>
  );
};

export default Addcompaign;
