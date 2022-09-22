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
import { CreateSubscription, CreateSubscriptionFree } from "../../api/plans";
import TopUp from "../../components/price/TopUp";
import {getSubscription} from '../../api/subscription'
import Layout from "../../components/layout";
const stripePromise = loadStripe(
  "pk_test_51JPsinAhUO0LEMorfVu3TFyzUWo3i1n7jowbZqsf0BI0cK9mL4Leg2p7Kz1J1L4J3Rn9FdnWAXTVnq586ECRbrUL00aTx3yEWY"
);

const Price = () => {
  const navigate=useNavigate()
  const [monthisActive, setmonthisActive] = useState(true);
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "no data",
    price: 0,
  });
  const [type, setType] = useState("month");
  const [annualisActive, setannualisActive] = useState(false);
  const [smsisActive, setsmsisActive] = useState(false);

  const [isSms, setIsSms] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isVoice, setIsVoice] = useState(false);
  const [tyeOfPage, settypeOfPage] = useState("sub");
  const [subData, setSubData]=useState({})
  const [typeCheck , setTypeCheck]=useState('monthly')

  const monthlytoggleClass = () => {
    settypeOfPage("sub");
    setmonthisActive(true);
    setannualisActive(false);
    setsmsisActive(false);
    setType("month");
    setTypeCheck("monthly")
  };
  const annualtoggleClass = () => {
    setannualisActive(true);
    setmonthisActive(false);
    setsmsisActive(false);
    setType("year");
    settypeOfPage("sub");
    setTypeCheck("yearly")
  };

  const smstoggleClass = () => {
    settypeOfPage("topup");

    setmonthisActive(false);
    setannualisActive(false);
    setsmsisActive(true);
    setType("sms");
    setTypeCheck("monthly")
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

  const handleFreeData = async () => {
    const res = await CreateSubscriptionFree();
    if (res.status) {
      toast.success(res.data.massage);
      Cookies.remove("token");
      handleClose();
      setLoading(false);
      navigate("/login");
    } else {
      toast.error(res.data.massage);
      setLoading(false);
    }
  };

  const handleGetData = async () => {
    let res = await getSubscription();
    if (res && res.data && res.status == 200) {
      let data={
        Sub_data:res?.data?.subData,
        sub_price:res?.data?.subprice
      }
      setSubData(data);
    }
  };
  useEffect(()=>{
    handleGetData()
  },[])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { name, price } = data;
  return (
    <>
    <Layout>
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
              loading={loading}
              setLoading={setLoading}
            />
          </Elements>
        </Modal.Body>
      </Modal>
      {tyeOfPage == "sub" ? (
        <div className="form-page-layout subscribe-pricing-list">
          <div className="price-page-layout">
            <div className="subscribe-price-headerbar">
              <div className="headerbar">
              <div className="logo" onClick={()=>{
                navigate('/')
              }}>
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
                        {/* <li>Email</li>
                        <li>Email Credits</li>
                        <li>Email Keywords</li>
                        <li>Email Templates</li> */}
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
                {
                  Object.keys(subData?.Sub_data ||{})?.map((w)=>{
                    return (
                      <Col xs={2}>
                      <div className="card starter-price">
                        <div className="card-header">
                          {console.log(w)}

                          {
                            w=="communicator" &&<div className="recm-title">
                            <h1>Our Recommendation</h1>
                          </div>
                          }
                         
                          <div className="price-heading">
                            <h5 className="card-title">{capitalizeFirstLetter(w)}</h5>
                            <div className="time-period">
                              <h6
                            className={
                              monthisActive || annualisActive ? "monthly active" : "monthly"
                            }
                          >
                          <sup>{w == 'free'?'':'$' }</sup>{subData && subData?.sub_price && subData?.sub_price[w]&& subData?.sub_price[w][typeCheck] ||''}<small>{w == 'free'?'':typeCheck=='yearly' ? '/yr':'/mo'}</small>
                          </h6>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <ul>
                            <li>
                              <span>
                                {subData?.Sub_data[w]?.sms?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                              <span> {subData?.Sub_data[w]?.sms_cridit==0?<MdClose />: subData?.Sub_data[w]?.sms_cridit}</span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.mms?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                            <span> {subData?.Sub_data[w]?.mms_cridit==0?<MdClose />: subData?.Sub_data[w]?.mms_cridit}</span>

                            </li>
                            {/* <li>
                              <span>
                              {subData?.Sub_data[w]?.mms?<FiCheck />: <MdClose />}

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
                            </li> */}
                            <li>
                            <span> {subData?.Sub_data[w]?.text_keywords==0?<MdClose />: subData?.Sub_data[w]?.text_keywords}</span>

                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.text_templates?<FiCheck />: <MdClose />}

                              </span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.crm?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.chatbot?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.search_engine?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                            <span> {subData?.Sub_data[w]?.searches==0?<MdClose />: subData?.Sub_data[w]?.searches}</span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.predictive?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.widget?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                            <li>
                              <span>
                              {subData?.Sub_data[w]?.crm_integration?<FiCheck />: <MdClose />}
                              </span>
                            </li>
                          </ul>
                          <Button
                            onClick={() => {
                              if(w=='free'){
                                handleFreeData()
                              }else{
                                hnadleSub_Button(w, subData && subData?.sub_price && subData?.sub_price[w]&& subData?.sub_price[w][typeCheck]);
                              }
                            
                            }}
                          >
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </Col>
                    )
                  })
                }
              </Row>
            </div>
          </div>
        </div>
      ) : (
        <>
          <TopUp
            monthlytoggleClass={monthlytoggleClass}
            smstoggleClass={smstoggleClass}
            monthisActive={monthisActive}
            annualisActive={annualisActive}
            smsisActive={smsisActive}
            annualtoggleClass={annualtoggleClass}
          />
        </>
      )}
      </Layout>
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

const CheckoutForm = ({ planName, handleClose, type, loading, setLoading }) => {
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

      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: details.email,
          name: details.name,
        },
      });

      if (result.error) {
        toast.error(result.error.message);

        setLoading(false);
      } else {
        let dataAll = {
          payment_method: result.paymentMethod.id,
          email: details.email,
          name: details.name,
          plan: planName.toLowerCase(),
          type: type,
        };
        const res = await CreateSubscription(dataAll);

        const { client_secret, status } = res.data;

        if (status === "requires_action") {
          stripe.confirmCardPayment(client_secret).then(function (result) {
            if (result.status == false) {
              toast.error(result.error);

              setLoading(false);
              // Display error message in your UI.
              // The card was declined (i.e. insufficient funds, card has expired, etc)
            } else {
              // Show a success message to your customer
              toast.success(result.massage);
              Cookies.remove("token");
              handleClose();
              setLoading(false);
              navigate("/login");
            }
          });
        } else {
          if (!res.status) {
            toast.error(res.data.massage || "SomeThing Went Wrong");
            setLoading(false);
          } else {
            toast.success(res.data.status);
            handleClose();
            setLoading(false);
            navigate("/login");
          }

          // No additional information was needed
          // Show a success message to your customer
        }
      }
    } catch (error) {
      toast.error("SomeThing went wrong try again");
      handleClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("userData"));
    setDetails({
      ...details,
      name:userData.name,
      email: userData.email,
    })
  }, []);

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
