import React from "react";
import { Modal } from "react-responsive-modal";
import NewVoiceSelectTag from "../components/voice/newVoiceSelectTags";
import LoadingButton from "@mui/lab/LoadingButton";

const VoiceUploadModal = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal
      open={props.uploadOpen}
      onClose={props.handleCloseUploadModal}
      center
    >
      <div className="modal-header">
        <h3>Upload Voice</h3>
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
          <span className="spanError">{props.errors.selected}</span>
          <div className="upload-voice-recording">
            <input
              className="inputFile"
              type="file"
              accept="audio/*"
              name="file"
              onChange={props.onVoiceUploadChange}
            />
            <span>
              {props.fileName ? props.fileName.name : "Upload Voice Recording"}
            </span>
          </div>
          <LoadingButton
            type="button"
            loadingPosition="center"
            loading={props.loading}
            className="btn btn-primary"
            onClick={props.onVoiveUpload}
          >
            Send
          </LoadingButton>
        </form>
      </div>
    </Modal>
  );
};

export default VoiceUploadModal;
