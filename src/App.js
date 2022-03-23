import './styles/Main.scss';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './pages/contacts';
import Dashboard from './pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Layout from './components/layout'
import "react-bootstrap-wizard/dist/react-wizard.scss"
import 'material-icons/iconfont/material-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecallrAI from './pages/recallr-AI';
import Setting from './pages/settings';
import TextPage from './pages/text';
import Search from './pages/search';
import Voice from './pages/voice';
import MyAccount from './pages/admin/account';
import LocalMessages from './pages/settings/localMessage';



function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />
            <Route exact path="/contacts" element={<Contacts/>} />
            <Route exact path="/recallr-AI" element={<RecallrAI/>} />
            <Route exact path="/settings" element={<Setting/>} />
            <Route exact path="/settings/local-messages" element={<LocalMessages/>} />
            <Route exact path="/text" element={<TextPage/>} />
            <Route exact path="/search" element={<Search/>} />
            <Route exact path="/voice" element={<Voice/>} />
            <Route exact path="/admin/account" element={<MyAccount/>} />
          </Routes>
        </Layout>
        <ToastContainer />
      </Router>
  );
}

export default App;
