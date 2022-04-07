import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../../api/user";

const ResetPassword = () => {
  const [resetPass, setResetPass] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { userId, pwToken } = useParams();
  const handleChange = (e) => {
    setResetPass({ ...resetPass, [e.target.name]: e.target.value });
    setErrors({});
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case resetPass.password !== resetPass.confirmPass:
        setErrors({ password: "Incorrect Password" });
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
      const obj = {
        new_password: resetPass.password,
        userId: userId,
        pwToken: pwToken,
      };
      const res = await resetPasswordApi(obj);
      if (res && res.data && res.data.status === 200) {
        toast.success("Password Updated Successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="form-page-layout">
      <div className="center-form-box">
        <h2>Reset Password</h2>
        <form className="main-form" onSubmit={handleSubmit}>
          <div className="field-group flexFull">
            <label htmlFor="name"> Confirm Password </label>
            <input
              name="confirmPass"
              type="password"
              className="form-control"
              placeholder="confirm Password"
              onChange={handleChange}
              value={resetPass.confirmPass}
            />
          </div>
          <div className="field-group flexFull">
            <label htmlFor="name"> Password </label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              value={resetPass.password}
            />
            <span className="spanError">{errors.password}</span>
          </div>
          <div className="field-group flex-2">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
