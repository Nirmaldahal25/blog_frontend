import axios from "axios";

const baseurl = "http://localhost:8000/api/";

const apiAxios = axios.create({
  baseURL: baseurl,
  timeout: 6000,
});

export default apiAxios;
