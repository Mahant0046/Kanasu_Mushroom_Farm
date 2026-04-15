import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Initial delay in ms

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add retry logic for 429 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Retry on 429 (Too Many Requests) errors
    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      if (originalRequest._retryCount <= MAX_RETRIES) {
        // Exponential backoff: 1s, 2s, 4s
        const retryDelay = RETRY_DELAY * Math.pow(2, originalRequest._retryCount - 1);
        console.log(`Retrying request after ${retryDelay}ms (attempt ${originalRequest._retryCount}/${MAX_RETRIES})`);
        await delay(retryDelay);
        return api(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  updateStock: (id, data) => api.patch(`/products/${id}/stock`, data),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: (params) => api.get('/orders/all', { params }),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
};

// Reviews API
export const reviewsAPI = {
  getByProduct: (productId, params) => api.get(`/reviews/product/${productId}`, { params }),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id) => api.post(`/reviews/${id}/helpful`),
};

// Subscriptions API
export const subscriptionsAPI = {
  create: (data) => api.post('/subscriptions', data),
  getMySubscriptions: () => api.get('/subscriptions'),
  getById: (id) => api.get(`/subscriptions/${id}`),
  update: (id, data) => api.put(`/subscriptions/${id}`, data),
  pause: (id) => api.put(`/subscriptions/${id}/pause`),
  resume: (id) => api.put(`/subscriptions/${id}/resume`),
  cancel: (id) => api.put(`/subscriptions/${id}/cancel`),
  getAll: () => api.get('/subscriptions/all'),
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getById: (id) => api.get(`/blog/${id}`),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  getFeatured: () => api.get('/blog/featured'),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
  addComment: (id, data) => api.post(`/blog/${id}/comments`, data),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  subscribeNewsletter: (data) => api.post('/contact/newsletter', data),
};

export default api;
