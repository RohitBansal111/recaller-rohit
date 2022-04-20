import React from "react";

const TextChat = (props) => {
  return (
    <div className="middle-chat-screen">
      <ul>
        <li className="client">
          Hi <br /> Sorry you contacted us after hours, we will be in contact
          during regular operating hours.
        </li>
        <li className="user">
          Hi <br /> Sorry you contacted us after hours, we will be in contact
          during regular operating hours.
        </li>
        {props.messageData
          ? props.messageData.map((item) => (
              <li className="user">{item.sendMessage}</li>
            ))
          : []}
      </ul>
    </div>
  );
};

export default TextChat;
