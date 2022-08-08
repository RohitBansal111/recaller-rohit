import axios from "axios";

const CreateSubscription = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/payment/createPayment`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export { CreateSubscription };
