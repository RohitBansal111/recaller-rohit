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
import { buyTopupPlan } from "../../api/plans";
import { getTopUp } from "../../api/subscription";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { Button, Row, Col, Modal } from "react-bootstrap";
const stripePromise = loadStripe(
  "pk_test_51JPsinAhUO0LEMorfVu3TFyzUWo3i1n7jowbZqsf0BI0cK9mL4Leg2p7Kz1J1L4J3Rn9FdnWAXTVnq586ECRbrUL00aTx3yEWY"
);
const TopUp = ({
  monthlytoggleClass,
  annualtoggleClass,
  smstoggleClass,
  monthisActive,
  annualisActive,
  smsisActive,
}) => {
  const [open, setOpen] = useState(false);
  const [isSms, setIsSms] = useState(false);
  const [isVoice, setIsVoice] = useState(false);
  const [isMMS, setIsMMS] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeProduct, setActiveProduct] = useState("SMS");
  const [userType, setUserType] = useState("sub");
  const [ApiData, setapiData] = useState({});
  const [dataStripe, setDataStripe] = useState({
    type: "no data",
    amount: 0,
    description: "",
    cridit: 0,
  });
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
      setData(ApiData[type]);
    } else if (type == "MMS") {
      setData(ApiData[type]);
    } else {
      setData(ApiData[type]);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleClose = () => {
    setOpen(false);
  };
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

  const handleBuyTopUp = async (price, criditNo) => {
    setDataStripe({
      ...dataStripe,
      type: activeProduct,
      amount: price,
      description: `${activeProduct} TopUp recaller`,
      cridit: criditNo,
    });
    setOpen(true);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleGetData = async () => {
    let res = await getTopUp();
    if (res && res.data && res.status == 200) {
      console.log(res.data.data);
      setapiData(res.data.data);
      handleproduct("SMS");
      setData(res.data.data.SMS);
    }
  };
  useEffect(() => {
    //  setUserType(usercheck.paln);
    handleGetData();
  }, []);

  useEffect(() => {
    handleproduct("SMS");
    setIsSms(true);
    setIsMMS(false);
    setIsVoice(false);
  }, []);

  let usercheck = JSON.parse(Cookies.get("userData"));
  const { type, amount, description, cridit } = dataStripe;

  return (
    <>
      <Modal show={open} onHide={handleClose} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>
            {type} {usercheck?.plan == "free" ? "Solo Credits" : "Topup"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              type={type}
              amount={amount}
              description={description}
              cridit={cridit}
              handleClose={handleClose}
              loading={loading}
              setLoading={setLoading}
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
              Annual
            </Button>
            <Button
              className={smsisActive ? "active" : null}
              onClick={smstoggleClass}
            >
              {usercheck?.plan == "free" ? "Solo Credits" : "Top Up"}
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
                <h6
                  style={{
                    textAlign: "center",
                    marginLeft: "30%",
                  }}
                >
                  {capitalizeFirstLetter(q)}
                </h6>

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
                            <td>{numberWithCommas(w.quantity)}</td>
                            <td>${numberWithCommas(w.amount)}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  handleBuyTopUp(w.amount, w.quantity);
                                }}
                              >
                                Buy
                              </Button>
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

const CheckoutForm = ({
  type,
  amount,
  description,
  cridit,
  handleClose,
  loading,
  setLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
  });
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
      } else {
        handleTopupBuy(result.token);
        console.log(result.token);
        // const { client_secret, status } = res.data;

        // if (status === "requires_action") {
        //   stripe.confirmCardPayment(client_secret).then(function (result) {
        //     if (result.status == false) {
        //       toast.error(result.error);

        //       setLoading(false);
        //       // Display error message in your UI.
        //       // The card was declined (i.e. insufficient funds, card has expired, etc)
        //     } else {
        //       // Show a success message to your customer
        //       toast.success(result.massage);
        //       Cookies.remove("token");
        //       handleClose();
        //       setLoading(false);
        //       navigate("/login");
        //     }
        //   });
        // } else {
        //   if (!res.status) {
        //     toast.error(res.data.massage || "SomeThing Went Wrong");
        //     setLoading(false);
        //   } else {
        //     toast.success(res.data.status);
        //     handleClose();
        //     setLoading(false);
        //     navigate("/login");
        //   }

        //   // No additional information was needed
        //   // Show a success message to your customer
        // }
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThing went wrong try again");
      handleClose();
      setLoading(false);
    }
  };

  const handleTopupBuy = async (token) => {
    try {
      let dataAll = {
        payment_method: token.id,
        email: details.email,
        name: details.name,
        amount: amount,
        type: type,
        description: description,
        cridit: cridit,
      };
      const res = await buyTopupPlan(dataAll);

      const { status, massage, chargeValue } = res.data;
      toast.success(massage);
      handleClose();
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    const userDataCookies = JSON.parse(Cookies.get("userData"));
    if (userDataCookies !== null) {
      setDetails({
        ...details,
        name: userDataCookies.name,
        email: userDataCookies.email,
      });
    }
    if (userData !== null) {
      setDetails({
        ...details,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
      });
    }
  }, []);

  return (
    <div className="price-detail-popup">
      <form onSubmit={handleSubmit}>
        <div className="blankdiv">
          <input
            type="text"
            value={details.name}
            className="inputCssname form-control"
            placeholder="Enter Name"
            disabled={true}
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
            className="inputCssemail form-control"
            placeholder="Enter Email"
            disabled={true}
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
            className="paybtn butnn"
          >
            {loading ? "Loading..." : "Pay"}
          </button>
          <button
            type="button"
            className="canclebtn butnntwo"
            disabled={loading}
            onClick={() => handleClose()}
          >
            {loading ? "Loading..." : "Cancle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopUp;
