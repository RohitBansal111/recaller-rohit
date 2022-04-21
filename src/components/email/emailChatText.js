import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
const EmailChatText = () => {
  return (
    <ScrollToBottom className="middle-chat-screen">
        <ul>
          <li class="user">demo chat <p><b>Dev Test</b></p></li>
          <li class="user">testtesttesttest <p><b>Dev Test</b></p></li>
          <li class="client">hello <p><b>Dev Test</b></p></li>
          <li class="user">hello test <p><b>Dev Test</b></p></li>
          <li class="user">test <p><b>Dev Test</b></p></li>
          <li class="client">test demo <p><b>Dev Test</b></p></li>
          <li class="user">test <p><b>Dev Test</b></p></li>
          <li class="user">test <p><b>Dev Test</b></p></li>
          <li class="user">test new <p><b>Dev Test</b></p></li>
        </ul>
    </ScrollToBottom>
  );
};

export default EmailChatText;
