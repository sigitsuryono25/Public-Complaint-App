import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Request Interceptor to add Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userService = {
    login: (data) => api.post('/users/login', data),
    getUsers: () => api.get('/users'),
};

export const complaintService = {
    getComplaints: (params) => api.get('/complaints', { params }),
    getComplaintById: (id) => api.get(`/complaints/${id}`),
    updateStatus: (id, data) => api.patch(`/complaints/${id}/status`, data),
    createComplaint: (data) => api.post('/complaints', data),
};

export const adminService = {
    getCategories: () => api.get('/admin/categories'),
    createCategory: (data) => api.post('/admin/categories', data),
    getSKPDs: () => api.get('/admin/skpds'),
    createSKPD: (data) => api.post('/admin/skpds', data),
};

export default api;
