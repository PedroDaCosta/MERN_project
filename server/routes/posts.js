import express from 'express';

import { getPosts, createPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

//handles all the method:GET requests and uses getPosts function
router.get('/', getPosts);
//handles all the method:POST requests and uses createPosts function
router.post('/', createPost);
//handles all the documents updates requests
router.patch('/:id', updatePost)


export default router;