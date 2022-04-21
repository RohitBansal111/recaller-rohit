import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { timeAgo } from "../../helper/timerFuntion";
const TextChat = (props) => {
  console.log(props.chatData);
  return (
    <ScrollToBottom className="middle-chat-screen">
      <ul>
        {props.chatData
          ? props.chatData.map((item) => (
              <li>
                <div
                  className={
                    item.sender == 1 ? "user chat-ui-box" : "client chat-ui-box"
                  }
                >
                  {item.message}
                </div>
                <span>
                  <b>NH</b> {timeAgo(item.createdAt)}
                </span>
              </li>
            ))
          : []}
      </ul>
    </ScrollToBottom>
  );
};

export default TextChat;
