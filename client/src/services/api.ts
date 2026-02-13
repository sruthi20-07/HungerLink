import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hungerlink_token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ---------------- SURPLUS ----------------

export const surplusAPI = {
  create: (data: any) => api.post("/surplus/create", data),
  getAll: () => api.get("/surplus"),
  accept: (id: string) => api.post(`/surplus/accept/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put(`/surplus/status/${id}`, { status }),
};

// ---------------- NGO ----------------

export const ngoAPI = {
  getAll: () => api.get("/ngos"),
  getNearby: (latitude: number, longitude: number) =>
    api.get(`/ngos/nearby?latitude=${latitude}&longitude=${longitude}`),
};

// ---------------- AUTH ----------------

export const authAPI = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: any) => api.post("/auth/register", data),
};

export default api;
