import React from "react";

const TextChat = (props) => {
  return (
    <div className="middle-chat-screen">
      <ul>
        {props.chatData
          ? props.chatData.map((item) => (
              <li className={item.sender == 1 ? "user" : "client"}>
                {item.message}
              </li>
            ))
          : []}
      </ul>
    </div>
  );
};

export default TextChat;
