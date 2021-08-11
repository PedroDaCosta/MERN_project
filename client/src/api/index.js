import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => {
  //console.log();
  return API.post('/posts', newPost);
}

export const updatePost = (id, updatedPost) => {
  //console.log();
  return API.patch(`/posts/${id}`, updatedPost);
}

export const deletePost = (id) => {
  //console.log();
  return API.delete(`/posts/${id}`);
}

export const likePost = (id) => {
  //console.log();
  return API.patch(`/posts/${id}/likePost`);
}

export const signin = (formData) => {
  //console.log("api: formData",formData);
  return API.post(`/users/signin`, formData);
}

export const signup = (formData) => {
  //console.log();
  return API.post(`/users/signup`, formData);
}