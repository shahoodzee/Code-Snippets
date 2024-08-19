import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const getPost = (id) => axios.get(`${url}/${id}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

const authUrl = 'http://localhost:5000/user';
export const login = (formData) => axios.post(`${authUrl}/signin`, formData);
export const signup = (formData) => axios.post(`${authUrl}/signup`, formData);
