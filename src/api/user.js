import axios from "axios";


const loginApi = async (data) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
      if (result) {
        return result;
      }
    } catch (err) {
      return { data: err.response.data };
    }
  };
export {loginApi}