import React from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { FiCheck } from "react-icons/fi";

const PriceTable = (props) => {
  return (
    <div>
      <div className="subscribe-list">
        <Row>
          <Col xs={4}>
            <div className="card pricing-list">
              <div className="card-header">
                <div className="price-heading"></div>
              </div>
              <div className="card-body">
                <ul>
                  <li>SMS</li>
                  <li>SMS Credits p/m</li>
                  <li>MMS</li>
                  <li>MMS Credits p/m</li>
                  <li>Text Templates</li>
                  <li>Text Keywords</li>
                  <li>Email</li>
                  <li>Email Credits</li>
                  <li>Email Keywords</li>
                  <li>Email Templates</li>
                  <li>CRM</li>
                  <li>Custom AI Chatbot</li>
                  <li>Recall Search Engine</li>
                  <li>3 Recallr Searches P/M</li>
                  <li>Recallr Predictive AI</li>
                  <li>Widget</li>
                  <li>CRM Integration</li>
                </ul>
              </div>
            </div>
          </Col>
          {/* Free Sub */}
          <Col xs={2}>
            <div className="card">
              <div className="card-header free-price-list">
                <div className="price-heading">
                  <h5 className="card-title">Free</h5>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>3</span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                </ul>
                <Button>Get Started</Button>
              </div>
            </div>
          </Col>
          {/* 149 Sub  */}
          <Col xs={2}>
            <div className="card starter-price">
              <div className="card-header">
                <div className="recm-title">
                  <h1>Our Recommendation</h1>
                </div>
                <div className="price-heading">
                  <h5 className="card-title">Starter</h5>
                  <div className="time-period">
                    <h6
                      className={
                        props.monthisActive ? "monthly active" : "monthly"
                      }
                    >
                      <sup>$</sup>149<small>/mo</small>
                    </h6>
                    <h6
                      className={
                        props.annualisActive ? "yearly active" : "yearly"
                      }
                    >
                      <sup>$</sup>1,430<small>/yr</small>
                    </h6>
                    {
                      // <h6 className={smsisActive ? "sms active" : "sms"}>
                      //   <sup>$</sup>149<small>/yr</small>
                      // </h6>
                    }
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>500</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>500</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>3</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>500</span>
                  </li>
                  <li>
                    <span>3</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>Unlimited</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={() => {
                    props.hnadleSub_Button("starter", 149);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Col>
          {/* 319 Subscription */}
          <Col xs={2}>
            <div className="card">
              <div className="card-header">
                <div className="price-heading">
                  <h5 className="card-title">Communicator</h5>
                  <div className="time-period">
                    <h6
                      className={
                        props.monthisActive ? "monthly active" : "monthly"
                      }
                    >
                      <sup>$</sup>319<small>/mo</small>
                    </h6>
                    <h6
                      className={
                        props.annualisActive ? "yearly active" : "yearly"
                      }
                    >
                      <sup>$</sup>3,828<small>/yr</small>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>1500</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>1500</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>5</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>1500</span>
                  </li>
                  <li>
                    <span>5</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>Unlimited</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={() => {
                    props.hnadleSub_Button("communicator", 149);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Col>
          {/* 649 Subscription */}
          <Col xs={2}>
            <div className="card">
              <div className="card-header">
                <div className="price-heading">
                  <h5 className="card-title">Hyper</h5>
                  <div className="time-period">
                    <h6
                      className={
                        props.monthisActive ? "monthly active" : "monthly"
                      }
                    >
                      <sup>$</sup>649<small>/mo.</small>
                    </h6>
                    <h6
                      className={
                        props.annualisActive ? "yearly active" : "yearly"
                      }
                    >
                      <sup>$</sup>7788<small>/yr</small>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>5000</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>5000</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>10</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>5000</span>
                  </li>
                  <li>
                    <span>10</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <MdClose />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>Unlimited</span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FiCheck />
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={() => {
                    props.hnadleSub_Button("hyper", 149);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PriceTable;
