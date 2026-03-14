import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBio = () => api.get('/content/bio');
export const getStats = () => api.get('/content/stats');
export const getMedia = () => api.get('/content/media');
export const getProducts = () => api.get('/shop/products');
export const getProductById = (id) => api.get(`/shop/products/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getAwards = () => api.get('/player/awards');

export default api;
