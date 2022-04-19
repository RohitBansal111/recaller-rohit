import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import NewMessageSelectTag from "./newMessageSelectTag";

const options = [
  { value: "John Carter", label: "John Carter" },
  { value: "Anglina Baith", label: "Anglina Baith" },
  { value: "Vihaan Honki", label: "Vihaan Honki" },
];

const MessageModal = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseMessageModal} center>
      <div className="modal-header">
        <h3>
          {props.selected.length > 1 ? "New Bulk Message" : "New Message"}
        </h3>
      </div>
      <div className="modal-body">
        <form className="main-form">
          <div className="field-group flexFull">
            <label>Enter Contact Name</label>
            <NewMessageSelectTag
              onChange={props.handleSelectChange}
              isMulti
              options={props.options}
              value={props.selected}
            />
          </div>
          <div className="field-group flexFull">
            <label>Message</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Type your message"
              name="name"
              value={props.sendNewMessage}
              onChange={props.handleNewMChange}
            >
              {props.sendNewMessage}
            </textarea>
          </div>
          <div className="field-group flexFull text-center mt-3">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={() => handleCloseMessageModal()}
            >
              {" "}
              Dismiss{" "}
            </button>
            {props.selected.length > 1 ? (
              <button
                type="button"
                disabled={!props.sendNewMessage ? true : false}
                className="btn btn-cancel me-3"
              >
                Preview
              </button>
            ) : (
              ""
            )}
            <button
              type="button"
              className="btn btn-primary"
              disabled={!props.sendNewMessage ? true : false}
              onClick={props.handleSendClick}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MessageModal;
