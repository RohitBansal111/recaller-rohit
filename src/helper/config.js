import axios from 'axios'
const token = localStorage.getItem("token")
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Authorization': token ? `${token}` : ''
    }
})
export default axiosInstance;

// https://frontend.recallr.co
// https://api.recallr.co
