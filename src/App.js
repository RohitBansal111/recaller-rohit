import './styles/Main.scss';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './pages/contacts';
import Dashboard from './pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
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


function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />
            <Route exact path="/contacts" element={<Contacts/>} />
            <Route exact path="/recallr-AI" element={<RecallrAI/>} />
            <Route exact path="/settings" element={<Setting/>} />
            <Route exact path="/text" element={<TextPage/>} />
            <Route exact path="/search" element={<Search/>} />
            <Route exact path="/voice" element={<Voice/>} />
          </Routes>
        </Layout>
        <ToastContainer />
      </Router>
  );
}

export default App;
