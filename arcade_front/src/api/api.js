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
// user API
export const registrar = (data) => api.post(`/user/register/`, data)
export const login = (data) => api.post('/token/', data)
export const getUser = (id) => api.get(`/user/${id}/`)

// follow/unfollow API

export const following = () => api.get('/user/following/')
export const follow = (id) => api.post(`/user/${id}/follow/`)
export const unfollow = (id) => api.delete(`/unfollow/${id}/`)

//clan API
export const getClan = (id) => api.get(`/clan/${id}`)
export const joinClan = (id, data) => api.post(`/clan/${id}/become_member/`, data)
export const getMembers = () => api.get('/members/')
export const leaveClan = (id) => api.delete(`/member/${id}/delete/`)
export const getClanes = () => api.get('/clanes/')

//clan posts API
export const createPosts = (id, data) => api.post(`/clan/${id}/post/`, data)
export const getPosts = (id) => api.get(`/clan/${id}/posts/`)

//Clan create/delete API

export const clanCreate = (data) => api.post('/clan/create/', data) 

//Trophies API
export const getTrophies = () => api.get('/trophies/')
export const getTrophie = (id) => api.get(`/trophie/${id}`)

//Games API
export const getGame = (id) => api.get(`/game/${id}`)
export const updateRecord = (id, data) => api.put(`/game/${id}/update_record`, data)
export const getGames = () => api.get('/games/')

