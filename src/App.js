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


function App() {
  return (
      <Router>
        <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard/>} />
          <Route exact path="/contacts" element={<Contacts/>} />
        </Routes>
        </Layout>
        <ToastContainer />
      </Router>
  );
}

export default App;
