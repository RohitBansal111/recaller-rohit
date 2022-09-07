import "./styles/Main.scss";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout";
import "react-responsive-modal/styles.css";
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
import Messenger from "./pages/messenger";
import WhatsApp from "./pages/whatsApp";
import AutoResponder from "./pages/settings/localMessage/autoresponder";
import Usage from "./pages/settings/localMessage/usage";
import ConversationTags from "./pages/settings/localMessage/tags";
import OPTInOut from "./pages/settings/localMessage/optInOut";
import ScheduledMessages from "./pages/settings/localMessage/scheduled-messages";
import Import from "./pages/contacts";
// import ImportCompaign from "./pages/viewCompaigns";
// import ViewCompaign from "./components/viewCompaign/ViewCompaign";
// import ViewCompaign from "./pages/viewCompaign/viewCompaign";

import { userDetailApi } from "./api/user";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Campaigncontact from "./pages/Campaignscontact";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import EmailPage from "./pages/email";
import EmailSetting from "./pages/settings/email";
import EmailSender from "./pages/settings/email/email-sender";
import Price from "./pages/Price";
import { socket } from "./helper/socket";
import { Notifications } from "react-push-notification";
import ViewCompaign from "./pages/viewCompaign/ViewCompaign";
import ViewCompaignContact from "./pages/viewCompaign/ViewCompaignContact";

const IsAuthenticated = ({ children }) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

const IsNotAuthenticated = ({ children }) => {
  const user = localStorage.getItem("token");
  if (user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

function App({ component: Component, ...rest }) {
  const dispatch = useDispatch();

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const user = localStorage.getItem("token");
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
        <Route
          path="/login"
          element={
            <IsNotAuthenticated>
              <Login />
            </IsNotAuthenticated>
          }
        />
        <Route
          path="/Signup"
          element={
            <IsNotAuthenticated>
              <Signup />
            </IsNotAuthenticated>
          }
        />
        <Route
          path="/Price"
          element={
            <IsNotAuthenticated>
              <Price />
            </IsNotAuthenticated>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <IsNotAuthenticated>
              <ForgotPassword />
            </IsNotAuthenticated>
          }
        />
        <Route
          path="/reset-password/:userId/:pwToken"
          element={
            <IsNotAuthenticated>
              <ResetPassword />
            </IsNotAuthenticated>
          }
        />
        <Route
          exact
          path="/"
          element={
            <IsAuthenticated>
              <Dashboard />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/auth/:token"
          element={
            <IsAuthenticated>
              <Auth />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/contacts"
          element={
            <IsAuthenticated>
              <Import />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/ViewCompaign/:id"
          element={
            <IsAuthenticated>
              {/* <ViewCompaign /> */}
              {/* <Import /> */}
              <ViewCompaignContact />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/viewcontacts"
          element={
            <IsAuthenticated>
              <Campaigncontact />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/recallr-AI"
          element={
            <IsAuthenticated>
              <RecallrAI />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings"
          element={
            <IsAuthenticated>
              <Setting />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/text"
          element={
            <IsAuthenticated>
              <LocalMessages />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/text"
          element={
            <IsAuthenticated>
              <TextPage />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/email"
          element={
            <IsAuthenticated>
              <EmailPage />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <IsAuthenticated>
              <Search />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/voice"
          element={
            <IsAuthenticated>
              <Voice />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/messenger"
          element={
            <IsAuthenticated>
              <Messenger />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/Detail"
          element={
            <IsAuthenticated>
              <Detail />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/whats-app"
          element={
            <IsAuthenticated>
              <WhatsApp />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/admin/account"
          element={
            <IsAuthenticated>
              <MyAccount />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/text/autoresponder"
          element={
            <IsAuthenticated>
              <AutoResponder />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/text/usage"
          element={
            <IsAuthenticated>
              <Usage />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/text/conversation-tags"
          element={
            <IsAuthenticated>
              <ConversationTags />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/text/opt-in-out"
          element={
            <IsAuthenticated>
              <OPTInOut />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/text/scheduled-messages"
          element={
            <IsAuthenticated>
              <ScheduledMessages />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/email"
          element={
            <IsAuthenticated>
              <EmailSetting />
            </IsAuthenticated>
          }
        />
        <Route
          exact
          path="/settings/email/email-sender"
          element={
            <IsAuthenticated>
              <EmailSender />
            </IsAuthenticated>
          }
        />
      </Routes>
      <ToastContainer limit={1} closeButton={false} />
      <Notifications />
    </Router>
  );
}

export default App;
