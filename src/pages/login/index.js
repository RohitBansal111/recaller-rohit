import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLoginApi } from "../../api/user";
import { loginAction } from "../../redux/actions/loginAction";
import Cookies from 'js-cookie'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Login = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleHidePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({});
  };

  const isValid = () => {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let formData = true;
    switch (true) {
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
      case !check:
        setErrors({ checkbox: "Please Select Check Box" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };
  const toastId = React.useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const res = await userLoginApi(data);
      if (res && res.data && res.data.status === 200) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Login Successful");
        }
        if(res.data.data.subscription_status){
       dispatch(loginAction(res.data.data));
       localStorage.setItem("token", res.data.data.jwt);
       localStorage.setItem("userData", JSON.stringify(res.data.data));
       Cookies.remove('token')
       Cookies.remove('userData')
       navigate(`/`);
        }else{
          Cookies.set('token', res.data.data.jwt , { expires: 1 })
          navigate(`/price`);
        }
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="form-page-layout">
      <div className="center-form-box login-form-box">
        <div className="heading">
          <h2>Welcome,</h2>
          <p>
            Please <b>sign in</b> to your account below.
          </p>
        </div>
        <form className="main-form" onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="field-group flexFull">
              <label htmlFor="name"> Email Address </label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email address"
                onChange={handleChange}
                value={data.email}
              />
              <span className="spanError">{errors.email}</span>
            </div>
            <div className="field-group flexFull">
              <label htmlFor="name"> Password </label>

              <div className="passowrd-field-wrap">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  onChange={handleChange}
                  value={data.password}
                />
                <div
                  className={
                    showPassword
                      ? "show-password-icons showPsw"
                      : "show-password-icons"
                  }
                >
                  <RemoveRedEyeIcon onClick={handleHidePassword} />
                  <VisibilityOffIcon onClick={handleHidePassword} />
                </div>
              </div>

              <span className="spanError">{errors.password}</span>
            </div>
            <div className="field-group login-forget-password">
              <label>
                <input
                  id="checkbox"
                  name="checkbox"
                  checked={check}
                  // value={data.checkbox}
                  onChange={() => setCheck(!check)}
                  type="checkbox"
                />
                <span>Keep me logged in</span>
                <span className="spanError">{errors.checkbox}</span>
              </label>
            </div>
            <div className="field-group account-field">
              <h1>
                No account? <Link to="/Signup">Sign up now</Link>
              </h1>
            </div>
          </div>
          <div className="field-group flexFull submit-btn">
            <div className="forget-password">
              <Link to="/forgot-password" className="link-router">
                Recover Password
              </Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Login to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
