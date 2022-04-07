import axios from '../helper/config'

const createApi = async (data) => {
  try {
    const result = await axios.post(
      `/contact/create`,
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
      `/contact/delete`,
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
    const result = await axios.get(`/contact/getcontactdata`
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
      `/contact/create-multiple`,
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
