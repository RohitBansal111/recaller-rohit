import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
// import signup from "../../api/user";
import { signup } from "../../api/user";
const Signup = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [check, setCheck] = useState(false);
  const communicator = [
    {
      label: "Plan Price : $3,828",
      value: "Plan Price : $3,828",
      color: "#00B8D9",
      isFixed: true,
    },
    {
      label: "Plan Price : $3,528",
      value: "Plan Price : $3,528",
    },
    {
      label: "Plan Price : $2,828",
      value: "Plan Price : $2,828",
    },
  ];

  const planOptions = [
    {
      label: "Communicator",
      options: communicator,
    },
  ];
  console.log(planOptions, "planOptions");
  const planLabel = () => (
    <div>
      <span className="datalabel">
        {planOptions.map((item) => {
          return item.label;
        })}
      </span>
    </div>
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({});
  };

  const isValid = () => {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let formData = true;
    switch (true) {
      case !data.firstName:
        setErrors({ firstName: "First Name field is required!" });
        formData = false;
        break;
      case !data.lastName:
        setErrors({ lastName: "Last Name field is required!" });
        formData = false;
        break;
      case !data.email:
        setErrors({ email: "Email field is required!" });
        formData = false;
        break;
      case data.email && !regex.test(data.email):
        setErrors({ email: "Please enter valid email address!" });
        formData = false;
        break;
      case !data.phone:
        setErrors({ phone: "Phone field is required!" });
        formData = false;
        break;
      case !data.title:
        setErrors({ title: "Title field is required!" });
        formData = false;
        break;
      case !data.companyName:
        setErrors({ companyName: "Company name field is required!" });
        formData = false;
        break;
      case !data.password:
        setErrors({ password: "Password is required!" });
        formData = false;
        break;
      case data.password !== data.repeatPassword:
        setErrors({ repeatPassword: "Those passwords didn't match.Try again" });
        formData = false;
        break;
      case !check:
        setErrors({ checkbox: "Accept Term & Conditions" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const res = await signup(data);
      if (res && res.data && res.data.status === 200) {
        toast.success("Register successful!");
        let dataSend = {
          name: `${res.data.response.firstName} ${res.data.response.lastName}`,
          email: res.data.response.email,
          plan:"free"
        };
        Cookies.set("userData", JSON.stringify(dataSend), { expires: 1 });
        Cookies.set("token", res?.data?.response.jwt, { expires: 1 });
        navigate(`/price`);
      } else {
        toast.error(res.data.message);
      }
    }
  };
  console.log(errors, "Sighnnnnn");

  return (
    <div className="form-page-layout">
      <div className="center-form-box signup-form">
        <div className="heading">
          <h2>Welcome,</h2>
          <p>
            It only takes a few seconds to <b>Create your account</b>
          </p>
        </div>
        <form className="main-form signup-form" onSubmit={handleSubmit}>
          <div className="form-body ">
            <div className="flex-half-field">
              <div className="field-group flex-half">
                <label htmlFor="name"> First Name</label>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your First Name"
                  value={data.firstName}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.firstName}</span>
              </div>
              <div className="field-group flex-half">
                <label htmlFor="name">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Last Name"
                  value={data.lastName}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.lastName}</span>
              </div>
            </div>
            <div className="flex-half-field">
              <div className="field-group flex-half">
                <label htmlFor="name"> Email Address </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <span className="spanError">{errors.email}</span>
              </div>
              <div className="field-group flex-half">
                <label htmlFor="name">Phone</label>
                <input
                  name="phone"
                  type="number"
                  className="form-control"
                  placeholder="Enter phone Number"
                  value={data.phone}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.phone}</span>
              </div>
            </div>
            <div className="flex-half-field">
              <div className="field-group flex-half">
                <label htmlFor="name">Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Title"
                  value={data.title}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.title}</span>
              </div>
              <div className="field-group flex-half">
                <label htmlFor="name">Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Company name"
                  value={data.companyName}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.companyName}</span>
              </div>
            </div>
            <div className="flex-half-field">
              <div className="field-group flex-half">
                <label htmlFor="name"> Password </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  value={data.password}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.password}</span>
              </div>

              <div className="field-group flex-half">
                <label htmlFor="name"> Repeat Password </label>
                <input
                  name="repeatPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter repeat password"
                  value={data.repeatPassword}
                  onChange={handleChange}
                />
                <span className="spanError">{errors.repeatPassword}</span>
              </div>
            </div>
            <div className="field-group flexFull">
              <label>
                <input
                  id="checkbox"
                  name="checkbox"
                  type="checkbox"
                  checked={check}
                  // value={data.checkbox}
                  onChange={() => setCheck(!check)}
                />
                <span>Accept our Terms and Conditions.</span>
                <span className="spanError">{errors.checkbox}</span>
              </label>
            </div>
            <div className="account-field">
              <h1>
                Already have an account? <Link to="/Login">Sign in</Link>
              </h1>
            </div>
          </div>
          <div className="field-group flexFull submit-btn">
            <button type="submit" className="btn btn-primary">
              {/* <Link to="/Price">Create account</Link> */}
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
