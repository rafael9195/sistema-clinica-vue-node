import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sistema-clinica-vue-node-rtdh.vercel.app/',
});

// Adiciona um interceptor que roda ANTES de cada requisição
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Adiciona o token no cabeçalho de autorização
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;