import axios from "axios";

const createApi = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/contact/create`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const deleteApi = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/contact/delete`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getContactApi = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/contact/getcontactdata`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const addMultipleContact = async (data) => {
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/contact/create-multiple`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};


export { createApi, deleteApi, getContactApi, addMultipleContact };
