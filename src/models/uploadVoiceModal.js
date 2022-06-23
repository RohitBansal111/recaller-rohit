import React from "react";
import { Modal } from "react-responsive-modal";
import NewVoiceSelectTag from "../components/voice/newVoiceSelectTags";
import LoadingButton from "@mui/lab/LoadingButton";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { MdClose } from "react-icons/md";
const VoiceUploadModal = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal
      open={props.uploadOpen}
      onClose={props.handleCloseUploadModal}
      center
      classNames="upload-voice"
      closeOnOverlayClick={false}
    >
      <div className="modal-header">
        <h3>Upload Voice</h3>
      </div>

      <div className="modal-body upload-voicemodal">
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
              ref={props.voiceref}
              accept="audio/*"
              name="file"
              onChange={props.onVoiceUploadChange}
            />
            <span>
              <>
                <LibraryMusicIcon /> Upload Voice Recording
              </>
            </span>
          </div>
          <div className="voice-file">
            <span>{props.fileName ? props.fileName.name : ""}</span>
            {props.fileName ? (
              <button
                type="button"
                className="remove-recording-action"
                onClick={props.clearUploading}
              >
                <MdClose />
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="field-group flexFull text-center mt-3">
            <button
              type="button"
              className="btn btn-cancel me-3"
              onClick={props.handleCloseUploadModal}
            >
              Dismiss
            </button>
            <LoadingButton
              type="button"
              loadingPosition="center"
              loading={props.loading}
              className="btn btn-primary"
              onClick={props.onVoiveUpload}
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default VoiceUploadModal;
