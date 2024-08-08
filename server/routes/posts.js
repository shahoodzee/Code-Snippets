import express from 'express';
import { getPosts, createPost, deletePost, getPost, updatePost, likePost } from '../controllers/posts.js'
import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);



export default router;