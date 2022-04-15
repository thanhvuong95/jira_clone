import axios from "axios";

const getToken = () => {
  const storedInfo = localStorage.getItem("userInfo");
  if (storedInfo) {
    const { accessToken } = JSON.parse(storedInfo);
    return accessToken;
  }
  return null;
};

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers = {
      "content-type": "application/json",
      TokenCybersoft: process.env.REACT_APP_TOKEN || "",
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data.content) return response.data.content;
    return response;
  },
  function (error) {
    // return Promise.reject(error.response.data.message);
    return Promise.reject(error.response); // error.response => get status code 500 => handle checkToken
  }
);
