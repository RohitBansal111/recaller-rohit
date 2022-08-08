import { useState } from "react";
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
import { Button, Row, Col, Modal } from "react-bootstrap";
import { CreateSubscription } from "../../api/plans";
const stripePromise = loadStripe(
  "pk_test_51JPsinAhUO0LEMorfVu3TFyzUWo3i1n7jowbZqsf0BI0cK9mL4Leg2p7Kz1J1L4J3Rn9FdnWAXTVnq586ECRbrUL00aTx3yEWY"
);

const Price = () => {
  const [monthisActive, setmonthisActive] = useState(true);
  const [open, setOpen] = useState();
  const [data, setData] = useState({
    name: "no data",
    price: 0,
  });
  const [type, setType] = useState("month");
  const [annualisActive, setannualisActive] = useState(false);
  const monthlytoggleClass = () => {
    setmonthisActive(true);
    setannualisActive(false);
    setType("month");
  };
  const annualtoggleClass = () => {
    setannualisActive(true);
    setmonthisActive(false);
    setType("year");
  };

  const hnadleSub_Button = (sub_name, sub_price) => {
    setData({
      ...data,
      amount: Number(sub_price) * 100,
      name: sub_name,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { name, price } = data;
  return (
    <>
      <Modal show={open} onHide={handleClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>{name} Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              planName={name}
              handleClose={handleClose}
              type={type}
            />
          </Elements>
        </Modal.Body>
      </Modal>
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
                            monthisActive ? "monthly active" : "monthly"
                          }
                        >
                          <sup>$</sup>149<small>/mo</small>
                        </h6>
                        <h6
                          className={
                            annualisActive ? "yearly active" : "yearly"
                          }
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
                    <Button
                      onClick={() => {
                        console.log("ggggg");
                        hnadleSub_Button("starter", 149);
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
                            monthisActive ? "monthly active" : "monthly"
                          }
                        >
                          <sup>$</sup>319<small>/mo</small>
                        </h6>
                        <h6
                          className={
                            annualisActive ? "yearly active" : "yearly"
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
                        hnadleSub_Button("communicator", 149);
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
                            monthisActive ? "monthly active" : "monthly"
                          }
                        >
                          <sup>$</sup>649<small>/mo.</small>
                        </h6>
                        <h6
                          className={
                            annualisActive ? "yearly active" : "yearly"
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
                        hnadleSub_Button("hyper", 149);
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
      </div>
    </>
  );
};
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "gray",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = ({ planName, handleClose, type }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [details, setDetails] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: details.email,
          name: details.name,
        },
      });

      if (result.error) {
        console.log(result.error.message);

        setLoading(false);
      } else {
        console.warn("pay Success");
        console.log(result);

        let dataAll = {
          payment_method: result.paymentMethod.id,
          email: details.email,
          name: details.name,
          plan: planName.toLowerCase(),
          type: type,
        };
        const res = await CreateSubscription(dataAll);
        console.log(res);
        // const { client_secret, status } = res.data;

        // if (status === "requires_action") {
        //   stripe.confirmCardPayment(client_secret).then(function (result) {
        //     if (result.error) {
        //       console.log(result.error.message);

        //       setLoading(false);
        //       // Display error message in your UI.
        //       // The card was declined (i.e. insufficient funds, card has expired, etc)
        //     } else {
        //       // Show a success message to your customer

        //       handleClose();
        //       setLoading(false);
        //     }
        //   });
        // } else {
        //   handleClose();
        //   setLoading(false);

        //   // No additional information was needed
        //   // Show a success message to your customer
        // }
      }
    } catch (error) {
      console.log(error);

      handleClose();
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="blankdiv">
        <input
          type="text"
          value={details.name}
          className="inputCssname"
          placeholder="Enter Name"
          onChange={(e) => {
            setDetails({
              ...details,
              name: e.target.value,
            });
          }}
        />
        <input
          type="text"
          value={details.email}
          className="inputCssemail"
          placeholder="Enter Email"
          onChange={(e) => {
            setDetails({
              ...details,
              email: e.target.value,
            });
          }}
        />
      </div>

      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div className="divFordispa">
        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className="butnn"
        >
          {loading ? "Loading..." : "Pay"}
        </button>
        <button
          type="button"
          className="butnntwo"
          disabled={loading}
          onClick={() => handleClose()}
        >
          {loading ? "Loading..." : "Cancle"}
        </button>
      </div>
    </form>
  );
};

export default Price;
