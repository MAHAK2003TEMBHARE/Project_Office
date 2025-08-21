import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const signup = (data) => API.post("/auth/signup", data);
export const signin = (data) => API.post("/auth/signin", data);
export const getAdminDashboard = () => API.get("/admin/dashboard");
