import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DoneIcon from "@material-ui/icons/Done";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ConversationTagModal from "./conversationTagModal";
import TextChat from "./textChat";
import VoiceRecordingChat from "../voice/voice-recording-chat";
import { useLocation } from "react-router-dom";
import MicIcon from "@material-ui/icons/Mic";

const ChatBoot = (props) => {
  const location = useLocation();
  return (
    <div className="chatbox-warpper">
      <div className="inner-chatbox-area">
        <div className="chat-user-list">
          <div className="chat-list-filter">
            <form className="main-form">
              <div className="field-group flexFull searchField">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter customer name, phone or conversation tag"
                  name="name"
                />
                <div className="search-field">
                  <SearchIcon />
                </div>
              </div>
            </form>
            <ul className="user-list-main">
              {/* {
                props.massages.map((item) => (
                  <></>
                ))
              } */}
              <li>
                <h5>
                  {" "}
                  Mad Dab Labs dispo <span>8:45 PM</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Hutebox <span>Yesterday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Khusleaf <span>Monday</span>
                </h5>
                <p>Hi sorry contact us after </p>
              </li>
              <li>
                <h5>
                  {" "}
                  Smoking Buddha <span>Saturday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  The Amazing Haze <span>Wednesday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Mad Dab Labs dispo <span>8:45 PM</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Hutebox <span>Yesterday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Khusleaf <span>Monday</span>
                </h5>
                <p>Hi sorry contact us after </p>
              </li>
              <li>
                <h5>
                  {" "}
                  Smoking Buddha <span>Saturday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  The Amazing Haze <span>Wednesday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Mad Dab Labs dispo <span>8:45 PM</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Hutebox <span>Yesterday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  Khusleaf <span>Monday</span>
                </h5>
                <p>Hi sorry contact us after </p>
              </li>
              <li>
                <h5>
                  {" "}
                  Smoking Buddha <span>Saturday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
              <li>
                <h5>
                  {" "}
                  The Amazing Haze <span>Wednesday</span>
                </h5>
                <p>Weed a gram aoora back order for</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="chat-discussion-area">
          <div className="all-discuss-section">
            <div className="chat-header">
              <h4>White Rabbit Delivery</h4>
              <div className="header-action">
                <DoneIcon />
                <MoreVertIcon />
              </div>
            </div>
            <div className="chat-now">
              {location.pathname === "/text" && (
                <TextChat messageData={props.messageData} />
              )}
              {location.pathname === "/email" && (
                <TextChat messageData={props.messageData} />
              )}
              {location.pathname === "/voice" && <VoiceRecordingChat />}
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
                          <button
                            type="button"
                            className="btn-primary-outline"
                            disabled={!props.sendMessage ? true : false}
                            onClick={props.onHandleClick}
                          >
                            Send
                          </button>
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
                          <button type="button" className="btn-primary-outline">
                            Send & Close
                          </button>
                          <button type="button" className="btn-primary-outline">
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            ) : (
              ""
            )}
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

export default ChatBoot;
