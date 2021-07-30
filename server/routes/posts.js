import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

//handles all the method:GET requests and uses getPosts function
router.get('/', getPosts);
//handles all the method:POST requests and uses createPosts function
router.post('/', createPost);
//handles all the documents updates requests
router.patch('/:id', updatePost);
//handles all the documents delete requests
router.delete('/:id', deletePost);
//handles all the documents like  requests
router.patch('/:id/likePost', likePost)

export default router;