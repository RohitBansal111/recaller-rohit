import axios from "axios";

const loginTokenApi = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userLoginApi = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/loginuser`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userDetailApi = async (id) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userUpdateApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const resetPasswordApi = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/reset-password`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const forgetPasswordApi = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/forgot-password`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const signup = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/signup`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
export {
  loginTokenApi,
  userDetailApi,
  userUpdateApi,
  userLoginApi,
  forgetPasswordApi,
  resetPasswordApi,
  signup,
};
