import axios from "axios";

const addTags = async (data) => {
  try {
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

const getTags = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/tag/getdata`
    );
    if (result) {
      return result;
    }
  } catch (err) {
    return { data: err.response.data };
  }
};

export { getTags, addTags };
