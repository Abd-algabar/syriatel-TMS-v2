import axios from "axios";

const api = axios.create({
  baseURL: "https://syriateltms-production.up.railway.app/api/v1",
});

// إضافة JWT تلقائيًا إلى كل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("syriatel-tms:access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    
  return config;
});

export default api;