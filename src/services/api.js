import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },
};

// Ride services
export const rideService = {
  requestRide: async (rideData) => {
    const response = await api.post('/rides/request', rideData);
    return response.data;
  },
  getNearbyDrivers: async (location) => {
    const response = await api.get('/rides/nearby-drivers', { params: location });
    return response.data;
  },
  submitOffer: async (rideId, offerData) => {
    const response = await api.post(`/rides/${rideId}/offers`, offerData);
    return response.data;
  },
  acceptOffer: async (rideId, offerId) => {
    const response = await api.post(`/rides/${rideId}/offers/${offerId}/accept`);
    return response.data;
  },
};

// User services
export const userService = {
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  getRideHistory: async () => {
    const response = await api.get('/users/rides');
    return response.data;
  },
};

// Admin services
export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getPendingVerifications: async () => {
    const response = await api.get('/admin/verifications');
    return response.data;
  },
  approveVerification: async (verificationId) => {
    const response = await api.post(`/admin/verifications/${verificationId}/approve`);
    return response.data;
  },
};

export default api;
