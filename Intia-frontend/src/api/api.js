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

// Clients
export const fetchClients = () => api.get("/clients");
export const createClient = (data) => api.post("/clients", data);
export const updateClient = (id, data) => api.put(`/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/clients/${id}`);

// Insurances
export const fetchInsurances = () => api.get("/insurances");
export const createInsurance = (data) => api.post("/insurances", data);
export const updateInsurance = (id, data) => api.put(`/insurances/${id}`, data);
export const deleteInsurance = (id) => api.delete(`/insurances/${id}`);

// Users
export const fetchUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Dashboard Stats
export const fetchDashboardStats = () => api.get("/dashboard/stats");

export default api;