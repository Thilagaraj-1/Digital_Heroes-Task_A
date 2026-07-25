import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createLead = (leadData) => api.post("/leads", leadData);

export const getLeads = (search = "") =>
  api.get("/leads", { params: search ? { search } : {} });

export const updateLeadStatus = (id, status) =>
  api.patch(`/leads/${id}`, { status });

export default api;
