import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userDetailApi, userUpdateApi } from "../../../api/user";
import { loginAction } from "../../../redux/actions/loginAction";

const MyAccount = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userDataa = useSelector((state) => state.Login.userData);
  const [addUser, setAddUser] = useState({});
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
      };
      const res = await userUpdateApi(userDataa.id, data);
      if (res && res.data && res.data.status === 200) {
        toast.success(res.data.message);
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.firstName = data.firstName;
        userData.lastName = data.lastName;
        userData.phone = data.phone;
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(loginAction(userData));
        setAddUser(userData);
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <div className="content-page-layout">
      <div className="page-header">
        <h1>My Account</h1>
      </div>
      <div className="content-center-box">
        <div className="account-form">
          <form className="main-form" onSubmit={handleSubmit}>
            <div className="field-group flex2">
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                class="form-control"
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
                class="form-control"
                placeholder="Enter last name"
                value={addUser && addUser.lastName}
                onChange={handleChange}
              />
              <span className="spanError">{errors.lastName}</span>
            </div>
            <div className="field-group flexFull">
              <label>Email Address</label>
              <input
                name="email"
                type="text"
                class="form-control"
                placeholder="Enter email address"
                disabled
                value={addUser && addUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="field-group flexFull">
              <label>Phone</label>
              <input
                name="phone"
                type="text"
                class="form-control"
                placeholder="Enter phone number"
                value={addUser && addUser.phone}
                onChange={handleChange}
              />
              <span className="spanError">{errors.phone}</span>
            </div>
            <div className="field-group btn-groups flexFull">
              {/* <button type="button" className="btn btn-cancel">
                Cancel
              </button> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
