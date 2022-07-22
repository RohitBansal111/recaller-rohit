import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
const Signup = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
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
      case !data.name:
        setErrors({ name: "Name field is required!" });
        formData = false;
        break;
      case !data.lastname:
        setErrors({ lastname: "Last Name field is required!" });
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
      case !data.companyname:
        setErrors({ companyname: "Company name field is required!" });
        formData = false;
        break;
      case !data.password:
        setErrors({ password: "Password is required!" });
        formData = false;
        break;
      case !data.repeatpassword:
        setErrors({ repeatpassword: "Repeat Password is required!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  return (
    <div className="form-page-layout">
      <div className="center-form-box signup-form">
        <div className="heading">
          <h2>Welcome,</h2>
          <p>
            It only takes a few seconds to <b>Create your account</b>
          </p>
        </div>
        <form className="main-form signup-form">
          <div className="form-body ">
          <div className="flex-half-field">
            <div className="field-group flex-half">
              <label htmlFor="name"> First Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter Your name"
              />
              <span className="spanError">{errors.name}</span>
            </div>
            <div className="field-group flex-half">
              <label htmlFor="name">Last Name</label>
              <input
                name="lastname"
                type="text"
                className="form-control"
                placeholder="Enter Your last name"
              />
              <span className="spanError">{errors.lastname}</span>
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
              />
              <span className="spanError">{errors.title}</span>
            </div>
            <div className="field-group flex-half">
              <label htmlFor="name">Company Name</label>
              <input
                name="companyname"
                type="text"
                className="form-control"
                placeholder="Enter Your Company name"
              />
              <span className="spanError">{errors.companyname}</span>
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
              />
              <span className="spanError">{errors.password}</span>
            </div>
            <div className="field-group flex-half">
              <label htmlFor="name"> Repeat Password </label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter repeat password"
              />
              <span className="spanError">{errors.repeatpassword}</span>
            </div>
            </div>
            <div className="field-group flexFull">
              <label>
                <input type="checkbox" />
                <span>Accept our Terms and Conditions.</span>
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
             <Link to="/Price">Create account</Link> 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
