import axios from "axios";

const addTagsApi = async (data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/tag/insert`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};



const getTagsApi = async () => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/tag/get`);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const updateTagsApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/tag/update/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const deleteTagApi = async (id, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/tag/delete/${id}`,
      data
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export {
  getTagsApi,
  addTagsApi,
  updateTagsApi,
  deleteTagApi,
};
