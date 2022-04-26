import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import NewVoiceSelectTag from "../components/voice/newVoiceSelectTags";
import MicIcon from "@material-ui/icons/Mic";

const options = [
  { value: "Voice One", label: "Voice One" },
  { value: "Voice Two", label: "Voice Two" },
  { value: "Voice Three", label: "Voice Three" },
];

const VoiceModal = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseMessageModal} center>
      <div className="modal-header">
        <h3>New Voice</h3>
      </div>
      <div className="modal-body">
        <form className="main-form">
          <div className="field-group flexFull">
            <label>Enter Contact Voice</label>
            <NewVoiceSelectTag options={options} />
          </div>
          <div className="field-group flexFull">
            <label>Voice Recording</label>
            <div class="voice-recorder-box">
              <div class="recording-left">
                <span></span> <h4>00:00</h4>
            </div>
            <button type="button" class="btn btn-primary">
              <MicIcon className="mr-2" /> Press & Recording
            </button>
          </div>
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
            <button type="button" className="btn btn-primary">
              {" "}
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VoiceModal;
