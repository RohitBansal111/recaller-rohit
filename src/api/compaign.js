import axios from "axios";

const addCompaignApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/compaign/insert`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getCompaignApi = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/compaign/get`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const updateCompaignApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/compaign/update/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const deleteCompaignApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/compaign/delete/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const contactCompaignApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/compaign/getCompaign/${id}`,
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
  getCompaignApi,
  addCompaignApi,
  updateCompaignApi,
  deleteCompaignApi,
  contactCompaignApi,
};
