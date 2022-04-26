import React from "react";
import ClientProfile from "./../../assets/images/user-profile.jpeg";
import UserProfile from "./../../assets/images/user-profile2.webp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ScrollToBottom from "react-scroll-to-bottom";

const VoiceRecordingChat = (props) => {
  return (
    <ScrollToBottom className="middle-chat-screen voice-chat-screen">
      <ul>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <div className="avtar">
              <img src={ClientProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <div className="avtar">
              <img src={UserProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <div className="avtar">
              <img src={ClientProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording" ></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <div className="avtar">
              <img src={UserProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <div className="avtar">
              <img src={ClientProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <div className="avtar">
              <img src={UserProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <div className="avtar">
              <img src={ClientProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <div className="avtar">
              <img src={UserProfile} alt="avtar" />
            </div>
            <PlayArrowIcon />
            <div className="background-recording"></div>
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
      </ul>
    </ScrollToBottom>
  );
};

export default VoiceRecordingChat;
