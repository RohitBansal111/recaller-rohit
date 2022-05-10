import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import BlockIcon from "@material-ui/icons/Block";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ConversationTagModal from "./../conversationTagModal";
import TextChat from "./textChat";
import { timeAgo } from "../../helper/timerFuntion";
import EditContactModal from "../../models/editContactModal";
import LoadingButton from "@mui/lab/LoadingButton";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import WifiIcon from "@material-ui/icons/Wifi";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ImageIcon from "@material-ui/icons/Image";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ScheduleMessageModal from "../../models/ScheduleMessageModal";
import CreateTemplateModal from "../../models/CreateTemplateModal";
import ManageTemplateModal from "../../models/ManageTemplateModal";

const ChatBoot = (props) => {
  const userMessageList = () => {
    let filtered = [];
    filtered =
      props.userMessageList &&
      props.userMessageList.filter(
        (val) =>
          val.contact.firstName
            .toLowerCase()
            .startsWith(props.searchValue.toLowerCase()) ||
          val.contact.lastName
            .toLowerCase()
            .startsWith(props.searchValue.toLowerCase())
      );
    const chatList = filtered.map((item, index) => {
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
          <p>{item.message.slice(0, 30).concat("...")}</p>
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

  return (
    <div className="chatbox-warpper">
      <div className="inner-chatbox-area">
        <div className="chat-user-list">
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
              {userMessageList()}
            </ul>
          </div>
        </div>
        <div className="chat-discussion-area">
          <div className="all-discuss-section">
            <div className="chat-header">
              <h4>
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
                        props.selecteduser.contact.phoneSubs == "opted-in"
                          ? "opted-out"
                          : "opted-in"
                      )
                    }
                  >
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.phoneSubs == "opted-in" ? (
                      <WifiOffIcon />
                    ) : (
                      <WifiIcon />
                    )}
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.phoneSubs == "opted-in"
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
              <TextChat
                chatData={props.chatData}
                selecteduser={props.selecteduser}
                divRef={props.divRef}
              />
            </div>
            <div className="chat-text-editor">
              <Tabs
                defaultActiveKey="all"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="all" title="Message">
                  <div className="chat-textarea">
                    <form className="main-form">
                      <div className="field-group flexFull">
                        <textarea
                          placeholder="Type your message..."
                          name="sendMessage"
                          value={props.sendMessage}
                          onChange={props.onHandleChange}
                        >
                          {props.sendMessage}
                        </textarea>
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
                                <button
                                  type="button"
                                  onClick={props.handleManageTemplate}
                                >
                                  Manage
                                </button>
                              </h4>
                              {props.templateData &&
                                props.templateData.map((item) => (
                                  <li
                                    onClick={() =>
                                      props.handleTempTitleClick(item)
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
                              onClick={props.handleScheduleModal}
                            >
                              <ScheduleIcon />
                            </button>
                          </li>
                        </ul>

                        <LoadingButton
                          type="button"
                          loadingPosition="center"
                          loading={props.loading}
                          style={{
                            cursor:
                              props.sendMessage == 0
                                ? "not-allowed"
                                : "pointer",
                          }}
                          disabled={!props.sendMessage ? true : false}
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
                        <button type="button" className="btn-primary-outline">
                          Add Note
                        </button>
                      </div>
                    </form>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="chat-compassion-area">
          <div className="user-compassion-details">
            <div className="user-name-head">
              {!props.editContactName && (
                <>
                  <h4>
                    {props.selecteduser
                      ? props.selecteduser.contact.firstName +
                        " " +
                        props.selecteduser.contact.lastName
                      : ""}
                  </h4>
                  <EditIcon
                    onClick={() =>
                      props.handleEditUserName(props.selecteduser.contact._id)
                    }
                  />
                </>
              )}

              {props.editContactName && (
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
              )}
            </div>
            <ul className="personal-info">
              <li>
                <h5>Phone Number</h5>
                <p>{props.selecteduser && props.selecteduser.contact.phone}</p>
              </li>
              <li>
                <h5>Subscription</h5>
                <p>
                  {props.selecteduser &&
                  props.selecteduser.contact &&
                  props.selecteduser.contact.phoneSubs == "opted-in"
                    ? "Opted In"
                    : "Opted Out"}
                </p>
              </li>
              <li>
                <h5>Email</h5>
                <p>{props.selecteduser && props.selecteduser.contact.email}</p>
              </li>
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
            </ul>
          </div>
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
          loading={props.loading}
        />
        <ManageTemplateModal
          showManageeTemplateModal={props.showManageeTemplateModal}
          handleCloseManageTemplateModal={props.handleCloseManageTemplateModal}
          handleCreateTemplate={props.handleCreateTemplate}
          templateData={props.templateData}
          handleTempShowClick={props.handleTempShowClick}
          templateDataState={props.templateDataState}
          handleSingleTempInsert={props.handleSingleTempInsert}
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
          replacefunc={props.replacefunc}
          handleSearchChange={props.handleSearchChange}
          handleCloseDeleteTempModal={props.handleCloseDeleteTempModal}
          showDeleteTempModal={props.showDeleteTempModal}
        />
      </div>
    </div>
  );
};

export default ChatBoot;
