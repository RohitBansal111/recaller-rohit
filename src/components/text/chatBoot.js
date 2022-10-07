import React, { useState, useEffect } from "react";
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
import Picker from "emoji-picker-react";
import LockIcon from "@material-ui/icons/Lock";
import Chart from "react-apexcharts";
import { GetSubscriptionData } from "../../api/plans";
import { getSMSStatus } from "../../api/subscription";
import ReactApexChart from "react-apexcharts";

import CancelIcon from "@material-ui/icons/Cancel";
import ReScheduleMessageModal from "../../models/reScheduleMsg";
import CloseIcon from "@mui/icons-material/Close";
import ReScheduleTitleModal from "../../models/reScheduleMsgTitle";

import ProgressBar from "react-bootstrap/ProgressBar";
import moment from "moment";
import { VoiceSMSGraph } from "../../api/graph";
import { BsChevronRight } from "react-icons/bs";
import OneGraphForAll from "../../components/MainGraph/oneGraph";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import VoiceProgressBar from "./ProgreeBar";

const ChatBoot = (props) => {
  const [subData, setSubData] = useState({});
  const [typeSelect, setTypeSelect] = useState("sms");
  const [substatus, setSubstatus] = useState({});
  const [dataseries, setDataSeries] = useState([]);
  const [selcetVal, setSelectVal] = useState("text");

  const [dataOption, setDataOption] = useState([]);
  const [check, setCheck] = useState(false);
  const data = [
    {
      name: "Page A",
      uv: 1500,
    },
    {
      name: "Page C",
      uv: 1400,
    },
    {
      name: "Page B",
      uv: 4000,
    },
    {
      name: "Page C",
      uv: 1400,
    },
    {
      name: "Page D",
      uv: 1800,
    },
    {
      name: "Page E",
      uv: 1100,
    },
    {
      name: "Page F",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1900,
    },
    {
      name: "Page G",
      uv: 1600,
    },
    {
      name: "Page G",
      uv: 1700,
    },
    {
      name: "Page G",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1900,
    },
    {
      name: "Page G",
      uv: 2100,
    },
    {
      name: "Page G",
      uv: 1500,
    },
    {
      name: "Page G",
      uv: 1800,
    },
    {
      name: "Page G",
      uv: 1100,
    },
    {
      name: "Page G",
      uv: 1400,
    },
    {
      name: "Page G",
      uv: 1100,
    },
    {
      name: "Page G",

      uv: 1500,
    },
  ];
  const series = [
    {
      name: "Text",
      data: [10, 100, 31, 65, 35, 55, 32, 50, 45],
    },
    {
      name: "MMS",
      data: [10, 100, 31, 65, 35, 55, 32, 50, 45],
    },
  ];

  const options = {
    colors: ["#28dcbf", "#f7b924"],
    chart: {
      type: "bar",
      height: 650,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      data: [
        {
          x: 1,
          y: 10000,
        },
        {
          x: 2,
          y: 10000,
        },
        {
          x: 3,
          y: 329,
        },
        {
          x: 4,
          y: 342,
        },
        {
          x: 5,
          y: 348,
        },
        {
          x: 6,
          y: 334,
        },
        {
          x: 7,
          y: 325,
        },
        {
          x: 8,
          y: 316,
        },
        {
          x: 9,
          y: 318,
        },
        {
          x: 10,
          y: 330,
        },
        {
          x: 11,
          y: 355,
        },
        {
          x: 12,
          y: 366,
        },
        {
          x: 13,
          y: 337,
        },
        {
          x: 14,
          y: 352,
        },
        {
          x: 15,
          y: 377,
        },
        {
          x: 16,
          y: 383,
        },
        {
          x: 17,
          y: 344,
        },
        {
          x: 18,
          y: 366,
        },
        {
          x: 19,
          y: 389,
        },
        {
          x: 20,
          y: 334,
        },
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const userMessageList = () => {
    let filtered = [];
    filtered =
      props.userMessageList &&
      props.userMessageList.filter(
        (val) =>
          (val &&
            val.contact &&
            val.contact.firstName
              .toLowerCase()
              .startsWith(props.searchValue.toLowerCase())) ||
          (val &&
            val.contact &&
            val.contact.lastName
              .toLowerCase()
              .startsWith(props.searchValue.toLowerCase()))
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
          <p className="noti_wrap">
            <span>{item.message.slice(0, 30).concat("...")}</span>

            {item.count > 0 && (
              <span className="notification_cstm">{item.count}</span>
            )}
          </p>
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

  {
    // const options = {
    //   chart: {
    //     height: 350,
    //     type: "area",
    //   },
    //   title: {
    //     text: "Credits Deployed: 745",
    //     align: "left",
    //     style: {
    //       fontSize: "14px",
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     curve: "smooth",
    //   },
    //   xaxis: {
    //     labels: {
    //       format: "MM",
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //   },
    //   yaxis: {
    //     tickAmount: 4,
    //     floating: false,
    //     labels: {
    //       offsetY: -7,
    //       offsetX: 0,
    //     },
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //   },
    //   tooltip: {
    //     x: {
    //       format: "yyyy",
    //     },
    //     fixed: {
    //       enabled: false,
    //       position: "topRight",
    //     },
    //   },
    // };
    // const series = [
    //   {
    //     name: "Text",
    //     data: [
    //       {
    //         x: 1,
    //         y: 322,
    //       },
    //       {
    //         x: 2,
    //         y: 324,
    //       },
    //       {
    //         x: 3,
    //         y: 329,
    //       },
    //       {
    //         x: 4,
    //         y: 342,
    //       },
    //       {
    //         x: 5,
    //         y: 348,
    //       },
    //       {
    //         x: 6,
    //         y: 334,
    //       },
    //       {
    //         x: 7,
    //         y: 325,
    //       },
    //       {
    //         x: 8,
    //         y: 316,
    //       },
    //       {
    //         x: 9,
    //         y: 318,
    //       },
    //       {
    //         x: 10,
    //         y: 330,
    //       },
    //       {
    //         x: 11,
    //         y: 355,
    //       },
    //       {
    //         x: 12,
    //         y: 366,
    //       },
    //       {
    //         x: 13,
    //         y: 337,
    //       },
    //       {
    //         x: 14,
    //         y: 352,
    //       },
    //       {
    //         x: 15,
    //         y: 377,
    //       },
    //       {
    //         x: 16,
    //         y: 383,
    //       },
    //       {
    //         x: 17,
    //         y: 344,
    //       },
    //       {
    //         x: 18,
    //         y: 366,
    //       },
    //       {
    //         x: 19,
    //         y: 389,
    //       },
    //       {
    //         x: 20,
    //         y: 334,
    //       },
    //     ],
    //   },
    //   {
    //     name: "Voice",
    //     data: [
    //       {
    //         x: 1,
    //         y: 162,
    //       },
    //       {
    //         x: 2,
    //         y: 90,
    //       },
    //       {
    //         x: 3,
    //         y: 50,
    //       },
    //       {
    //         x: 4,
    //         y: 77,
    //       },
    //       {
    //         x: 5,
    //         y: 35,
    //       },
    //       {
    //         x: 6,
    //         y: -45,
    //       },
    //       {
    //         x: 7,
    //         y: -88,
    //       },
    //       {
    //         x: 8,
    //         y: -120,
    //       },
    //       {
    //         x: 9,
    //         y: -156,
    //       },
    //       {
    //         x: 10,
    //         y: -123,
    //       },
    //       {
    //         x: 11,
    //         y: -88,
    //       },
    //       {
    //         x: 12,
    //         y: -66,
    //       },
    //       {
    //         x: 13,
    //         y: -45,
    //       },
    //       {
    //         x: 14,
    //         y: -29,
    //       },
    //       {
    //         x: 15,
    //         y: -45,
    //       },
    //       {
    //         x: 16,
    //         y: -88,
    //       },
    //       {
    //         x: 17,
    //         y: -132,
    //       },
    //       {
    //         x: 18,
    //         y: -146,
    //       },
    //       {
    //         x: 19,
    //         y: -169,
    //       },
    //       {
    //         x: 20,
    //         y: -184,
    //       },
    //     ],
    //   },
    // ];
  }

  const handleSubData = async () => {
    let res = await GetSubscriptionData();
    if (res && res.data && res.status == 200) {
      setSubData(res?.data?.data);
    }
  };
  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }
  const handleSubDataSMS = async () => {
    let res = await getSMSStatus();

    if (res && res.data && res.status == 200) {
      let smsTotel =
        Number(res?.data.massage?.deliver) +
        Number(res?.data.massage?.failed) +
        Number(res?.data.massage?.queued);
      let smsdeleverd = Number(res?.data.massage?.deliver);
      let smsFaild =
        Number(res?.data.massage?.failed) + Number(res?.data.massage?.queued);

      let mmsTotel =
        Number(res?.data.mms?.deliver) +
        Number(res?.data.mms?.failed) +
        Number(res?.data.mms?.queued);
      let mmsdeleverd = Number(res?.data.mms?.deliver);
      let mmsFaild =
        Number(res?.data.mms?.failed) + Number(res?.data.mms?.queued);
      // setSubData(res?.data?.data);
      setSubstatus({
        ...substatus,
        sms: {
          deliver: percentage(smsdeleverd, smsTotel).toFixed(1),
          failed: percentage(smsFaild, smsTotel).toFixed(1),
        },
        mms: {
          deliver: percentage(mmsdeleverd, mmsTotel).toFixed(1),
          failed: percentage(mmsFaild, mmsTotel).toFixed(1),
        },
      });
    }
  };
  const handleGetData = async () => {
    let res = await VoiceSMSGraph();
    if (res && res.data && res.data.status == 200) {
      let smsarra = [];
      const smsSeriess = [
        {
          name: "Text",
          data: res?.data?.smsData?.series || [0],
        },
        {
          name: "MMS",
          data: res?.data?.mmsData?.series || [0],
        },
      ];

      options.xaxis.data = res?.data?.smsData?.option;
      setDataOption(options);
      setDataSeries(smsSeriess);
      setCheck(true);
    }
  };

  useEffect(() => {
    handleGetData();
    handleSubData();
    handleSubDataSMS();
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
              {userMessageList()}
            </ul>
          </div>
        </div>
        <div className="chat-discussion-area">
          <div className="all-discuss-section">
            <div className="chat-header">
              <h4>
                {props.selecteduser && props.selecteduser.contact
                  ? props.selecteduser.contact.firstName +
                    " " +
                    props.selecteduser.contact.lastName
                  : ""}
              </h4>
              {
                // <div className="header-action">
                //   <button
                //     className="btn btn-more-option dropdown-toggle"
                //     type="button"
                //     id="dropdownMenuButton2"
                //     data-bs-toggle="dropdown"
                //     aria-expanded="false"
                //   >
                //     <MoreVertIcon />
                //   </button>
                //   <ul
                //     className="dropdown-menu"
                //     aria-labelledby="dropdownMenuButton2"
                //   >
                //     <li onClick={props.handleMute}>
                //       {" "}
                //       <NotificationsOffIcon /> Mute
                //     </li>
                //     <li
                //       onClick={() =>
                //         props.handleOptOut(
                //           props.selecteduser.contact.phoneSubs == "opted-in"
                //             ? "opted-out"
                //             : "opted-in"
                //         )
                //       }
                //     >
                //       {props.selecteduser &&
                //       props.selecteduser.contact &&
                //       props.selecteduser.contact.phoneSubs == "opted-in" ? (
                //         <WifiOffIcon />
                //       ) : (
                //         <WifiIcon />
                //       )}
                //       {props.selecteduser &&
                //       props.selecteduser.contact &&
                //       props.selecteduser.contact.phoneSubs == "opted-in"
                //         ? "Opted Out"
                //         : "Opted In"}
                //     </li>
                //     <li onClick={props.handleBlock}>
                //       {" "}
                //       <BlockIcon /> Block
                //     </li>
                //   </ul>
                // </div>
              }
            </div>
            <div className="chat-now">
              <TextChat
                chatData={props.chatData}
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
                handleDeleteRechaduletitle={props.handleDeleteRechaduletitle}
                schaduleData={props.scheduledData}
              />
            </div>
            <div className="chat-text-editor text-chat-editor">
              {props.userMessageList.length == 0 ? (
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
                          props.selecteduser.contact.phoneSubs ==
                            "opted-out" ? (
                            <div className="closed-conversation-section">
                              <div className="card-box">
                                <LockIcon />
                                <p>
                                  This Conversation is <b>Opted Out.</b> &nbsp;
                                  <b>
                                    <u
                                      onClick={() =>
                                        props.handleOptOut(
                                          props.selecteduser.contact
                                            .phoneSubs == "opted-in"
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
                            <div className="attachedImage-box">
                              {props.selectedImageData == null ? (
                                ""
                              ) : (
                                <ul className="attachedImageGallery">
                                  <li>
                                    <img alt="" src={props.selectedImageData} />
                                    <button
                                      type="button"
                                      className="btn btn-cross"
                                      onClick={props.handleImageCancel}
                                    >
                                      <CancelIcon />
                                    </button>
                                  </li>
                                </ul>
                              )}
                              <textarea
                                placeholder="Type your message..."
                                name="sendMessage"
                                value={props.sendMessage}
                                onChange={props.onHandleChange}
                              >
                                {props.sendMessage}
                              </textarea>
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
                                  ref={props.singleimgref}
                                  onChange={props.handleImageChange}
                                />
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
                            {props.openMessageModal == true ? (
                              ""
                            ) : (
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
                            )}
                          </ul>

                          <LoadingButton
                            type="button"
                            loadingPosition="center"
                            loading={props.loading}
                            style={{
                              cursor: !props.checkBtn
                                ? "not-allowed"
                                : "pointer",
                            }}
                            disabled={!props.checkBtn ? true : false}
                            onClick={props.onHandleClick}
                            className="btn-primary-outline"
                            variant="outlined"
                          >
                            {" Send "}
                          </LoadingButton>
                        </div>
                      </form>
                    </div>
                  </Tab>
                  {/* <Tab eventKey="filter" title="Internal Note">
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
                  </Tab> */}
                </Tabs>
              )}
            </div>
          </div>
        </div>
        <div className="chat-compassion-area">
          <div className="user-compassion-details">
            <div className="user-name-head">
              {/* {!props.editContactName && ( */}
              <>
                <h4>
                  {props.selecteduser && props.selecteduser.contact
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

                <p>
                  {props.selecteduser &&
                    props.selecteduser.contact &&
                    props.selecteduser.contact.phone}
                </p>
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
                <h5>
                  {props.selecteduser &&
                  props.selecteduser.contact &&
                  props.selecteduser.contact.email
                    ? "Email"
                    : ""}
                </h5>
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
                        props.selecteduser &&
                          props.selecteduser.contact &&
                          props.selecteduser.contact._id
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
          {!props.selecteduser ? "" : ""}

          {
            // <div className="monthly-balance-box">
            //   <h4>Monthly Balance</h4>
            //   {<VoiceProgressBar />}
            //   {
            //     // <ul>
            //     //   <li>
            //     //     <b>Credit used</b>
            //     //     <span>$1900</span>
            //     //   </li>
            //     //   <li>
            //     //     <b>Credit balance</b>
            //     //     <span>$75000</span>
            //     //   </li>
            //     // </ul>
            //   }
            // </div>
          }

          {/* Monthly credit usage column start */}
          <div className="monthly-credit-use">
            <OneGraphForAll />

            <div className="monthly-progressbar">
              <div className="mp-heading">
                <h2>Performance</h2>
                <div className="monthly-performance">
                  <select
                    name="text-performance"
                    onChange={(e) => {
                      setSelectVal(e.target.value);
                    }}
                  >
                    <option value="text">Text</option>
                    <option value="mms">MMS</option>
                  </select>
                </div>
              </div>
              <div className="mn-progressbar">
                <div className="progressbar-field delfield">
                  <div className="voice-heading">
                    <h4>
                      {selcetVal == "text"
                        ? substatus?.sms?.deliver || 0
                        : substatus?.mms?.deliver || 0}
                      %
                    </h4>
                  </div>
                  <ProgressBar
                    now={
                      selcetVal == "text"
                        ? substatus?.sms?.deliver || 0
                        : substatus?.mms?.deliver || 0
                    }
                  />
                  <div className="voice-value">
                    <h5>Delivered</h5>
                  </div>
                </div>
                <div className="progressbar-field flfield">
                  <div className="voice-heading">
                    <h4>
                      {selcetVal == "text"
                        ? substatus?.sms?.failed || 0
                        : substatus?.mms?.failed || 0}
                      %
                    </h4>
                  </div>
                  <ProgressBar
                    now={
                      selcetVal == "text"
                        ? substatus?.sms?.failed || 0
                        : substatus?.mms?.failed || 0
                    }
                  />
                  <div className="voice-value">
                    <h5>Failed</h5>
                  </div>
                </div>
              </div>
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
          </div>

          {/* Monthly credit usage column start */}

          {
            // <div className="monthly-credit-use">
            //   <h1>Monthly Credit usage</h1>
            //   <div className="monthly-graph">
            //     <Chart options={options} series={series} type="area" />
            //   </div>
            // </div>
          }
          {/* Monthly credit usage column end */}

          {
            // <div className="monthly-balance-box">
            //   <ul>
            //     <li>
            //       <b>Credit used</b>
            //       <h4>{props?.countData?.deliver}%</h4>
            //       <ProgressBar now={props?.countData?.deliver} />
            //       <span>Delivered</span>
            //     </li>
            //     <li>
            //       <b>Credit balance</b>
            //       <h4>{props?.countData?.failed}%</h4>
            //       <ProgressBar now={props?.countData?.failed} />
            //       <span>Falled</span>
            //     </li>
            //   </ul>
            // </div>
          }
        </div>
        <ScheduleMessageModal
          showScheduleModal={props.showScheduleModal}
          handleCloseSchedultModal={props.handleCloseSchedultModal}
          dateSelected={props.dateSelected}
          handleDateChange={props.handleDateChange}
          handleSubmit={props.handleScheduleSubmit}
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
          replacefunc={props.replacefunc}
          searchTemplateValue={props.searchTemplateValue}
          handleSearchTempChange={props.handleSearchTempChange}
          handleCloseDeleteTempModal={props.handleCloseDeleteTempModal}
          showDeleteTempModal={props.showDeleteTempModal}
          selecteduser={props.selecteduser}
        />
        <ReScheduleMessageModal
          showReScheduleModal={props.showReScheduleModal}
          handleCloseReSchedultModal={props.handleCloseReSchedultModal}
          reScheduleData={props.reScheduleData}
          handleReSchaduleChange={props.handleReSchaduleChange}
          handleReSubmit={props.handleReSubmit}
          handleCancelReSchedultModal={props.handleCancelReSchedultModal}
          cancelRescheDule={props.cancelRescheDule}
          handleNoReSchedultModal={props.handleNoReSchedultModal}
          handleDeleteReSchedultModal={props.handleDeleteReSchedultModal}
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

export default ChatBoot;
