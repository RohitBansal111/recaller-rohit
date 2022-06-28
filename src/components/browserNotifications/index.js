import React, { useState,useEffect } from "react";
import Notification from "react-web-notification";
import NotificationIcon from "../../assets/icons/Notifications_button_24.png";
import { socket } from "../../helper/socket";
import addNotification from 'react-push-notification';

//allow react dev tools work
window.React = React;

 const BroNotifcation =(props) => {
  const [ignore, setIgnore] = useState(true);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState({});
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ignore: true,
  //     title: ""
  //   };
  // }
  function getNotificationsEventHandler(data){

    console.log("notification event socket:::::::",data)
if(data && data.userId){
  let userObj =localStorage.getItem('userData')
  if(userObj)userObj = JSON.parse(userObj)
  if(userObj && userObj.id && userObj.id==data.userId){

    newMethod(data.title?data.title:'',data.body?data.body:'')
  }

}
  };
  useEffect(() => {
    socket.on('getNotifications', getNotificationsEventHandler);
   // unsubscribe from event for preventing memory leaks
   return () => {
     socket.off('getNotifications',getNotificationsEventHandler);
   };
 }, []);

 function handlePermissionGranted() {
    console.log("Permission Granted");
    setIgnore(false)
    // this.setState({
    //   ignore: false
    // });
  }
  function handlePermissionDenied() {
    console.log("Permission Denied");
    setIgnore(true)
    // this.setState({
    //   ignore: true
    // });
  }
  function handleNotSupported() {
    console.log("Web Notification not Supported");
    setIgnore(true)
  }

  function  handleNotificationOnClick(e, tag) {
    console.log(e, "Notification clicked tag:" + tag);
  }

  function handleNotificationOnError(e, tag) {
    console.log(e, "Notification error tag:" + tag);
  }

  function handleNotificationOnClose(e, tag) {
    console.log(e, "Notification closed tag:" + tag);
  }

  function handleNotificationOnShow(e, tag) {
    playSound();
    console.log(e, "Notification shown tag:" + tag);
  }

  function playSound(filename) {
    document.getElementById("sound").play();
  }
  const newMethod =(t,b)=>{
    addNotification({
      title: t?t:'Notification',
      // subtitle: 'This is a subtitle',
      icon: NotificationIcon,
      message:b?b:'This is a very long message',
      theme: 'darkblue',
      native: true // when using native, your OS will handle theming.
  })
  }

  const handleButtonClick =(t='',b='')=> {
    if (ignore) {
      return;
    }
    const now = Date.now();
    const body = b?b:"This is Notifcation body";
    const tag = now;
    const icon =NotificationIcon
      // "http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png";
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: "en",
      dir: "ltr",
    //   sound: "../sound.mp3"
    };

    setTitle(t?t:'Notification')
    setOptions(options)
    // this.setState({
    //   title: title,
    //   options: options
    // });
    handleButtonClick2()
  }

  const handleButtonClick2 =()=> {
    props.swRegistration
      .getNotifications({})
      .then(function(notifications) {
        console.log(notifications);
      });
  }

  
    return (
      <div>
        {/* <button style={{}}  onClick={()=>{        ;}}>testtt</button>
        {document.title === "swExample" && (
          <button onClick={handleButtonClick2}>
            swRegistration.getNotifications
          </button>
        )} */}
        <Notification
          ignore={ignore}
          notSupported={handleNotSupported}
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        //   onShow={handleNotificationOnShow}
          onClick={handleNotificationOnClick}
          onClose={handleNotificationOnClose}
          onError={handleNotificationOnError}
          timeout={5000}
          title={title} 
          options={options}
          swRegistration={props.swRegistration}
        />
        <audio id="sound" preload="auto">
          <source src="../sound.mp3" type="audio/mpeg" />
          <source src="../sound.ogg" type="audio/ogg" />
          <embed
            hidden={true}
            autostart="false"
            loop={false}
            src="./sound.mp3"
          />
        </audio>
      </div>
    );
  
}
export default BroNotifcation
