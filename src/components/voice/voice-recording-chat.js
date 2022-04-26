import React from "react";
import ReactAudioPlayer from 'react-audio-player';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ScrollToBottom from "react-scroll-to-bottom";
import Recording1 from './../../assets/recording/1.mp3'

const VoiceRecordingChat = (props) => {
  return (
    <ScrollToBottom className="middle-chat-screen voice-chat-screen">
      <ul>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <ReactAudioPlayer
              src={Recording1}
              volume= '0'
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box client">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
          </div>
          <span>
            <b>NH</b> 5:56 AM
          </span>
        </li>
        <li className="voice-chat-list">
          <div className="chat-ui-box user">
            <ReactAudioPlayer
              src={Recording1}
              controls
            />
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
