import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import NewVoiceSelectTag from "../components/voice/newVoiceSelectTags";
import MicIcon from "@material-ui/icons/Mic";
import LoadingButton from "@mui/lab/LoadingButton";
import LoaderIcon from "../assets/svg-icons/loaderIcon";

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
            <NewVoiceSelectTag
              onChange={props.handleSelectChange}
              isMulti
              options={props.options}
              value={props.selected}
            />
          </div>
          <div className="field-group flexFull">
            <label>Voice Recording</label>
            <div class="voice-recorder-box">
              <div class="recording-left">
                <span></span>{" "}
                <h4>
                  {props.minute}:{props.second}
                </h4>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (!props.isNewVoiceActive) {
                    props.startRecording();
                  } else {
                    props.stopRecording();
                  }
                  props.setIsNewVoiceActive(!props.isNewVoiceActive);
                }}
              >
                <MicIcon className="mr-2" />
                {props.second > 0 ? "Stop" : "Press & Recording "}
              </button>
              {/* {props.isNewVoiceActive && (
                <div className="uploadfileAudio">
                  <LoaderIcon />
                </div>
              )} */}
            </div>
          </div>
          <div className="field-group flexFull text-center mt-3">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={() => handleCloseMessageModal()}
            >
              Dismiss
            </button>
            <LoadingButton
              type="button"
              loadingPosition="center"
              loading={props.loading}
              onClick={props.handleSendClick}
              className="btn btn-primary"
              variant="contained"
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VoiceModal;
