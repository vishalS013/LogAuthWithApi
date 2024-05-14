import axios from "axios";

// this component is used for accessing api and sending headers in it after that we are creating instance to get valid bearer token 

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Bearer Token is", token);
    }
    return config;
  },
  (error) => {
    console.log("reject errror is ", Promise.reject.error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    console.log("response in use ", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);