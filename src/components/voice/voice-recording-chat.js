import React from "react";
import ReactAudioPlayer from "react-audio-player";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ScrollToBottom from "react-scroll-to-bottom";
import Recording1 from "./../../assets/recording/1.mp3";
import { timeAgo } from "../../helper/timerFuntion";
import { useSelector } from "react-redux";

const VoiceRecordingChat = (props) => {
  const userData = useSelector((state) => state.Login.userData);

  return (
    <ScrollToBottom className="middle-chat-screen voice-chat-screen">
      <ul ref={props.divRef}>
        {props.voiceChatData
          ? props.voiceChatData.map((item) => (
              <>
                <li className="voice-chat-list">
                  <div
                    className={
                      // item.sender === 1 ?
                      "user chat-ui-box"
                      // : "client chat-ui-box"
                    }
                  >
                    <ReactAudioPlayer src={`${process.env.REACT_APP_API_URL}/uploads/${item.message}`} controls />
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

export default VoiceRecordingChat;
