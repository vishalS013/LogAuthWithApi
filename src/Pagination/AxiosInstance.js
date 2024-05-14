import axios from "axios";

// this component is used for accessing api and sending headers in it after that we are creating instance to get valid bearer token 

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});
