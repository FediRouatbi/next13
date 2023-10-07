import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage?.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
