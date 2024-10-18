import axios from 'axios';
import api from './api';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const getPost = (id) => axios.get(`${url}/${id}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

const authUrl = 'http://localhost:5000/user';
export const login   = (formData) => api.post('/user/signIn', formData);
// export const login = (formData) => axios.post(`${authUrl}/signIn`, formData);
export const signUp = (formData) => axios.post(`${authUrl}/signUp`, formData);