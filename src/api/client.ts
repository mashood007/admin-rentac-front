import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/admin/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "69420",
    'access-token': typeof window !== "undefined" ? window.localStorage.getItem('accessToken') : '',
    // 'client': client,
    // 'expiry': expiry,
    // 'uid': uid,
  }
})


axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res.status == 401) {
      window.location.href = "/login";
      localStorage.clear()
    }
    toast.error(res.data.error, { position: 'bottom-right' })
    console.error("Looks like there was a problem. Status Code: ", res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
