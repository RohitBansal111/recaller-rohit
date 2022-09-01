import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userDetailApi, userUpdateApi } from "../../../api/user";
import Layout from "../../../components/layout";
import { loginAction } from "../../../redux/actions/loginAction";
import ChangePasswordModal from "../../../models/Changepasswordmodal";
const MyAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userDataa = useSelector((state) => state.Login.userData);
  const [addUser, setAddUser] = useState({});
  const handlePasswordClose = () => {
    setShowPassword(false);
  };
  const [newPassword, setNewPassword] = useState("");
  const handlePasswordShow = () => {
    setShowPassword(true);
  };
  const isValid = () => {
    let formData = true;
    switch (true) {
      case !addUser.firstName:
        setErrors({ firstName: "firstName field is required!" });
        formData = false;
        break;
      case !addUser.lastName:
        setErrors({ lastName: "lastName field is required!" });
        formData = false;
        break;
      case !addUser.phone:
        setErrors({ phone: "Phone field is required!" });
        formData = false;
        break;
      case !addUser.title:
        setErrors({ title: "Title field Required" });
        formData = false;
        break;
      case !addUser.companyName:
        setErrors({ companyName: "company Name field Required" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  useEffect(() => {
    getUserDetail();
  }, [userDataa]);

  const getUserDetail = async () => {
    if (userDataa && userDataa.id) {
      const res = await userDetailApi(userDataa.id);
      setAddUser(res.data.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prevTime) => {
      return {
        ...prevTime,
        [name]: value,
      };
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const data = {
        firstName: addUser.firstName,
        lastName: addUser.lastName,
        phone: addUser.phone,
        title: addUser.title,
        companyName: addUser.companyName,
      };
      const res = await userUpdateApi(userDataa.id, data);
      if (res && res.data && res.data.status === 200) {
        toast.success(res.data.message);
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.firstName = data.firstName;
        userData.lastName = data.lastName;
        userData.phone = data.phone;
        userData.companyName = data.companyName;
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(loginAction(userData));
        setAddUser(userData);
      } else {
        toast.error(res.data.message);
      }
    }
  };
  const isValidPassword = () => {
    let formData = true;
    switch (true) {
      case !addUser.newPassword:
        setErrors({ newPassword: "New  Password" });
        formData = false;
        break;
      case addUser.newPassword !== addUser.confirmPassword:
        setErrors({ confirmPassword: "Please Enter Confirm password" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };
  const changePassword = async (e) => {
    e.preventDefault();
    if (isValidPassword()) {
      const data = {
        firstName: addUser.firstName,
        lastName: addUser.lastName,
        phone: addUser.phone,
        title: addUser.title,
        companyName: addUser.companyName,
      };
      const res = await userUpdateApi(userDataa.id, data);
      if (res && res.data && res.data.status === 200) {
        toast.success(res.data.message);
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.firstName = data.firstName;
        userData.lastName = data.lastName;
        userData.phone = data.phone;
        userData.companyName = data.companyName;
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(loginAction(userData));
        setAddUser(userData);
        setAddUser("");
        setShowPassword(false);
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <div>
      <Layout>
        <div className="content-page-layout myaccount-layout">
          <div className="page-header">
            <h1>My Account</h1>
          </div>
          <div className="content-center-box">
            <div className="account-subheading">
              <h2>User Information</h2>
              <p>Here you can edit public information about yourself.</p>
            </div>
            <div className="account-form">
              <form className="main-form">
                <div className="field-group flex2">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                    value={addUser && addUser.firstName}
                    onChange={handleChange}
                  />
                  <span className="spanError">{errors.firstName}</span>
                </div>

                <div className="field-group flex2">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    value={addUser && addUser.lastName}
                    onChange={handleChange}
                  />
                  <span className="spanError">{errors.lastName}</span>
                </div>
                <div className="field-group  flex2">
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Enter email address"
                    disabled
                    value={addUser && addUser.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group  flex2">
                  <label>Phone</label>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={addUser && addUser.phone}
                    onChange={handleChange}
                  />
                  <span className="spanError">{errors.phone}</span>
                </div>
                <div className="field-group flex2">
                  <label htmlFor="name">Title</label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Title"
                    value={addUser && addUser.title}
                    onChange={handleChange}
                  />
                  <span className="spanError">{errors.title}</span>
                </div>
                <div className="field-group flex2">
                  <label htmlFor="name">Company Name</label>
                  <input
                    name="companyName"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Company name"
                    value={addUser && addUser.companyName}
                    onChange={handleChange}
                  />
                  <span className="spanError">{errors.companyName}</span>
                </div>

                <div className="field-group  flex2 currentplan">
                  <div className="currentplan-field">
                    <label>Current Plan</label>
                    <input
                      name="currentplan"
                      type="text"
                      className="form-control"
                      value="319"
                      disabled
                    />
                  </div>
                  <span className="changeplan">
                    <Link to="/Price">Change Plan</Link>
                  </span>
                </div>
                <div className="field-group  flex2 password-field">
                  {/* <div className="currentplan-field">
                    <label>Password</label>
                    <input
                      name="password"
                      type="text"
                      className="form-control"
                    />
                  </div> */}
                  <Button
                    className="change-password"
                    onClick={handlePasswordShow}
                  >
                    Change Password
                  </Button>
                </div>
                <div className="field-group btn-groups flexFull">
                  {/* <button type="button" className="btn btn-cancel">
                Cancel
              </button> */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
      <ChangePasswordModal
        showPassword={showPassword}
        handlePasswordClose={handlePasswordClose}
        handlePasswordShow={handlePasswordShow}
        handleSubmit={handleSubmit}
        addUser={addUser}
        handleChange={handleChange}
        errors={errors}
        changePassword={changePassword}
      />
    </div>
  );
};

export default MyAccount;
