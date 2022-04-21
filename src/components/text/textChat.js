import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
const TextChat = (props) => {
  return (
    <ScrollToBottom className="middle-chat-screen">
      <ul>
        {props.chatData
          ? props.chatData.map((item) => (
              <li className={item.sender == 1 ? "user" : "client"}>
                {item.message}
              </li>
            ))
          : []}
      </ul>
    </ScrollToBottom>
  );
};

export default TextChat;
