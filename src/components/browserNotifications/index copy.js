import React from "react";
import Notification from "react-web-notification";

//allow react dev tools work
window.React = React;

export default class BroNotifcation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: ""
    };
  }

  handlePermissionGranted() {
    console.log("Permission Granted");
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied() {
    console.log("Permission Denied");
    this.setState({
      ignore: true
    });
  }
  handleNotSupported() {
    console.log("Web Notification not Supported");
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag) {
    console.log(e, "Notification clicked tag:" + tag);
  }

  handleNotificationOnError(e, tag) {
    console.log(e, "Notification error tag:" + tag);
  }

  handleNotificationOnClose(e, tag) {
    console.log(e, "Notification closed tag:" + tag);
  }

  handleNotificationOnShow(e, tag) {
    this.playSound();
    console.log(e, "Notification shown tag:" + tag);
  }

  playSound(filename) {
    document.getElementById("sound").play();
  }

  handleButtonClick() {
    if (this.state.ignore) {
      return;
    }

    const now = Date.now();

    const title = "Trying Web Notifications";
    const body = "This is Notifcation body";
    const tag = now;
    const icon =
      "http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png";
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: "en",
      dir: "ltr",
    //   sound: "../sound.mp3"
    };
    this.setState({
      title: title,
      options: options
    });
  }

  handleButtonClick2() {
    this.props.swRegistration
      .getNotifications({})
      .then(function(notifications) {
        console.log(notifications);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick.bind(this)}>Notify Me</button>
        {document.title === "swExample" && (
          <button onClick={this.handleButtonClick2.bind(this)}>
            swRegistration.getNotifications
          </button>
        )}
        <Notification
          ignore={this.state.ignore && this.state.title !== ""}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
        //   onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title} 
          options={this.state.options}
          swRegistration={this.props.swRegistration}
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
}
