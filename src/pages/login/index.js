import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLoginApi } from "../../api/user";
import { loginAction } from "../../redux/actions/loginAction";

const Login = () => {
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
      default:
        formData = true;
    }
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const res = await userLoginApi(data);
      if (res && res.data && res.data.status === 200) {
        toast.success("Login successful!");
      dispatch(loginAction(res.data.data));
      localStorage.setItem("token", res.data.data.jwt);
      localStorage.setItem("userData", JSON.stringify(res.data.data));
        navigate(`/`);
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="form-page-layout">
      <div className="center-form-box">
        <h2>Login Now</h2>
        <form className="main-form" onSubmit={handleSubmit}>
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
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              value={data.password}
            />
            <span className="spanError">{errors.password}</span>
          </div>
          <div className="field-group flex-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="field-group flex-2 d-flex align-items-center">
            <Link to="/forgot-password" className="link-router">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
