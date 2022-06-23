import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import NewMessageSelectTag from "./newMessageSelectTag";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ScheduleMessageModal from "../../models/ScheduleMessageModal";
import CreateTemplateModal from "../../models/CreateTemplateModal";
import ManageTemplateModal from "../../models/ManageTemplateModal";
import Picker from "emoji-picker-react";
import CodeIcon from "@material-ui/icons/Code";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@mui/icons-material/Close";

const MessageModal = ({ open, handleCloseMessageModal, ...props }) => {
  return (
    <Modal open={open} onClose={handleCloseMessageModal} center>
      <div className="modal-header">
        <h3>
          {props.selected.length > 1 ? "New Bulk Message" : "New Message"}
        </h3>
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
                      <TableCell> {props.sendNewMessage}</TableCell>
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
              onClick={props.handleSendClick}
              className="btn btn-primary"
              variant="contained"
            >
              Send
            </LoadingButton>
          </div>
        </div>
      ) : (
        <div className="modal-body bulkms">
          <form className="main-form">
            <div className="field-group flexFull">
              <label>Enter Contact Name</label>
              <NewMessageSelectTag
                onChange={props.handleSelectChange}
                isMulti
                options={props.options}
                value={props.selected}
              />
              <span className="spanError">{props.errors.selected}</span>
            </div>
            <div className="field-group messageBoxModal flexFull">
              <label>Message</label>
              <div className="imgshowpopup">
                {props.selectedNewImageData != null && (
                  <ul className="attachedImageGallery">
                    <li>
                      <img
                        alt=" "
                        src={props.selectedNewImageData}
                      />
                      <button
                        type="button"
                        className="btn btn-cross"
                        onClick={props.handleNewImageCancel}
                      >
                        <CancelIcon />
                      </button>
                    </li>
                  </ul>
                )}
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
                      {props.templateData.length == 0 ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={props.handleManageTemplate}
                        >
                          Manage
                        </button>
                      )}
                    </h4>
                    {props.templateData &&
                      props.templateData.map((item) => (
                        <li onClick={() => props.handleTempTitleClick(item)}>
                          {item.title}
                        </li>
                      ))}
                    <button
                      type="button"
                      className="create-tem"
                      onClick={props.handleCreateTemplate}
                    >
                      + Create Message Template
                    </button>
                  </ul>
                </li>
                <li>
                  <>
                    <button
                      type="button"
                      className="btn-action1"
                      onClick={props.handleEmojiOpen}
                    >
                      {props.onShowEmojiOpen == false && <EmojiEmotionsIcon />}
                    </button>
                    {props.onShowEmojiOpen && (
                      <Picker onEmojiClick={props.onEmojiClick} />
                    )}
                    {props.onShowEmojiOpen && (
                      <div className="emoji-cancel-button">
                        <button
                          type="button"
                          className="btn-action1"
                          onClick={props.CancelEmoji}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    )}
                  </>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-action1 fileType"
                    onClick={props.handleImageOpen}
                  >
                    <ImageIcon />
                    <input
                      type="file"
                      name="myImage"
                      ref={props.imgref}
                      onChange={props.handleImageChange}
                    />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    id="dropdownMenuButton4"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="btn-action1 dropdown-toggle"
                  >
                    <CodeIcon />
                  </button>
                  <ul
                    className="dropdown-menu insert-contact-field"
                    aria-labelledby="dropdownMenuButton3"
                  >
                    <h4> Insert Contact Field </h4>
                    <ul>
                      <li
                        data-name={"[Customer First Name]"}
                        onClick={props.savelistToMessageClick}
                      >
                        [Customer First Name]
                      </li>
                      <li
                        data-name={"[Customer Full Name]"}
                        onClick={props.savelistToMessageClick}
                      >
                        [Customer Full Name]
                      </li>
                    </ul>
                  </ul>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-action1"
                    onClick={props.handleScheduleModal}
                  >
                    <ScheduleIcon />
                  </button>
                </li>
                <span
                  className="scheduleData-text"
                  onClick={() =>
                    props.handleReSchaduleData(props.scheduledData)
                  }
                >
                  {props.scheduledData &&
                  props.scheduledData.date &&
                  props.scheduledData.time
                    ? `(${
                        props.scheduledData.date +
                        " " +
                        props.scheduledData.time
                      })`
                    : " "}
                </span>
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
                  disabled={!props.sendNewMessage ? true : false}
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
                style={{
                  cursor:
                    props.sendNewMessage == 0 || props.selected.length == 0
                      ? "not-allowed"
                      : "pointer",
                }}
                disabled={
                  !props.sendNewMessage || props.selected.length == 0
                    ? true
                    : false
                }
                onClick={props.handleSendClick}
                className="btn btn-primary"
                variant="contained"
              >
                Send
              </LoadingButton>
            </div>
          </form>
          <ScheduleMessageModal
            showScheduleModal={props.showScheduleModal}
            handleCloseSchedultModal={props.handleCloseSchedultModal}
            dateSelected={props.dateSelected}
            handleDateChange={props.handleDateChange}
            handleSubmit={props.handleScheduleSubmit}
          />
          <ManageTemplateModal
            showManageeTemplateModal={props.showManageeTemplateModal}
            handleCloseManageTemplateModal={
              props.handleCloseManageTemplateModal
            }
            handleCreateTemplate={props.handleCreateTemplate}
            templateData={props.templateData}
            handleTempShowClick={props.handleTempShowClick}
            templateDataState={props.templateDataState}
            handleTempInsert={props.handleTempInsert}
            handleEditTemplate={props.handleEditTemplate}
            editmanageTemplate={props.editmanageTemplate}
            handleTempEditCancel={props.handleTempEditCancel}
            editTempData={props.editTempData}
            handleEditTempChange={props.handleEditTempChange}
            handleTempEditSave={props.handleTempEditSave}
            templateTags={props.templateTags}
            handleTemplateTagChange={props.handleTemplateTagChange}
            handleTempDelModal={props.handleTempDelModal}
            handleTempRemove={props.handleTempRemove}
            handleEditTemplateTagChange={props.handleEditTemplateTagChange}
            templateEditTags={props.templateEditTags}
            editTempMessageData={props.editTempMessageData}
            handleEditMessageTempChange={props.handleEditMessageTempChange}
            searchValue={props.searchValue}
            handleSearchChange={props.handleSearchChange}
            replacefunc={props.replacefunc}
            handleCloseDeleteTempModal={props.handleCloseDeleteTempModal}
            showDeleteTempModal={props.showDeleteTempModal}
            selecteduser={props.selecteduser}
          />
          <CreateTemplateModal
            showCreateTemplateModal={props.showCreateTemplateModal}
            handleCloseCreateTemplateModal={
              props.handleCloseCreateTemplateModal
            }
            templateName={props.templateName}
            handleTemplateName={props.handleTemplateName}
            templateTags={props.templateTags}
            handleTemplateTagChange={props.handleTemplateTagChange}
            templateMessage={props.templateMessage}
            handleTempMessageChange={props.handleTempMessageChange}
            handleTemplateSubmit={props.handleTemplateSubmit}
            errors={props.errors}
            loading={props.loading}
          />
        </div>
      )}
    </Modal>
  );
};

export default MessageModal;
