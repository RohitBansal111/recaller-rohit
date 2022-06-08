import React from "react";
import ReactAudioPlayer from "react-audio-player";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ScrollToBottom from "react-scroll-to-bottom";
import Recording1 from "./../../assets/recording/1.mp3";
import { timeAgo } from "../../helper/timerFuntion";
import { useSelector } from "react-redux";
import LoaderIcon from "../../assets/svg-icons/loaderIcon";
import { dateSince } from "../../helper/dateFunction";

const VoiceRecordingChat = (props) => {
  const userData = useSelector((state) => state.Login.userData);

  return (
    <ScrollToBottom className="middle-chat-screen voice-chat-screen">
      <ul ref={props.divRef}>
        {props.voiceChatData
          ? props.voiceChatData.map((item) => (
              <>
                {/* <li className="date-update">
                  <span>{dateSince(item.createdAt)}</span>
                  <p></p>
                </li> */}
                <li className="voice-chat-list">
                  <div
                    className={
                      item.sender === 1
                        ? "chat-ui-box user"
                        : "chat-ui-box client "
                    }
                  >
                    {props.isShowLoading && (
                      <div className="voice-sending-chat">
                        <LoaderIcon />
                      </div>
                    )}
                    <ReactAudioPlayer
                      src={`${process.env.REACT_APP_API_URL}/uploads/${item.message}`}
                      // volume="0"
                      controls
                      onLoadedMetadata={props.handleLoadMetadata}
                    />
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
              </>
            ))
          : []}
      </ul>
    </ScrollToBottom>
  );
};

export default VoiceRecordingChat;
