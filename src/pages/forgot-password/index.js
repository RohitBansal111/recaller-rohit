import { Link } from "react-router-dom";
import { useState } from "react";
import { forgetPasswordApi } from "../../api/user";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [forgotPass, setForgotPass] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForgotPass({ ...forgotPass, [e.target.name]: e.target.value });
    setErrors({});
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !forgotPass.email:
        setErrors({ email: "Please Enter Your Email Address" });
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
      const res = await forgetPasswordApi(forgotPass);
      if (res && res.data && res.data.status === 200) {
        toast.success("Email sent Successfully");
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="form-page-layout">
      <div className="center-form-box">
        <h2>Forgot Password</h2>
        <form className="main-form" onSubmit={handleSubmit}>
          <div className="field-group flexFull">
            <label htmlFor="name"> Enter Email Address </label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email address"
              value={forgotPass.email}
              onChange={handleChange}
            />
            <span className="spanError">{errors.email}</span>
          </div>
          <div className="field-group flex-2">
            <button type="submit" className="btn btn-primary">
              Submit Now
            </button>
          </div>
          <div className="field-group flex-2 d-flex align-items-center">
            <Link to="/login" className="link-router">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
