import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { dateSince } from "../../helper/dateFunction";
import { timeAgo } from "../../helper/timerFuntion";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ReScheduleMessageModal from "../../models/reScheduleMsg";
import {Tooltip} from '@mui/material';
import axios from "axios";
import moment from 'moment'

const TextChat = (props) => {
  const userData = useSelector((state) => state.Login.userData);

  var today = new Date();
  var dddd = new Date().toISOString().substring(0, 10);
  var ssss = today.getHours() + ":" + today.getMinutes();

const handleIamgeUrl=async(data)=>{
let imageBlob = (await axios.get(data, { responseType: 'blob' })).data
return await blobToBase64(imageBlob)
}
  
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

  return (
    <ScrollToBottom className="middle-chat-screen">
      <ul ref={props.divRef}>
        {props.chatData
          ? props.chatData.map((item) => (
              <>
                {/* <li className="date-update">
                  <span>{dateSince(item.createdAt)}</span>
                  <p></p>
                </li> */}
                <li>
                  <div
                    className={
                      item.sender === 1
                        ? "user chat-ui-box"
                        : "client chat-ui-box"
                    }
                  >
                    
                    {item.sheduled == true &&
                    new Date(item.sheduleDate) >= today ? (
                      <div className="scheduletext">
                       
                         <Tooltip title={`Schedule Date and Time is  ${moment(new Date(item?.sheduleDate)).format('MMMM Do YYYY, h:mm:ss a')}`}>
                        <button
                          type="button"
                        >
                         
                         
                          <ScheduleIcon />
                        </button>
                        </Tooltip>
                        <pre>{item.message.trim()}</pre>
                      </div>
                    ) : (
                      <pre>{item.message.trim()}</pre>
                    )}
                    {item?.imageUrl ? (
                      <>
                        <img src={item?.imageUrl} alt="img" />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <span>
                    <b>
                    
                      {item.sender === 1 && "user chat-ui-box"
                        ? <>{item.status ?item.status.charAt(0).toUpperCase() + item.status.slice(1)+'  ':userData.firstName + " " + userData.lastName + " "}</>
                        : "" || (item.sender === 2 && "client chat-ui-box")
                        ? props.selecteduser.contact.firstName +
                          " " +
                          props.selecteduser.contact.lastName +
                          " "
                        : ""}
                    </b>
                    {timeAgo(item.updatedAt)}
                  </span>
                  
                  
                </li>
              </>
            ))
          : []}
      </ul>
      <ReScheduleMessageModal
        showReScheduleModal={props.showReScheduleModal}
        handleCloseReSchedultModal={props.handleCloseReSchedultModal}
        reScheduleData={props.reScheduleData}
        handleReSchaduleChange={props.handleReSchaduleChange}
        handleReSubmit={props.handleReSubmit}
        handleCancelReSchedultModal={props.handleCancelReSchedultModal}
        cancelRescheDule={props.cancelRescheDule}
        handleNoReSchedultModal={props.handleNoReSchedultModal}
        handleDeleteReSchedultModal={props.handleDeleteReSchedultModal}
        handleDeleteRechaduletitle={props.handleDeleteRechaduletitle}
        schaduleData={props.schaduleData}
      />
    </ScrollToBottom>
  );
};

export default TextChat;
