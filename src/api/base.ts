
import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosUnAuthClient = axios.create({
  baseURL: 'http://localhost:3000/admin/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "69420",

  }
})

axiosUnAuthClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res?.data?.errors?.length > 0)
      toast.error(res.data.errors[0], { position: 'bottom-right' })
    console.error("Looks like there was a problem. Status Code: ", res.status);
    return Promise.reject(error);
  }
);
export default axiosUnAuthClient;
