import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import NewEmailSelectTag from "../components/email/newEmailSelectTag";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CreateTemplateModal from "./CreateTemplateModal";
import ManageTemplateModal from "./ManageTemplateModal";
import ScheduleMessageModal from "./ScheduleMessageModal";


const options = [
  { value: "john.carter@gmail.comn", label: "john.carter@gmail.comn" },
  { value: "angelia.baith@gmail.com", label: "angelia.baith@gmail.com" },
  { value: "vihan.honki@gmail.com", label: "vihan.honki@gmail.com" },
];

const EmailModal = ({ open, handleCloseMessageModal, ...props }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false)
  const [showManageeTemplateModal, setShowManageeTemplateModal] = useState(false)

  const handleScheduleModal = () => setShowScheduleModal(true)
  const handleCloseSchedultModal = () => setShowScheduleModal(false)
  const handleCreateTemplate = () => setShowCreateTemplateModal(true)
  const handleCloseCreateTemplateModal = () => setShowCreateTemplateModal(false)
  const handleManageTemplate = () =>  setShowManageeTemplateModal(true)
  const handleCloseManageTemplateModal = () => handleCloseManageTemplateModal(false)
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
            <LoadingButton
              type="button"
              loadingPosition="center"
              loading={props.loading}
              onClick={props.sendMessageClick}
              className="btn btn-primary"
              variant="contained"
            >
              Send
            </LoadingButton>
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
            <div className="field-group messageBoxModal flexFull">
              <label>Message</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Type your message"
                name="emailMessage"
                value={props.emailMessage}
                onChange={props.handleMessageChange}
              />
              <ul className="action-icons">
                <li>
                  <button
                    type="button"
                    id="dropdownMenuButton3"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="btn-action1 dropdown-toggle"
                  >
                    <PostAddIcon />
                  </button>
                  <ul
                    className="dropdown-menu inset-template-popup"
                    aria-labelledby="dropdownMenuButton3"
                  >
                    <h4>
                      Message Templates{" "}
                      <button
                        type="button"
                        onClick={handleManageTemplate}
                      >
                        Manage
                      </button>
                    </h4>
                    <li>Followup SMS</li>
                    {props.templateDataTitle &&
                      props.templateDataTitle.map((item) => (
                        <li>{item.title}</li>
                      ))}
                    <button
                      type="button"
                      className="create-tem"
                      onClick={handleCreateTemplate}
                    >
                      + Create Message Template
                    </button>
                  </ul>
                </li>
                <li>
                  <button type="button" className="btn-action1">
                    <EmojiEmotionsIcon />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-action1 fileType"
                  >
                    <ImageIcon />
                    <input type="file" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-action1"
                    onClick={handleScheduleModal}
                  >
                    <ScheduleIcon />
                  </button>
                </li>
              </ul>
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
              <LoadingButton
                type="button"
                loadingPosition="center"
                loading={props.loading}
                style={{ cursor: props.emailMessage == 0 ? "not-allowed" : "pointer" }}
                disabled={!props.emailMessage ? true : false}
                onClick={props.sendMessageClick}
                className="btn btn-primary"
                variant="contained"
              >
                Send
              </LoadingButton>
            </div>
          </form>
          <ScheduleMessageModal
            showScheduleModal={showScheduleModal}
            handleCloseSchedultModal={handleCloseSchedultModal}
          />
          <ManageTemplateModal
            showManageeTemplateModal={showManageeTemplateModal}
            handleCloseManageTemplateModal={handleCloseManageTemplateModal}
          />
          <CreateTemplateModal
            showCreateTemplateModal={showCreateTemplateModal}
            handleCloseCreateTemplateModal={handleCloseCreateTemplateModal}
          />
        </div>
      )}
    </Modal>
  );
};

export default EmailModal;
