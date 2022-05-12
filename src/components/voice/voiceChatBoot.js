import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BlockIcon from "@material-ui/icons/Block";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ConversationTagModal from "./../conversationTagModal";
import VoiceRecordingChat from "../voice/voice-recording-chat";
import MicIcon from "@material-ui/icons/Mic";
import { timeAgo } from "../../helper/timerFuntion";
import EditContactModal from "../../models/editContactModal";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import WifiIcon from "@material-ui/icons/Wifi";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

const VoiceChatBoot = (props) => {
  const userVoiceMessageList = () => {
    let filtered = [];
    filtered =
      props.contactVoiceList &&
      props.contactVoiceList.filter(
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
          {/* <p>{item.message.slice(0, 30).concat("...")}</p> */}
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
              {userVoiceMessageList()}
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
                        props.selecteduser.contact.voiceSubs == "opted-in"
                          ? "opted-out"
                          : "opted-in"
                      )
                    }
                  >
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.voiceSubs == "opted-in" ? (
                      <WifiOffIcon />
                    ) : (
                      <WifiIcon />
                    )}
                    {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.voiceSubs == "opted-in"
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
              <VoiceRecordingChat
                voiceChatData={props.voiceChatData}
                selecteduser={props.selecteduser}
                divRef={props.divRef}
                isShowLoading={props.isShowLoading}
              />
            </div>
            {props.contactVoiceList && props.contactVoiceList == 0 ? (
              []
            ) : (
              <div className="voice-recorder-box">
                <div className="recording-left">
                  <span></span>{" "}
                  <h4>
                    {props.minute}:{props.second}
                  </h4>
                  {props.second > 0 ? (
                    <button
                      type="button"
                      className="remove-recording-action"
                      onClick={props.stopTimer}
                    >
                      {" "}
                      ×{" "}
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                {props.second > 0 && props.isActive == false ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.handleSendSingleContactVoice}
                  >
                    Send
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if (!props.isActive) {
                        props.startRecording();
                      } else {
                        props.stopRecording();
                      }
                      props.setIsActive(!props.isActive);
                    }}
                  >
                    <MicIcon className="mr-2" />
                    {props.second == 0
                      ? "Press & Recording"
                      : props.isActive == true
                      ? "Stop"
                      : "Press & Recording"}
                  </button>
                )}
              </div>
            )}
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
                  props.selecteduser.contact.voiceSubs == "opted-in"
                    ? "Opted In"
                    : "Opted Out"}
                </p>
              </li>
              <li>
                <h5>Email</h5>
                <p>{props.selecteduser && props.selecteduser.contact.email}</p>
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
          </div>)}
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
      </div>
    </div>
  );
};

export default VoiceChatBoot;
