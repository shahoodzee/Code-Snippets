import express from 'express';
import { getPosts, createPost, deletePost, getPost, updatePost, likePost } from '../controllers/posts.js';
import { verifyToken } from "../common/tokenization.js";
const router = express.Router();
router.get('/all',verifyToken, getPosts);
router.get('/postDetails', verifyToken, getPost);
router.post('/create', verifyToken, createPost);
router.patch('/updatePost', verifyToken, updatePost);
router.delete('/delete/:id', verifyToken, deletePost);
router.patch('/like/:id', verifyToken, likePost);



export default router;