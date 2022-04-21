import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
const TextChat = (props) => {
  console.log(props.chatData)
  return (
    <ScrollToBottom className="middle-chat-screen">
      <ul>
        
        {props.chatData
          ? props.chatData.map((item) => (
              <li>
                <div className={item.sender==1?"user chat-ui-box":"client chat-ui-box"}>
                  {item.message}  
                </div>
                <span><b>NH</b> 5:56 AM</span>
              </li>
            ))
          : []}
        {/* {props.messageData
          ? props.messageData.map((item) => (
              <li className="user">{item.sendMessage}</li>
            ))
          : []} */}
      </ul>
    </ScrollToBottom>
  );
};

export default TextChat;
