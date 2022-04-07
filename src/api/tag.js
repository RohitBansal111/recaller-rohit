import axios from "../helper/config";

const addTags = async (data) => {
  try {
    const result = await axios.post(`/tag/insert`, data);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

const getTags = async () => {
  try {
    const result = await axios.get(`/tag/getdata`);
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export { getTags, addTags };
