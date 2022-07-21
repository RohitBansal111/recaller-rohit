import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

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
      case !data.email:
        setErrors({ email: "Email field is required!" });
        formData = false;
        break;
      case data.email && !regex.test(data.email):
        setErrors({ email: "Please enter valid email address!" });
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
          <div className="field-group flexFull">
            <label htmlFor="name"> Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter Your name"
            />
            <span className="spanError">{errors.name}</span>
          </div>
          <div className="field-group flexFull">
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
          <div className="field-group flexFull">
            <label htmlFor="name"> Password </label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
            <span className="spanError">{errors.password}</span>
          </div>
          <div className="field-group flexFull">
            <label htmlFor="name"> Repeat Password </label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter repeat password"
            />
            <span className="spanError">{errors.repeatpassword}</span>
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
              Create account
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
