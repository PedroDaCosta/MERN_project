import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => {
  //console.log();
  return axios.post(url, newPost);
}

export const updatePost = (id, updatedPost) => {
  //console.log();
  return axios.patch(`${url}/${id}`, updatedPost);
}

export const deletePost = (id) => {
  //console.log();
  return axios.delete(`${url}/${id}`);
}

export const likePost = (id) => {
  //console.log();
  return axios.patch(`${url}/${id}/likePost`);
}