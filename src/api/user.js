import axios from "../helper/config";

const loginTokenApi = async (data) => {
  try {
    const result = await axios.post(`/user/login`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userLoginApi = async (data) => {
  try {
    const result = await axios.post(`/user/loginuser`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userDetailApi = async (id) => {
  try {
    const result = await axios.get(`/user/${id}`);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const userUpdateApi = async (id, data) => {
  try {
    const result = await axios.put(`/user/${id}`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const resetPasswordApi = async (data) => {
  try {
    const result = await axios.post(`/user/reset-password`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const forgetPasswordApi = async (data) => {
  try {
    const result = await axios.post(`/user/forgot-password`, data);
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
};
