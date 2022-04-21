import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DoneIcon from "@material-ui/icons/Done";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ConversationTagModal from "./../conversationTagModal";
import TextChat from "./../text/textChat";
import VoiceRecordingChat from "../voice/voice-recording-chat";
import { useLocation } from "react-router-dom";
import MicIcon from "@material-ui/icons/Mic";
import moment from "moment";

const VoiceChatBoot = (props) => {
  const location = useLocation();

  var formats = {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "DD/MM/YYYY",
  };
  const userMessageList = () => {
    let filtered = [];
    filtered =
      props.contactMessageList &&
      props.contactMessageList.filter(
        (val) =>
          val.contact.firstName +
            " " +
            val.contact.lastName
              .toLowerCase()
              .startsWith(props.searchValue.toLowerCase()) ||
          val.contact.firstName +
            " " +
            val.contact.lastName
              .toLowerCase()
              .startsWith(props.searchValue.toLowerCase())
      );
    const chatList = filtered.map((item) => {
      return (
        <li onClick={() => props.openChatClick(item._id)}>
          <h5>
            {item.contact &&
              item.contact.firstName + " " + item.contact.lastName}
            <span>{moment(item.createdAt).format("MM:HH")}</span>
          </h5>
          <p>{item.message.slice(0, 30).concat("...")}</p>
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
                  onChange={props.handleSearchChange}
                  value={props.searchValue}
                />
                <div className="search-field">
                  {/* {props.searchValue && <SearchIcon />} */}
                </div>
              </div>
            </form>
            <ul class="user-list-main" id="chatBox">
              <li class="active">
                <h5>Dev Test<span>Today 10 00</span></h5>
                <p>demo chat...</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="chat-discussion-area">
          <div className="all-discuss-section">
            <div className="chat-header">
                <h4>Main DFDF</h4>
              <div className="header-action">
                <DoneIcon />
                <MoreVertIcon />
              </div>
            </div>
            <div className="chat-now">
              <VoiceRecordingChat />
            </div>
            <div className="voice-recorder-box">
              <h4>
                <span></span> 0.04
              </h4>
              <button type="button" className="btn btn-primary">
                <MicIcon className="mr-2" /> Press & Recording
              </button>
            </div>
          </div>
        </div>
        <div className="chat-compassion-area">
          <div className="user-compassion-details">
            <div className="user-name-head">
              <h4>White Rabbit Delivery</h4>
              <EditIcon />
            </div>
            <ul className="personal-info">
              <li>
                <h5>Phone Number</h5>
                <p>(289) 556-6684</p>
              </li>
              <li>
                <h5>Subscription</h5>
                <p>Opted In</p>
              </li>
              <li>
                <h5>Email</h5>
                <p>Whiterabbitdel@gmail.com</p>
              </li>
              <li>
                <button type="button" className="btn-links">
                  Edit Contact
                </button>
                <button type="button" className="btn-links">
                  {" "}
                  View in Contacts
                </button>
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
                {/* <ul>
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
                </ul> */}
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                style={{ overflowY: "scroll", height: " 220px" }}
              >
                {/* {props.conversationTags
                  ? props.conversationTags.map((item, index) => (
                      <li>
                        <span
                          style={{ borderColor: item.color, color: item.color }}
                          onClick={() =>
                            props.handleSelectedTagItems(item, index)
                          }
                        >
                          <LocalOfferIcon style={{ fill: item.color }} />
                          {item.name}
                        </span>
                      </li>
                    ))
                  : []} */}

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
      </div>
    </div>
  );
};

export default VoiceChatBoot;
