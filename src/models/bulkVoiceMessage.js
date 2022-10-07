import React from "react";
import { Modal } from "react-responsive-modal";
import NewVoiceSelectTag from "../components/voice/newVoiceSelectTags";
import LoadingButton from "@mui/lab/LoadingButton";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { MdClose } from "react-icons/md";
import { Button } from "react-bootstrap";
import MicIcon from "@material-ui/icons/Mic";

const BulkVoiceMessage = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal
      open={props.bulkOpen}
      onClose={props.handleCloseBulkModal}
      center
      classNames="upload-voice"
      closeOnOverlayClick={false}
    >
      <div className="modal-header">
        <h3>Bulk Campaign Voice Mail</h3>
      </div>

      <div className="modal-body upload-voicemodal">
        <form className="main-form">
          <div className="field-group flexFull">
            <label>Enter Contact Voice</label>
            <NewVoiceSelectTag
              onChange={props.handleBulkSelectChange}
              options={props.options}
              value={props.selected}
            />
          </div>
          <span className="spanError">{props.errors.bulkSelected}</span>
        </form>
        <div className="field-group flexFull text-left mt-3">
          <Button
            variant="primary"
            className="btn btn me-3"
            style={{ marginBottom: " 15px" }}
            onClick={props.handleOpenUploadModal}
          >
            Upload File
          </Button>
          <Button
            variant="primary"
            style={{ marginBottom: " 15px" }}
            onClick={props.handleNewMessage}
          >
            Record Voice
          </Button>
        </div>

        {props.uploadOpen == true && (
          <>
            {" "}
            <div className="voice-record-upload">
              <div className="upload-voice-recording bulk-upload">
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
              <Button className="cl-icon" onClick={props.clearUploadInput}>
                <MdClose />
              </Button>
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
          </>
        )}
        {props.openMessageModal == true && (
          <div className="field-group flexFull">
            <div className="voice-recorder-box extra">
              <div className="recording-left">
                <>
                  <span></span>
                  <h4>
                    {props.minute}:{props.second}
                  </h4>
                </>
                {props.second > 0 ? (
                  <button
                    type="button"
                    className="remove-recording-action"
                    onClick={props.stopTimer}
                  >
                    ×
                  </button>
                ) : (
                  ""
                )}
              </div>
              <button
                type="button"
                className={`btn-primary-voice-inbuild ${
                  props.isNewVoiceActive === props.isNewVoiceActive
                    ? " active"
                    : ""
                } 
                    
                    ${
                      props.isNewVoiceActive === true
                        ? "btn-primary-voice-individual"
                        : ""
                    }
                    `}
                onClick={() => {
                  if (!props.isNewVoiceActive && props.second > 0) {
                    props.handlePlay();
                    return;
                  } else if (!props.isNewVoiceActive) {
                    props.startRecording();
                  } else {
                    props.stopRecording();
                  }
                  props.setIsNewVoiceActive(!props.isNewVoiceActive);
                }}
              >
                <MicIcon className="mr-2" />
                {props.isNewVoiceActive == true
                  ? "Stop"
                  : props.second == 0
                  ? "Press & Record"
                  : props.isNewVoiceActive == false
                  ? "Play"
                  : "Press & Record"}
              </button>
            </div>
            <button
              type="button"
              className="remove-recording-action"
              onClick={props.clearRecording}
            >
              <MdClose />
            </button>
          </div>
        )}

        <div className="field-group flexFull text-center mt-3">
          <button
            type="button"
            className="btn btn-cancel me-3"
            onClick={props.handleCloseBulkModal}
          >
            Dismiss
          </button>
          {props.fileName && props.fileName.name ? (
            <LoadingButton
              type="button"
              loadingPosition="center"
              loading={props.loading}
              onClick={props.onVoiveUpload}
              className="btn btn-primary"
              variant="contained"
            >
              Send
            </LoadingButton>
          ) : (
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
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BulkVoiceMessage;
