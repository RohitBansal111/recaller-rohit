import "./styles/Main.scss";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
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
import { userDetailApi } from "./api/user";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";

const isAuthenticated = (component) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return component;
};

const isNotAuthenticated = (component) => {
  const user = localStorage.getItem("token");
  if (user) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  return component;
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
        <Route path="/login" element={isNotAuthenticated(<Login />)} />
        <Route
          path="/forgot-password"
          element={isNotAuthenticated(<ForgotPassword />)}
        />
        <Route
          path="/reset-password/:userId/:pwToken"
          element={isNotAuthenticated(<ResetPassword />)}
        />
      </Routes>
      <Layout>
        <Routes>
          <Route exact path="/" element={isAuthenticated(<Dashboard />)} />
          <Route
            exact
            path="/auth/:token"
            element={isAuthenticated(<Auth />)}
          />
          <Route exact path="/contacts" element={isAuthenticated(<Import />)} />
          <Route
            exact
            path="/recallr-AI"
            element={isAuthenticated(<RecallrAI />)}
          />
          <Route
            exact
            path="/settings"
            element={isAuthenticated(<Setting />)}
          />
          <Route
            exact
            path="/settings/local-messages"
            element={isAuthenticated(<LocalMessages />)}
          />
          <Route exact path="/text" element={isAuthenticated(<TextPage />)} />
          <Route exact path="/search" element={isAuthenticated(<Search />)} />
          <Route exact path="/voice" element={isAuthenticated(<Voice />)} />
          <Route
            exact
            path="/messenger"
            element={isAuthenticated(<Messenger />)}
          />
          <Route
            exact
            path="/whats-app"
            element={isAuthenticated(<WhatsApp />)}
          />
          <Route
            exact
            path="/admin/account"
            element={isAuthenticated(<MyAccount />)}
          />
          <Route
            exact
            path="/settings/local-messages/autoresponder"
            element={isAuthenticated(<AutoResponder />)}
          />
          <Route
            exact
            path="/settings/local-messages/usage"
            element={isAuthenticated(<Usage />)}
          />
          <Route
            exact
            path="/settings/local-messages/conversation-tags"
            element={isAuthenticated(<ConversationTags />)}
          />
          <Route
            exact
            path="/settings/local-messages/opt-in-out"
            element={isAuthenticated(<OPTInOut />)}
          />
          <Route
            exact
            path="/settings/local-messages/scheduled-messages"
            element={isAuthenticated(<ScheduledMessages />)}
          />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;
