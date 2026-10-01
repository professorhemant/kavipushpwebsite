import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('kp_admin_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const getProducts  = params => api.get('/products', { params });
export const getProduct   = slug   => api.get(`/products/${slug}`);
export const getCategories = ()    => api.get('/categories');

export const createOrder      = data => api.post('/orders', data);
export const confirmPayment   = (id, data) => api.put(`/orders/${id}/payment`, data);
export const createRazorpayOrder = amount => api.post('/payment/create-order', { amount });
export const verifyPayment    = data => api.post('/payment/verify', data);

export const adminLogin   = creds => api.post('/auth/login', creds);
export const adminSetup   = creds => api.post('/auth/setup', creds);
export const getStats     = ()    => api.get('/admin/stats');
export const getOrders    = params => api.get('/orders', { params });
export const getOrder     = id    => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });

export const createProduct  = data => api.post('/products', data);
export const updateProduct  = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct  = id => api.delete(`/products/${id}`);
export const createCategory = data => api.post('/categories', data);

export default api;
