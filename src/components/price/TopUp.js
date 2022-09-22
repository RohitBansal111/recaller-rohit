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
  const [isMMS, setIsMMS] = useState(false);
  const [data, setData] = useState([]);
  const [activeProduct, setActiveProduct] = useState("SMS");

  const SmsToggleClass = () => {
    setIsSms(true);
    setIsMMS(false);
    setIsVoice(false);
  };
  const VoiceToggleClass = () => {
    setIsVoice(true);
    setIsMMS(false);
    setIsSms(false);
  };
  const MMSToggleClass = () => {
    setIsMMS(true);
    setIsSms(false);
    setIsVoice(false);
  };

  const handleproduct = (type) => {
    setActiveProduct(type);
    if (type == "SMS") {
      setData(sms);
    } else if (type == "MMS") {
      setData(mms);
    } else {
      setData(voice);
    }
  };

  useEffect(() => {
    handleproduct("SMS");
    setIsSms(true);
    setIsMMS(false);
    setIsVoice(false);
  }, []);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let sms = {
    "Valid for 180 days from purchase": [
      {
        quantity: 1000,
        amount: 50,
      },
      {
        quantity: 2500,
        amount: 113,
      },
      {
        quantity: 5000,
        amount: 200,
      },
      {
        quantity: 10000,
        amount: 400,
      },

      {
        quantity: 25000,
        amount: 750,
      },
      {
        quantity: 50000,
        amount: 1250,
      },
      {
        quantity: 100000,
        amount: 2200,
      },
      {
        quantity: 250000,
        amount: 5250,
      },
    ],
    // comunicator: [
    //   {
    //     quantity: 1000,
    //     amount: 50,
    //   },
    //   {
    //     quantity: 2500,
    //     amount: 125,
    //   },
    //   {
    //     quantity: 5000,
    //     amount: 250,
    //   },
    //   {
    //     quantity: 10000,
    //     amount: 500,
    //   },
    // ],
    // hyper: [
    //   {
    //     quantity: 1000,
    //     amount: 50,
    //   },
    //   {
    //     quantity: 2500,
    //     amount: 125,
    //   },
    //   {
    //     quantity: 5000,
    //     amount: 250,
    //   },
    //   {
    //     quantity: 10000,
    //     amount: 500,
    //   },
    // ],
  };

  let mms = {
    "Valid for 180 days from purchase": [
      {
        quantity: 1000,
        amount: 70,
      },
      {
        quantity: 2500,
        amount: 163,
      },
      {
        quantity: 5000,
        amount: 300,
      },
      {
        quantity: 10000,
        amount: 550,
      },

      {
        quantity: 25000,
        amount: 1250,
      },
      {
        quantity: 50000,
        amount: 2250,
      },
      {
        quantity: 100000,
        amount: 4000,
      },
      {
        quantity: 250000,
        amount: 5250,
      },
    ],
  };
  let voice = {
    "Valid for 180 days from purchase": [
      {
        quantity: 1000,
        amount: 60,
      },
      {
        quantity: 2500,
        amount: 145,
      },
      {
        quantity: 5000,
        amount: 275,
      },
      {
        quantity: 12000,
        amount: 360,
      },

      {
        quantity: 25000,
        amount: 875,
      },
      {
        quantity: 60000,
        amount: 1800,
      },
      {
        quantity: 120000,
        amount: 1800,
      },
      {
        quantity: 120000,
        amount: 3360,
      },

      {
        quantity: 270000,
        amount: 6480,
      },
      {
        quantity: 500000,
        amount: 9500,
      },
      {
        quantity: 1000000,
        amount: 14000,
      },
    ],
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
            Annual
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
            className={isMMS ? "active" : null}
            onClick={() => {
              handleproduct("MMS");
              MMSToggleClass();
            }}
          >
            MMS
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
        </div>
        {
          // <h1 style={{ textAlign: "center" }}>{activeProduct}</h1>
        }

        {Object.keys(data || {})?.map((q) => {
          return (
            <>
              <h1 style={{ textAlign: "center" }}>
                {capitalizeFirstLetter(q)}
              </h1>

              <div className="subscribe-list">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Volume</th>
                      <th scope="col">Price</th>
                      <th scope="col">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[q]?.map((w) => {
                      return (
                        <tr>
                          <td>{w.quantity}</td>
                          <td>${w.amount}</td>
                          <td>
                            <Button>Buy</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TopUp;
