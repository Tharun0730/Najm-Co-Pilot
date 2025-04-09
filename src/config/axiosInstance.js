import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL='https://67f602a1913986b16fa63afb.mockapi.io/najmcopilot/'


export default axiosInstance;