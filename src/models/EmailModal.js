import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import NewEmailSelectTag from "../components/email/newEmailSelectTag";

const options = [
  { value: "john.carter@gmail.comn", label: "john.carter@gmail.comn" },
  { value: "angelia.baith@gmail.com", label: "angelia.baith@gmail.com" },
  { value: "vihan.honki@gmail.com", label: "vihan.honki@gmail.com" },
];

const EmailModal = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseMessageModal} center>
      <div className="modal-header">
        <h3>New Email</h3>
      </div>
      {props.preview ? (
        <div
          className="tags-data-table common-data-table"
          style={{
            minHeight: 300,
            width: "100%",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Contact</TableCell>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.selected &&
                  props.selected.map((item) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {item.label} <br></br>
                        {item.phone}
                      </TableCell>
                      <TableCell> {props.emailMessage}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="field-group flexFull text-center mt-3">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={props.handleBackMessageModal}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.sendMessageClick}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="modal-body">
          <form className="main-form">
            <div className="field-group flexFull">
              <label>Enter Contact Email</label>
              <NewEmailSelectTag
                onChange={props.handleSelectChange}
                isMulti
                options={props.options}
                value={props.selected}
              />
              <span className="spanError">{props.errors.selected}</span>
            </div>
            <div className="field-group flexFull">
              <label>Message</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Type your message"
                name="emailMessage"
                value={props.emailMessage}
                onChange={props.handleMessageChange}
              />
            </div>

            <div className="field-group flexFull text-center mt-3">
              <button
                type="button"
                className="btn btn-cancel me-3"
                onClick={() => handleCloseMessageModal()}
              >
                Dismiss
              </button>
              {props.selected.length > 1 ? (
                <button
                  type="button"
                  disabled={!props.emailMessage ? true : false}
                  className="btn btn-cancel me-3"
                  onClick={props.handlePreview}
                >
                  Preview
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="btn btn-primary"
                disabled={!props.emailMessage ? true : false}
                onClick={props.sendMessageClick}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default EmailModal;
