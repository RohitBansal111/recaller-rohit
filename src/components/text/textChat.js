import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { dateSince } from "../../helper/dateFunction";
import { timeAgo } from "../../helper/timerFuntion";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ReScheduleMessageModal from "../../models/reScheduleMsg";

const TextChat = (props) => {
  const userData = useSelector((state) => state.Login.userData);

  return (
    <ScrollToBottom className="middle-chat-screen">
      <ul ref={props.divRef}>
        {props.chatData
          ? props.chatData.map((item) => (
              <>
                {/* <li className="date-update">
                  <span>{dateSince(item.createdAt)}</span>
                  <p></p>
                </li> */}
                <li>
                  <div
                    className={
                      item.sender === 1
                        ? "user chat-ui-box"
                        : "client chat-ui-box"
                    }
                  >
                    {item.type == "Schedule" ? (
                      <div className="scheduletext">
                        <button
                          type="button"
                          onClick={props.handleReSchedule}
                        >
                          <ScheduleIcon />
                        </button>
                        <pre>{item.message}</pre>
                      </div>
                    ) : (
                      <pre>{item.message}</pre>
                    )}
                    {item.imageUrl ? (
                      <>
                        <img src={item.imageUrl} alt="img"></img>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <span>
                    <b>
                      {item.sender === 1 && "user chat-ui-box"
                        ? userData.firstName.charAt(0) +
                          "" +
                          userData.lastName.charAt(0) +
                          " "
                        : "" || (item.sender === 2 && "client chat-ui-box")
                        ? props.selecteduser.contact.firstName +
                          " " +
                          props.selecteduser.contact.lastName +
                          " "
                        : ""}
                    </b>
                    {timeAgo(item.createdAt)}
                  </span>
                </li>
              </>
            ))
          : []}
      </ul>
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
    </ScrollToBottom>
  );
};

export default TextChat;
