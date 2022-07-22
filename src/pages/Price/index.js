import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { MdClose } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import Select from "react-select";
import { Button, Row, Col, Card } from "react-bootstrap";
const Price = () => {
  return (
    <div className="form-page-layout">
      <div className="price-page-layout">
        <Row>
          <Col xs={3}>
            <div className="card">
              <div className="card-header">
                <div className="price-heading">
                  <h5 className="card-title">Free</h5>
                  <div className="time-period">
                    <h6 className="monthly">
                      <sup>$</sup>0<small>/mo</small>
                    </h6>
                    <h6 className="Yearly">
                      <sup>$</sup>0<small>/yr</small>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    SMS
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    SMS Credits p/m
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    MMS
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    MMS Credits p/m
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Text Templates
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Text Keywords
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Email
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Email Credits
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Email Keywords
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Email Templates
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    CRM
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Custom AI Chatbot
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recall Search Engine
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    3 Recallr Searches P/M
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Recallr Predictive AI
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Widget
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    CRM Integration
                  </li>
                </ul>
                <Button>Get Started</Button>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="card">
              <div className="card-header">
                <div className="price-heading">
                  <h5 className="card-title">Starter</h5>
                  <div className="time-period">
                    <h6 className="monthly">
                      <sup>$</sup>149<small>/mo</small>
                    </h6>
                    <h6 className="yearly">
                      <sup>$</sup>1,430<small>/yr</small>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    SMS
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    500 SMS Credits p/m
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    MMS
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    500 MMS Credits p/m
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Text Templates
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    3 Text Keywords
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Email
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    500 Email Credits
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    3 Email Keywords
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Email Templates
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    CRM
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Custom AI Chatbot
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recall Search Engine
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Unlimited Recallr Searches P/M
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recallr Predictive AI
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Widget
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    CRM Integration
                  </li>
                </ul>
                <Button>Get Started</Button>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="card">
              <div className="card-header">
                <div className="price-heading">
                  <h5 className="card-title">Communicator</h5>
                  <div className="time-period">
                    <h6 className="monthly">
                      <sup>$</sup>319<small>/mo</small>
                    </h6>
                    <h6 className="yearly">
                      <sup>$</sup>3,828<small>/yr</small>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    SMS
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    1500 SMS Credits p/m
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    MMS
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    1500 MMS Credits p/m
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Text Templates
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    5 Text Keywords
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Email
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    1500 Email Credits
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    5 Email Keywords
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Email Templates
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    CRM
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Custom AI Chatbot
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recall Search Engine
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Unlimited Recallr Searches P/M
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recallr Predictive AI
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Widget
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    CRM Integration
                  </li>
                </ul>
                <Button>Get Started</Button>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className="card">
              <div className="card-header">
                <div className="price-heading">
                  <h5 className="card-title">Hyper</h5>
                  <div className="time-period">
                    <h6 className="monthly">
                      <sup>$</sup>649<small>/mo.</small>
                    </h6>
                    <h6 className="yearly">
                      <sup>$</sup>7788<small>/yr</small>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    SMS
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    5000 SMS Credits p/m
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    MMS
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    5000 MMS Credits p/m
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Text Templates
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    10 Text Keywords
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Email
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    5000 Email Credits
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    10 Email Keywords
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Email Templates
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    CRM
                  </li>
                  <li className="text-muted">
                    <span className="mr-3">
                      <MdClose />
                    </span>
                    Custom AI Chatbot
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recall Search Engine
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Unlimited Recallr Searches P/M
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Recallr Predictive AI
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    Widget
                  </li>
                  <li>
                    <span className="mr-3">
                      <FiCheck />
                    </span>
                    CRM Integration
                  </li>
                </ul>
                <Button>Get Started</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Price;
