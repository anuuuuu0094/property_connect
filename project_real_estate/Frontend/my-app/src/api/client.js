import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://property-connect-backend-95ni.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request (if exists in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
