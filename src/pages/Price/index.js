import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { MdClose } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import Select from "react-select";
import Logo from "../../assets/images/logo.svg";
import { Button, Row, Col, Card } from "react-bootstrap";
const Price = () => {
  const [monthisActive, setmonthisActive] = useState(true);
  const [annualisActive, setannualisActive] = useState(false);
  const monthlytoggleClass = () => {
    setmonthisActive(true);
    setannualisActive(false);
  };
  const annualtoggleClass = () => {
    setannualisActive(true);
    setmonthisActive(false);
  };

  return (
    <div className="form-page-layout subscribe-pricing-list">
      <div className="price-page-layout">
        <div className="subscribe-price-headerbar">
          <div className="headerbar">
            <div className="logo">
              <img src={Logo} alt="Recallr" />
            </div>
          </div>
          <div className="header-title">
            <h1>Select the package that best suits your needs</h1>
            <p>Pay Monthly or save big with an annual Subscription</p>
          </div>
        </div>
        <div className="subscribe-mbtn">
          <Button
            className={monthisActive ? "active" : null}
            onClick={monthlytoggleClass}
          >
            Monthly
          </Button>
          <Button
            className={annualisActive ? "active" : null}
            onClick={annualtoggleClass}
          >
            annual
          </Button>
        </div>
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
            <Col xs={2}>
              <div className="card">
                <div className="card-header">
                  <div className="price-heading">
                    <h5 className="card-title">Starter</h5>
                    <div className="time-period">
                      <h6
                        className={monthisActive ? "monthly active" : "monthly"}
                      >
                        <sup>$</sup>149<small>/mo</small>
                      </h6>
                      <h6
                        className={annualisActive ? "yearly active" : "yearly"}
                      >
                        <sup>$</sup>1,430<small>/yr</small>
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
                  <Button>Get Started</Button>
                </div>
              </div>
            </Col>
            <Col xs={2}>
              <div className="card">
                <div className="card-header">
                  <div className="price-heading">
                    <h5 className="card-title">Communicator</h5>
                    <div className="time-period">
                      <h6
                        className={monthisActive ? "monthly active" : "monthly"}
                      >
                        <sup>$</sup>319<small>/mo</small>
                      </h6>
                      <h6
                        className={annualisActive ? "yearly active" : "yearly"}
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
                  <Button>Get Started</Button>
                </div>
              </div>
            </Col>
            <Col xs={2}>
              <div className="card">
                <div className="card-header">
                  <div className="price-heading">
                    <h5 className="card-title">Hyper</h5>
                    <div className="time-period">
                      <h6
                        className={monthisActive ? "monthly active" : "monthly"}
                      >
                        <sup>$</sup>649<small>/mo.</small>
                      </h6>
                      <h6
                        className={annualisActive ? "yearly active" : "yearly"}
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
                  <Button>Get Started</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Price;
