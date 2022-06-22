import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DoneIcon from "@material-ui/icons/Done";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useLocation } from "react-router-dom";
import MicIcon from "@material-ui/icons/Mic";
import moment from "moment";
import EmailChatText from "./emailChatText";
import { timeAgo } from "../../helper/timerFuntion";
import EditContactModal from "../../models/editContactModal";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ConversationTagModal from "../conversationTagModal";
import LoadingButton from "@mui/lab/LoadingButton";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import BlockIcon from "@material-ui/icons/Block";
import WifiIcon from "@material-ui/icons/Wifi";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ScheduleMessageModal from "../../models/ScheduleMessageModal";
import { Link } from "react-router-dom";
import CreateTemplateModal from "../../models/CreateTemplateModal";
import ManageTemplateModal from "../../models/ManageTemplateModal";
import Picker from "emoji-picker-react";
import LockIcon from "@material-ui/icons/Lock";
import CancelIcon from "@material-ui/icons/Cancel";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CloseIcon from "@mui/icons-material/Close";
import ReScheduleTitleModal from "../../models/reScheduleMsgTitle";

const EmailChatBoot = (props) => {
  const location = useLocation();

  const userEmailMessageList = () => {
    let filtered = [];
    filtered =
      props.emailMessageList &&
      props.emailMessageList.filter(
        (val) =>
          val.contact.firstName
            .toLowerCase()
            .startsWith(props.searchValue.toLowerCase()) ||
          val.contact.lastName
            .toLowerCase()
            .startsWith(props.searchValue.toLowerCase())
      );
    const chatList = filtered.map((item) => {
      return (
        <li
          className={
            props.selecteduser && props.selecteduser._id == item._id
              ? "active"
              : ""
          }
          onClick={() => props.openChatClick(item._id, true)}
        >
          <h5>
            {item.contact &&
              item.contact.firstName + " " + item.contact.lastName}
            <span>{timeAgo(item.createdAt)}</span>
          </h5>
          <p>{parse(item.message.slice(0, 30).concat("..."))}</p>
          <div className="chat-tag">
            {item.contact.tags.length > 0
              ? item.contact.tags.map((item) => (
                  <p style={{ borderColor: item.color, color: item.color }}>
                    <LocalOfferIcon style={{ color: item.color }} />
                    {item.name}
                  </p>
                ))
              : ""}
          </div>
        </li>
      );
    });
    return chatList;
  };

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
    <div className="chatbox-warpper">
      <div className="inner-chatbox-area">
        <div className="chat-user-list" ref={props.docRef}>
          <div className="chat-list-filter">
            <form className="main-form">
              <div className="field-group flexFull searchField">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter customer name"
                  value={props.searchValue}
                  onChange={props.handleSearchChange}
                />
                <div className="search-field">
                  {props.searchValue && <SearchIcon />}
                </div>
              </div>
            </form>
            <ul className="user-list-main" id="chatBox">
              {userEmailMessageList()}
            </ul>
          </div>
        </div>
        <div className="chat-discussion-area">
          <div className="all-discuss-section">
            <div className="chat-header">
              <h4>
                {" "}
                {props.selecteduser
                  ? props.selecteduser.contact.firstName +
                    " " +
                    props.selecteduser.contact.lastName
                  : ""}
              </h4>
              <div className="header-action">
                <button
                  className="btn btn-more-option dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertIcon />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <li onClick={props.handleMute}>
                    {" "}
                    <NotificationsOffIcon /> Mute
                  </li>
                  <li
                    onClick={() =>
                      props.handleOptOut(
                        props.selecteduser.contact.emailSubs == "opted-in"
                          ? "opted-out"
                          : "opted-in"
                      )
                    }
                  >
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.emailSubs == "opted-in" ? (
                      <WifiOffIcon />
                    ) : (
                      <WifiIcon />
                    )}
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.emailSubs == "opted-in"
                      ? "Opted Out"
                      : "Opted In"}
                  </li>
                  <li onClick={props.handleBlock}>
                    {" "}
                    <BlockIcon /> Block
                  </li>
                </ul>
              </div>
            </div>
            <div className="chat-now">
              <EmailChatText
                emailChatData={props.emailChatData}
                selecteduser={props.selecteduser}
                divRef={props.divRef}
                showReScheduleModal={props.showReScheduleModal}
                handleCloseReSchedultModal={props.handleCloseReSchedultModal}
                reScheduleData={props.reScheduleData}
                handleReSchaduleChange={props.handleReSchaduleChange}
                handleReSchedule={props.handleReSchedule}
                handleReSubmit={props.handleReSubmit}
                handleCancelReSchedultModal={props.handleCancelReSchedultModal}
                cancelRescheDule={props.cancelRescheDule}
                handleNoReSchedultModal={props.handleNoReSchedultModal}
                handleDeleteReSchedultModal={props.handleDeleteReSchedultModal}
              />
            </div>
            {location.pathname === "/voice" && (
              <div className="voice-recorder-box">
                <h4>
                  <span></span> 0.04
                </h4>
                <button type="button" className="btn btn-primary">
                  <MicIcon className="mr-2" /> Press & Recording
                </button>
              </div>
            )}
            {location.pathname === "/text" || location.pathname === "/email" ? (
              <div className="chat-text-editor">
                {props.emailMessageList.length == 0 ? (
                  " "
                ) : (
                  <Tabs
                    defaultActiveKey="all"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="all" title="Message">
                      <div className="chat-textarea">
                        <form className="main-form">
                          <div className="field-group flexFull mb-0">
                            {props.selecteduser &&
                            props.selecteduser.contact &&
                            props.selecteduser.contact.emailSubs ==
                              "opted-out" ? (
                              <div className="closed-conversation-section">
                                <div className="card-box">
                                  <LockIcon />
                                  <p>
                                    This Conversation is <b>Opted Out.</b>{" "}
                                    &nbsp;
                                    <b>
                                      <u
                                        onClick={() =>
                                          props.handleOptOut(
                                            props.selecteduser.contact
                                              .emailSubs == "opted-in"
                                              ? "opted-out"
                                              : "opted-in"
                                          )
                                        }
                                      >
                                        Opted In
                                      </u>
                                    </b>{" "}
                                    to send messages.{" "}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="attachedImage-box email-emailEditor">
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={`${props.sendEmailMessage}`}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    props.onHandleChange(data);
                                  }}
                                  config={{
                                    extraPlugins: [uploadPlugin],
                                  }}
                                  editorLoaded={props.editorLoaded}
                                />
                              </div>
                            )}
                          </div>
                          <div className="field-group btn-groups flexFull">
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
                                    onClick={props.handleChatBotEmojiOpen}
                                  >
                                    {props.onShowChatBotEmojiOpen == false && (
                                      <EmojiEmotionsIcon />
                                    )}
                                  </button>
                                  {props.onShowChatBotEmojiOpen && (
                                    <Picker
                                      onEmojiClick={props.onChatBotEmojiClick}
                                    />
                                  )}
                                  {props.onShowChatBotEmojiOpen && (
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
                                <button
                                  type="button"
                                  className="btn-action1 fileType"
                                  onClick={props.handleImageOpen}
                                >
                                  <ImageIcon />
                                  <input
                                    type="file"
                                    name="myImage"
                                    onChange={props.handleImageChange}
                                  />
                                </button>
                              </li> */}
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
                                  props.handleReSchaduleData(
                                    props.scheduledData
                                  )
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
                            <LoadingButton
                              type="button"
                              loadingPosition="center"
                              loading={props.loading}
                              style={{
                                cursor:
                                  props.sendEmailMessage == 0
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                              disabled={!props.sendEmailMessage ? true : false}
                              onClick={props.onHandleClick}
                              className="btn-primary-outline"
                              variant="outlined"
                            >
                              Send
                            </LoadingButton>
                          </div>
                        </form>
                      </div>
                    </Tab>
                    <Tab eventKey="filter" title="Internal Note">
                      <div className="chat-textarea">
                        <form className="main-form">
                          <div className="field-group flexFull">
                            <textarea
                              placeholder="Type your note, only you and your teammates will see it."
                              name="sendInternalMessage"
                            ></textarea>
                          </div>
                          <div className="field-group btn-groups flexFull">
                            <ul className="action-icons">
                              <li>
                                <button type="button" className="btn-action1">
                                  <EmojiEmotionsIcon />
                                </button>
                              </li>
                            </ul>
                            <button
                              type="button"
                              className="btn-primary-outline"
                            >
                              Add Note
                            </button>
                          </div>
                        </form>
                      </div>
                    </Tab>
                  </Tabs>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="chat-compassion-area">
          <div className="user-compassion-details">
            <div className="user-name-head">
              {/* {!props.editContactName && ( */}
              <>
                <h4>
                  {props.selecteduser
                    ? props.selecteduser.contact.firstName +
                      " " +
                      props.selecteduser.contact.lastName
                    : ""}
                </h4>
                {/* <EditIcon
                    onClick={() =>
                      props.handleEditUserName(props.selecteduser.contact._id)
                    }
                  /> */}
              </>
              {/* )} */}

              {/* {props.editContactName && (
                <>
                  <div className="multi-inputs">
                    <input
                      type="text"
                      name="firstName"
                      value={props.editCName.firstName}
                      className="user-edit-field"
                      onChange={props.handleUserNameEdit}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={props.editCName.lastName}
                      className="user-edit-field"
                      onChange={props.handleUserNameEdit}
                    />
                  </div>
                </>
              )} */}
            </div>
            <ul className="personal-info">
              {props.selecteduser &&
              props.selecteduser.contact &&
              props.selecteduser.contact.phone ? (
                <li>
                  <h5>
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.phone
                      ? " Phone Number"
                      : ""}
                  </h5>
                  <p>
                    {props.selecteduser &&
                      props.selecteduser.contact &&
                      props.selecteduser.contact.phone}
                  </p>
                </li>
              ) : (
                ""
              )}

              <li>
                <h5>Subscription</h5>
                <p>
                  {props.selecteduser &&
                  props.selecteduser.contact &&
                  props.selecteduser.contact.emailSubs == "opted-in"
                    ? "Opted In"
                    : "Opted Out"}
                </p>
              </li>
              <li>
                <h5>Email</h5>
                <p>
                  {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.email}
                </p>
              </li>
              {!props.selecteduser ? (
                ""
              ) : (
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      props.handleContactEditModal(
                        props.selecteduser && props.selecteduser.contact._id
                      )
                    }
                    className="btn-links"
                  >
                    Edit Contact
                  </button>
                  <EditContactModal
                    open={props.openContactModal}
                    handleCloseContactModal={props.handleCloseContactModal}
                    editContact={props.editContact}
                    handleEditContactChange={props.handleEditContactChange}
                    handleConDataEdit={props.handleConDataEdit}
                  />
                </li>
              )}
            </ul>
          </div>
          {!props.selecteduser ? (
            ""
          ) : (
            <div className="conversation-tags">
              <h4>Conversation Tags</h4>
              <div className="dropdown">
                <button
                  className="btn btn-addd-tag dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <AddIcon /> Add Tags
                </button>
                <div className="dynamic-tags">
                  <ul>
                    {props.newAray
                      ? props.newAray.map((item) => (
                          <li
                            style={{
                              borderColor: item.color,
                              color: item.color,
                            }}
                          >
                            {item.name}{" "}
                            <span
                              className="remove-tag"
                              style={{ color: item.color }}
                              onClick={() => props.handleSelectDel(item)}
                            >
                              ✕
                            </span>
                          </li>
                        ))
                      : []}
                  </ul>
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                  style={{ overflowY: "scroll", height: " 220px" }}
                >
                  {props.conversationTags
                    ? props.conversationTags.map((item, index) => (
                        <li
                          style={{ borderColor: item.color }}
                          onClick={() =>
                            props.handleSelectedTagItems(item, index)
                          }
                        >
                          <span style={{ color: item.color }}>
                            <LocalOfferIcon style={{ fill: item.color }} />
                            {item.name}
                          </span>
                        </li>
                      ))
                    : []}

                  <li>
                    <button
                      type="button"
                      onClick={props.onClick}
                      className="btn link-bttn"
                    >
                      Manage Tags
                    </button>
                  </li>
                </ul>
                <ConversationTagModal
                  open={props.openManageTagModal}
                  handleCloseManageModal={props.handleCloseManageModal}
                  openCTM={props.openCreateTagModal}
                  handleCloseCTModal={props.handleCloseCTModal}
                  addTags={props.addTags}
                  handleChange={props.handleChange}
                  handleClick={props.handleClick}
                  handleCMModal={props.handleCMModal}
                  openEditTagModal={props.openEditTagModal}
                  handleCloseETModal={props.handleCloseETModal}
                  handleEditChange={props.handleEditChange}
                  handleEdit={props.handleEdit}
                  editTags={props.editTags}
                  tags={props.tags}
                  handleEditTag={props.handleEditClick}
                  handleDelModal={props.handleDelModal}
                  showDeleteTagModal={props.openDelTagModal}
                  handleDeleteTags={props.handleDeleteTags}
                  handleCloseDeleteModal={props.handleCloseDeleteModal}
                  errors={props.errors}
                />
              </div>
            </div>
          )}
          <div className="monthly-balance-box">
            <h4>Monthly Balance</h4>
            <ul>
              <li>
                <b>Credit used</b>
                <span>$1900</span>
              </li>
              <li>
                <b>Credit balance</b>
                <span>$75000</span>
              </li>
            </ul>
          </div>
        </div>
        <ScheduleMessageModal
          showScheduleModal={props.showScheduleModal}
          handleCloseSchedultModal={props.handleCloseSchedultModal}
          dateSelected={props.dateSelected}
          handleDateChange={props.handleDateChange}
          handleSubmit={props.handleScheduleSubmit}
        />
        <ManageTemplateModal
          showManageeTemplateModal={props.showManageeTemplateModal}
          handleCloseManageTemplateModal={props.handleCloseManageTemplateModal}
          handleCreateTemplate={props.handleCreateTemplate}
          templateData={props.templateData}
          handleTempShowClick={props.handleTempShowClick}
          templateDataState={props.templateDataState}
          handleTempInsert={props.handleSingleTempInsert}
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
          handleCloseCreateTemplateModal={props.handleCloseCreateTemplateModal}
          templateName={props.templateName}
          handleTemplateName={props.handleTemplateName}
          templateTags={props.templateTags}
          handleTemplateTagChange={props.handleTemplateTagChange}
          templateMessage={props.templateMessage}
          handleTempMessageChange={props.handleTempMessageChange}
          handleTemplateSubmit={props.handleTemplateSubmit}
          errors={props.errors}
        />
        <ReScheduleTitleModal
          showReScheduleTitleModal={props.showReScheduleTitleModal}
          handleCloseReSchedulTitle={props.handleCloseReSchedulTitle}
          reScheduleTitle={props.reScheduleTitle}
          handleReSchaduleTChange={props.handleReSchaduleTChange}
          handleDeleteRechaduletitleM={props.handleDeleteRechaduletitleM}
          handleReTitleSubmit={props.handleReTitleSubmit}
        />
      </div>
    </div>
  );
};

export default EmailChatBoot;
