import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//handles all the method:GET requests and uses getPosts function
router.get('/', getPosts);
//handles all the method:POST requests and uses createPosts function
router.post('/', auth, createPost);
//handles all the documents updates requests
router.patch('/:id', auth, updatePost);
//handles all the documents delete requests
router.delete('/:id', auth, deletePost);
//handles all the documents like  requests
router.patch('/:id/likePost', auth, likePost)

export default router;