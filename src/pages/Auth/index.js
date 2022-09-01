import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loginTokenApi } from "../../api/user";
import { toast } from "react-toastify";
import { loginAction } from "../../redux/actions/loginAction";
import { useDispatch } from "react-redux";

const Auth = () => {
  let navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    login();
  }, []);
  const login = async () => {
    const data = {
      token: token,
    };
    let res = await loginTokenApi(data);
    if (res && res.data && res.data.status === 200) {
      toast.success("Login successful!");
      dispatch(loginAction(res.data.data));
      localStorage.setItem("token", res.data.data.jwt);
      localStorage.setItem("userData", JSON.stringify(res.data.data));
      navigate(`/`);
    } else {
      toast.error(res.data.message);
    }
  };
  return <></>;
};

export default Auth;
