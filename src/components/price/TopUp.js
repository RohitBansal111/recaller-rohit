import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { MdClose } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import Select from "react-select";
import Logo from "../../assets/images/logo.svg";
import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { Button, Row, Col, Modal } from "react-bootstrap";

const TopUp = ({
  monthlytoggleClass,
  annualtoggleClass,
  smstoggleClass,
  monthisActive,
  annualisActive,
  smsisActive,
}) => {
  const [isSms, setIsSms] = useState(false);
  const [isVoice, setIsVoice] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [data, setData] = useState([]);
  const [activeProduct, setActiveProduct] = useState("SMS");

  const SmsToggleClass = () => {
    setIsSms(true);
    setIsEmail(false);
    setIsVoice(false);
  };
  const VoiceToggleClass = () => {
    setIsVoice(true);
    setIsEmail(false);
    setIsSms(false);
  };
  const EmailToggleClass = () => {
    setIsEmail(true);
    setIsSms(false);
    setIsVoice(false);
  };

  const handleproduct = (type) => {
    setActiveProduct(type);
    if (type == "SMS") {
      setData(sms);
    } else if (type == "Email") {
      setData(email);
    } else {
      setData(voice);
    }
  };

  useEffect(() => {
    handleproduct("SMS");
    setIsSms(true);
    setIsEmail(false);
    setIsVoice(false);
  }, []);

  let sms = [
    {
      quantity: 1000,
      amount: 50,
    },
    {
      quantity: 2500,
      amount: 125,
    },
    {
      quantity: 5000,
      amount: 250,
    },
    {
      quantity: 10000,
      amount: 250,
    },
  ];
  let email = [
    {
      quantity: 1000,
      amount: 40,
    },
    {
      quantity: 1000,
      amount: 40,
    },
    {
      quantity: 1000,
      amount: 40,
    },
  ];
  let voice = [
    {
      quantity: 1000,
      amount: 30,
    },
    {
      quantity: 1000,
      amount: 400,
    },
    {
      quantity: 1000,
      amount: 4833,
    },
  ];
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
          <Button
            className={smsisActive ? "active" : null}
            onClick={smstoggleClass}
          >
            Top Up
          </Button>
        </div>

        <div className="subscribe-mbtn">
          <Button
            className={isSms ? "active" : null}
            onClick={() => {
              handleproduct("SMS");
              SmsToggleClass();
            }}
          >
            SMS
          </Button>
          <Button
            className={isVoice ? "active" : null}
            onClick={() => {
              handleproduct("Voice");
              VoiceToggleClass();
            }}
          >
            Voice
          </Button>
          <Button
            className={isEmail ? "active" : null}
            onClick={() => {
              handleproduct("Email");
              EmailToggleClass();
            }}
          >
            Email
          </Button>
        </div>

        <h1 style={{ textAlign: "center" }}>{activeProduct}</h1>
        <div className="subscribe-list">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Credit quantity</th>
                <th scope="col">Credit quantity</th>
                <th scope="col">Select</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => {
                return (
                  <tr>
                    <td>{i.quantity}</td>
                    <td>{i.amount}</td>
                    <td>
                      <Button>Buy</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
