import React from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { dateSince } from "../../helper/dateFunction";
import { timeAgo } from "../../helper/timerFuntion";
import parse from "html-react-parser";
import ReScheduleMessageModal from "../../models/reScheduleMsg";
import ScheduleIcon from "@material-ui/icons/Schedule";

const EmailChatText = (props) => {
  const userData = useSelector((state) => state.Login.userData);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var today = new Date();

  return (
    <ScrollToBottom className="middle-chat-screen email-middle-screen">
      <ul ref={props.divRef}>
        {props.emailChatData
          ? props.emailChatData.map((item) => (
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
                    {item.sheduled == true &&
                    new Date(item.sheduleDate) >= today ? (
                      <div className="scheduletext">
                        {" "}
                        <button
                          type="button"
                          onClick={() => props.handleReSchedule(item)}
                        >
                          <ScheduleIcon />
                        </button>
                        <>
                      <pre>  Subject : {item.subject?item.subject.trim():''} </pre>
                      <pre>  Content : {parse(item.message.trim())}</pre>
                      </>
                      </div>
                    ) : (
                      <>
                      <pre>  Subject : {item.subject?item.subject.trim():''} </pre>
                      <pre>  Content : {parse(item.message.trim())}</pre>
                      </>
                    )}
                  </div>
                  <span>
                    <b>
                      {item.sender === 1 && "user chat-ui-box"
                        ? capitalizeFirstLetter(item.status) + " "
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

export default EmailChatText;
