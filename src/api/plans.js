import axios from "axios";
import Cookies from 'js-cookie'

const CreateSubscription = async (data) => {
  try {
    const AUTH_TOKEN = Cookies.get('token')
    console.log(AUTH_TOKEN)
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

const CreateSubscriptionFree = async () => {
  try {
    const AUTH_TOKEN = Cookies.get('token')
    console.log(AUTH_TOKEN)
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/payment/add-freesub`,
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export { CreateSubscription,CreateSubscriptionFree };
