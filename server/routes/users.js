import express from 'express';

import { signup, signin } from '../controllers/user.js';


const router = express.Router();

//handles all the method:GET requests and uses getPosts function
router.post('/signin', signin);
//handles all the method:POST requests and uses createPosts function
router.post('/signup', signup);

export default router;