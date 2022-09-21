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


export { getSubscription };