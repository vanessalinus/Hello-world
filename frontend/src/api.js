import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL: BASE_URL });

export const analytics = {
  getDashboard: () => api.get('/analytics/dashboard'),
};

export const customers = {
  list: (params) => api.get('/customers', { params }),
  get: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

export const orders = {
  list: (params) => api.get('/orders', { params }),
  get: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`),
};

export const shipments = {
  list: (params) => api.get('/shipments', { params }),
  get: (id) => api.get(`/shipments/${id}`),
  track: (trackingNumber) => api.get(`/shipments/track/${trackingNumber}`),
  create: (data) => api.post('/shipments', data),
  update: (id, data) => api.put(`/shipments/${id}`, data),
  delete: (id) => api.delete(`/shipments/${id}`),
};

export const inventory = {
  list: (params) => api.get('/inventory', { params }),
  get: (id) => api.get(`/inventory/${id}`),
  getCategories: () => api.get('/inventory/categories'),
  create: (data) => api.post('/inventory', data),
  update: (id, data) => api.put(`/inventory/${id}`, data),
  adjust: (id, data) => api.patch(`/inventory/${id}/adjust`, data),
  delete: (id) => api.delete(`/inventory/${id}`),
};

export const drivers = {
  list: (params) => api.get('/drivers', { params }),
  get: (id) => api.get(`/drivers/${id}`),
  create: (data) => api.post('/drivers', data),
  update: (id, data) => api.put(`/drivers/${id}`, data),
  delete: (id) => api.delete(`/drivers/${id}`),
};

export const warehouses = {
  list: () => api.get('/warehouses'),
  get: (id) => api.get(`/warehouses/${id}`),
  create: (data) => api.post('/warehouses', data),
  update: (id, data) => api.put(`/warehouses/${id}`, data),
};

export default api;
