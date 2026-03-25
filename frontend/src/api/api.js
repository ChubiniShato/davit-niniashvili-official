import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// CSRF Interceptor
api.interceptors.request.use((config) => {
    const mutatingMethods = ['post', 'put', 'patch', 'delete'];
    if (mutatingMethods.includes(config.method?.toLowerCase())) {
        const xsrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        if (xsrfToken) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
        }
    }
    return config;
});


export const getBio = () => api.get('/content/bio');
export const getStats = () => api.get('/content/stats');
export const getCareerProfile = () => api.get('/content/career');
export const getMedia = () => api.get('/content/media');
export const getProducts = () => api.get('/shop/products');
export const getProductById = (id) => api.get(`/shop/products/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getAwards = () => api.get('/player/awards');
export const getFeaturedPress = () => api.get('/content/press/featured');
export const getPressArchive = () => api.get('/content/press');

// Admin Awards CRUD
export const getAdminAwards = () => api.get('/admin/awards');
export const createAdminAward = (data) => api.post('/admin/awards', data);
export const updateAdminAward = (id, data) => api.put(`/admin/awards/${id}`, data);
export const deleteAdminAward = (id) => api.delete(`/admin/awards/${id}`);

// Admin Career
export const getAdminCareer = () => api.get('/admin/content/career');
export const validateAdminCareer = (data) => api.post('/admin/content/career/validate', data);
export const publishAdminCareer = (data) => api.put('/admin/content/career/publish', data);

// Admin Content Blocks
export const getAdminContentBlocks = () => api.get('/admin/content/blocks');
export const createAdminContentBlock = (data) => api.post('/admin/content/blocks', data);
export const updateAdminContentBlock = (id, data) => api.put(`/admin/content/blocks/${id}`, data);
export const deleteAdminContentBlock = (id) => api.delete(`/admin/content/blocks/${id}`);



export default api;
