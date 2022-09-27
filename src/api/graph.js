import axios from "axios";

const currentGraph = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/graph/current`
      
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const VoiceSMSGraph = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/graph/currentData`
      
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export {
    currentGraph,
    VoiceSMSGraph
  };