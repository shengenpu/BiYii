import axios from "axios";
let service=axios.create({
    baseURL:'/api',
    timeout:8000
})
service.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  });
export default service