import "./styles/Main.scss";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout";
import 'react-responsive-modal/styles.css';
import "material-icons/iconfont/material-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecallrAI from "./pages/recallr-AI";
import Setting from "./pages/settings";
import TextPage from "./pages/text";
import Search from "./pages/search";
import Voice from "./pages/voice";
import Auth from "./pages/Auth";
import { loginAction } from "../src/redux/actions/loginAction";
import { useDispatch } from "react-redux";
import "bootstrap/dist/js/bootstrap.js";
import "./styles/Main.scss";
import MyAccount from "./pages/admin/account";
import LocalMessages from "./pages/settings/localMessage";
import Messenger from './pages/messenger';
import WhatsApp from './pages/whatsApp';
import AutoResponder from "./pages/settings/localMessage/autoresponder";
import Usage from "./pages/settings/localMessage/usage";
import ConversationTags from "./pages/settings/localMessage/tags";
import OPTInOut from "./pages/settings/localMessage/optInOut";
import ScheduledMessages from "./pages/settings/localMessage/scheduled-messages";
import Import from "./pages/contacts";
import { userDetailApi } from "./api/user";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";

const user = localStorage.getItem("token");

function App({component: Component, ...rest}) {
  const dispatch = useDispatch();

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (user && userData) {
      // eslint-disable-next-line no-undef
      const res = await userDetailApi(userData.id);
      if (res && res.data && res.data.status === 200) {
        dispatch(loginAction(res.data.data));
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
      </Routes>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/auth/:token" element={<Auth />} />
          <Route exact path="/import" element={<Import />} />
          <Route exact path="/recallr-AI" element={<RecallrAI />} />
          <Route exact path="/settings" element={<Setting />} />
          <Route exact path="/settings/local-messages" element={<LocalMessages />} />
          <Route exact path="/text" element={<TextPage />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/voice" element={<Voice />} />
          <Route exact path="/messenger" element={<Messenger />} />
          <Route exact path="/whats-app" element={<WhatsApp />} />
          <Route exact path="/admin/account" element={<MyAccount />} />
          <Route exact path="/settings/local-messages/autoresponder" element={<AutoResponder />} />
          <Route exact path="/settings/local-messages/usage" element={<Usage />} />
          <Route exact path="/settings/local-messages/conversation-tags" element={<ConversationTags />} />
          <Route exact path="/settings/local-messages/opt-in-out" element={<OPTInOut />} />
          <Route exact path="/settings/local-messages/scheduled-messages" element={<ScheduledMessages />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;
