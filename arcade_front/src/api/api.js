import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/arcade/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registrar = (data) => api.post(`/user/register/`, data)
export const login = (data) => api.post('/token/', data)
export const getUser = (id) => api.get(`/user/${id}`)
export const getClan = (id) => api.get(`/clan/${id}`)
export const joinClan = (id, data) => api.post(`/clan/${id}/become_member/`, data)
export const leaveClan = (id, data) => api.delete(`/clan/${id}/delete_member/`, data)
export const getClanes = () => api.get('/clanes/')
export const createPosts = (id, data) => api.post(`/clan/${id}/post`, data)
export const getTrophies = () => api.get('/trophies/')
export const getGames = (id) => api.get(`${id}`)