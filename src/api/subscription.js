import axios from "axios";
import Cookies from 'js-cookie'

const getSubscription = async (data) => {
  try {
   
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/sub`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const getTopUp = async (data) => {
  try {
   
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/sub/topup`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
const getSMSStatus = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/message/msg-count`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getVoiceStatus = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/voice/count`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};



export { getSubscription ,getTopUp ,getSMSStatus,getVoiceStatus};