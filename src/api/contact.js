import axios from "axios";

export const createApi = async (data) => {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/contact/create`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export const deleteApi = async (data) => {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/contact/delete`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export const getContactApi = async () => {
  try {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/contact/getcontactdata`);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};
