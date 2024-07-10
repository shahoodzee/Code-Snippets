import express from 'express';
import { getPosts, createPost, deletePost, getPost, updatePost } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.get('/upate', updatePost);
router.get('/create', createPost);
router.get('/delete', deletePost);
router.get('/get', getPost);

export default router;