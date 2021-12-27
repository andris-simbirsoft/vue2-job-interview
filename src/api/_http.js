import Axios from 'axios';

const axiosInstance = Axios.create();

const request = () => axiosInstance;

export default request;
