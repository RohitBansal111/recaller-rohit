import React, { useState , useEffect } from "react";
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
import LockIcon from "@material-ui/icons/Lock";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { GetSubscriptionData } from "../../api/plans";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VoiceChatBoot = (props) => {
  const [subData, setSubData] = useState({});
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
  const data = [
    {
      name: 'Page A',
      uv:1500,
    },
    {
      name: 'Page C',
      uv: 1400,
    },
    {
      name: 'Page B',
      uv: 4000,
    },
    {
      name: 'Page C',
      uv: 1400,
    },
    {
      name: 'Page D',
      uv: 1800,
    },
    {
      name: 'Page E',
      uv: 1100,
    },
    {
      name: 'Page F',
      uv: 1100,
    },
    {
      name: 'Page G',
      uv: 1900,
    },
    {
      name: 'Page G',
      uv: 1600,
    },
    {
      name: 'Page G',
      uv: 1700,
    },
    {
      name: 'Page G',
      uv: 1100,
    },
    {
      name: 'Page G',
      uv: 1900,
    },
    {
      name: 'Page G',
      uv: 2100,
    },
    {
      name: 'Page G',
      uv: 1500,
    },
    {
      name: 'Page G',
      uv: 1800,
    },
    {
      name: 'Page G',
      uv: 1100,
    },
    {
      name: 'Page G',
      uv: 1400,
    },
    {
      name: 'Page G',
      uv: 1100,
    },
    {
      name: 'Page G',
      uv: 1500,
    },
  ];
  const handleGetData = async () => {
    let res = await GetSubscriptionData();
    if (res && res.data && res.status == 200) {
      setSubData(res?.data?.data);
    }
  };
  useEffect(() => {
   handleGetData();
  }, []);
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
                handleLoadMetadata={props.handleLoadMetadata}
              />
            </div>
            {props.contactVoiceList && props.contactVoiceList == 0 ? (
              []
            ) : (
              <div className="voice-recorder-box">
                {props.selecteduser &&
                props.selecteduser.contact &&
                props.selecteduser.contact.voiceSubs == "opted-out" ? (
                  <div className="voice-closed-OPT">
                    <div className="closed-conversation-section">
                      <div className="card-box">
                        <LockIcon />
                        <p>
                          This Conversation is <b>Opted Out.</b> &nbsp;
                          <b>
                            <u
                              onClick={() =>
                                props.handleOptOut(
                                  props.selecteduser.contact.voiceSubs ==
                                    "opted-in"
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
                  </div>
                ) : (
                  <>
                    <div className="recording-left">
                      {/* {props.isNewVoiceActive == false ? (
                        " "
                      ) : ( */}
                      <div className="recording-voice-action">
                        {props.isActive == true || props.second > 0 ? (
                          <>
                            <span></span>
                            <h4>
                              {props.minute}:{props.second}
                            </h4>
                          </>
                        ) : (
                          ""
                        )}
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
                      {/* )} */}

                      {props.isActive == false &&
                      props.second == "00" &&
                      props.isNewVoiceActive == false &&
                      props.minute == "00" ? (
                        <div className="upload-song">
                          <div className="uploadRecordingLibrary">
                            <input
                              className="inputFile"
                              type="file"
                              accept="audio/*"
                              name="file"
                              ref={props.singleVref}
                              onChange={props.onSingleVoiceUploadChange}
                            />
                            <LibraryMusicIcon />
                          </div>
                          {props.audioFileName && (
                            <p
                              style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                position: "relative",
                              }}
                            >
                              {props.audioFileName && props.audioFileName.name
                                ? props.audioFileName.name
                                : null}
                            </p>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {props.audioFileName !== null ? (
                      <button
                        type="button"
                        className="remove-recording-action"
                        onClick={props.clearUploadData}
                      >
                        ×
                      </button>
                    ) : (
                      ""
                    )}
                    {(props.second > 0 &&
                      props.isActive == false &&
                      props.isNewVoiceActive == false) ||
                    props.audioFileName !== null ? (
                      <>
                             <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>{
                          props.handlePlay();
                          return;
                        }
                          
                        }
                      >
                        Play
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={
                          props.audioFileName !== null
                            ? props.handleSingleVoiceUpload
                            : props.handleSendSingleContactVoice
                        }
                      >
                        Send
                      </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          if (
                            !props.isActive &&
                            props.isNewVoiceActive == false
                          ) {
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
                          : props.audioFileName == null
                          ? "Press & Recording"
                          : props.isNewVoiceActive == true
                          ? "Press & Recording"
                            ? props.isNewVoiceActive == false
                            : "Press & Recording"
                          : "Press & Recording"}
                      </button>
                    )}
                  </>
                )}
              </div>
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
            </div>
          )}
          <div className="monthly-balance-box">
            <h4>Monthly Balance</h4>
            <ul>
              <li>
                <b>Credit used</b>
                <span>${subData?.voice_cridit_used||0}</span>
              </li>
              <li>
                <b>Credit balance</b>
                <span>${subData?.voice_cridit_remain||0}</span>
              </li>
            </ul>
          </div>
          

          {/* Monthly credit usage column start */}
            <div className="monthly-credit-use">
              <h1>Monthly Credit usage</h1>
              <div className="monthly-graph">
              <ResponsiveContainer width={'99%'} height={150}>
              <AreaChart
                width={310}
                height={150}
                data={data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
              <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#28dcbf" stopOpacity={0.7}/>
                <stop offset="80%" stopColor="#41e3c926" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
            <Tooltip />
                <Area type="monotone" strokeWidth={4}  dataKey="uv" stroke="#28dcbf"   fillOpacity={1} fill="url(#colorUv)"/>
              </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly credit usage column end */}
        </div>
      </div>
    </div>
  );
};

export default VoiceChatBoot;
