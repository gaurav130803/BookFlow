import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error); // <== important!
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized — maybe redirect to login?");
    }
    return Promise.reject(error); // <== important!
  }
);

export default instance;
