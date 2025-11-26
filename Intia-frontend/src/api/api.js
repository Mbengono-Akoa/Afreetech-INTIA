import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

// Auth
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const logout = () => api.post("/auth/logout");

// Products
export const fetchProducts = () => api.get("/products/getAll");
export const createProduct = (data) => api.post("/products/create", data);
export const updateProduct = (id, data) => api.put(`/products/update/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/delete/${id}`);

export default api;
