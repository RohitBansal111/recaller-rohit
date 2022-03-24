import "./styles/Main.scss";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Contacts from "./pages/contacts";
import Dashboard from "./pages/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout";
import "react-bootstrap-wizard/dist/react-wizard.scss";
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
import Autoresponder from "./pages/settings/localMessage/autoresponder";

const user = localStorage.getItem("token");

// const IsNotAuthenticated = ({ children }) => {
//   if (!user) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (user) {
      dispatch(loginAction(userData));
    }
  }, []);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/auth/:token" element={<Auth />} />
          <Route exact path="/contacts" element={<Contacts />} />
          <Route exact path="/recallr-AI" element={<RecallrAI />} />
          <Route exact path="/settings" element={<Setting />} />
          <Route exact path="/settings/local-messages" element={<LocalMessages />} />
          <Route exact path="/settings/local-messages/autoresponder" element={<Autoresponder />} />
          <Route exact path="/text" element={<TextPage />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/voice" element={<Voice />} />
          <Route exact path="/admin/account" element={<MyAccount />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;
