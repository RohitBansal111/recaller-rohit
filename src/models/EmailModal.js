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
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import NewEmailSelectTag from "../components/email/newEmailSelectTag";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CreateTemplateModal from "./CreateTemplateModal";
import ManageTemplateModal from "./ManageTemplateModal";
import ScheduleMessageModal from "./ScheduleMessageModal";
import Picker from "emoji-picker-react";
import CodeIcon from "@material-ui/icons/Code";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import CloseIcon from "@mui/icons-material/Close";

const EmailModal = ({ open, handleCloseMessageModal, ...props }) => {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("ckImage", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            const AUTH_TOKEN = localStorage.getItem("token");
            fetch(`${process.env.REACT_APP_API_URL}/email/ckImageUpload`, {
              method: "post",
              headers: {
                Authorization: `${AUTH_TOKEN}`, // notice the Bearer before your token
              },
              body: body,
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: res.url,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <Modal
      open={open}
      onClose={handleCloseMessageModal}
      center
      closeOnOverlayClick={false}
    >
      {props.preview ? (
        <>
          <div className="modal-header">
            <h3>New Bulk Email</h3>
          </div>
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
                        <TableCell> {parse(props.emailMessage)}</TableCell>
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
        </>
      ) : (
        <>
          <div className="modal-header">
            <h3>New Email</h3>
          </div>
          <div className="modal-body bulkms">
            <form className="main-form">
              <div className="field-group flexFull">
                <label>Enter Contact Email</label>
                <NewEmailSelectTag
                  onChange={props.handleSelectChange}
                  isMulti
                  options={props.options}
                  value={props.selected}
                />
                <span className="spanError">{props.errors.emailSubject}</span>
              </div>
              <div className="field-group flexFull">
                <label>Email Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Subject"
                  name="subject"
                  value={props.emailSubject}
                  onChange={props.handleSubjectChange}
                />
                <span className="spanError">{props.errors.selected}</span>
              </div>
              <div className="field-group messageBoxModal flexFull">
                <label>Message</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={`${props.emailMessage}`}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    props.handleMessageChange(data);
                  }}
                  config={{
                    extraPlugins: [uploadPlugin],
                  }}
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
                          <li
                            onClick={() =>
                              props.handleEmailTempTitleClick(item)
                            }
                          >
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
                        {props.onShowEmojiOpen == false && (
                          <EmojiEmotionsIcon />
                        )}
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
                  {/* <li>
                   <button type="button" className="btn-action1 fileType">
                     <ImageIcon />
                     <input type="file" />
                   </button>
                 </li> */}
                  <li>
                    <button
                      type="button"
                      id="dropdownMenuButton4"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      className="btn-action1 dropdown-toggle"
                    >
                      <CodeIcon></CodeIcon>
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
                  style={{
                    cursor:
                      props.emailMessage == 0 || props.selected.length == 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={
                    !props.emailMessage || props.selected.length == 0
                      ? true
                      : false
                  }
                  onClick={props.sendMessageClick}
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
              searchTemplateValue={props.searchTemplateValue}
              handleSearchTempChange={props.handleSearchTempChange}
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
        </>
      )}
    </Modal>
  );
};

export default EmailModal;
