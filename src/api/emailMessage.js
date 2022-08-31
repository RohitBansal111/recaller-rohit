import axios from "axios";

const sendEmailMessageApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/email/insert`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const createEmailSenderApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/email/createSender`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getEmailSenderListApi = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/email/createSender`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const sendSingleEmailMessageApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/email/single`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getUserWithEmailMessage = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/email/user`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getEmailMessageApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/email/contact/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const reScheduleEmailApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/email/resheduleEmail`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const deleteReScheduleEmailApi = async (id) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/email/sheduledEmail/${id}`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const sendBulkEmailApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/email/bulkEmail`,
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
  sendEmailMessageApi,
  getEmailMessageApi,
  getUserWithEmailMessage,
  sendSingleEmailMessageApi,
  reScheduleEmailApi,
  deleteReScheduleEmailApi,
  sendBulkEmailApi,
  createEmailSenderApi,
  getEmailSenderListApi
};
