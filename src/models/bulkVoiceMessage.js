import React from "react";
import { Modal } from "react-responsive-modal";
import NewVoiceSelectTag from "../components/voice/newVoiceSelectTags";
import LoadingButton from "@mui/lab/LoadingButton";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { MdClose } from "react-icons/md";
import { Button } from "react-bootstrap";
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
        <h3>Bulk Voice</h3>
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
          {/* <span className="spanError">{props.errors.selected}</span> */}
        </form>
        <div className="field-group flexFull text-left mt-3">
          <Button variant="primary" onClick={props.handleOpenUploadModal}>
            Upload File
          </Button>
          <Button variant="primary" onClick={props.handleNewMessage}>
            Record Voice
          </Button>
        </div>
        <div className="field-group flexFull text-center mt-3">
          <button
            type="button"
            className="btn btn-cancel me-3"
            onClick={props.handleCloseBulkModal}
          >
            Dismiss
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkVoiceMessage;
