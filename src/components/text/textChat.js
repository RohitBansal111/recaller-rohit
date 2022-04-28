import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { timeAgo } from "../../helper/timerFuntion";
const TextChat = (props) => {
  const userData = useSelector((state) => state.Login.userData);
  
  return (
    <ScrollToBottom className="middle-chat-screen">
      <ul ref={props.divRef}>
        {props.chatData
          ? props.chatData.map((item) => (
              <>
                <li>
                  <div
                    className={
                      item.sender === 1
                        ? "user chat-ui-box"
                        : "client chat-ui-box"
                    }
                  >
                    <pre>{item.message}</pre>
                  </div>
                  <span>
                    <b>
                      {item.sender === 1 && "user chat-ui-box"
                        ? userData.firstName.charAt(0) +
                          "" +
                          userData.lastName.charAt(0) +
                          " "
                        : "" || (item.sender === 2 && "client chat-ui-box")
                        ? props.contactName.contact.firstName +
                          " " +
                          props.contactName.contact.lastName +
                          " "
                        : ""}
                    </b>
                    {timeAgo(item.createdAt)}
                  </span>
                </li>
                {/* <li className="date-update">
                <span>April 22, 2022</span><p></p>
              </li> */}
              </>
            ))
          : []}
      </ul>
    </ScrollToBottom>
  );
};

export default TextChat;
