import axios from "axios";

const getUsageApi = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/settings/getUsage`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export { getUsageApi };
