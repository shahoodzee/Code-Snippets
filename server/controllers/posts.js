import Post from '../models/Post.js';
import mongoose from 'mongoose';
import { ApiResponse } from '../common/ApiResponse.js';
import { getUserById } from '../common/user.js';
import PostDto from '../common/dto/postDto.js';
export const getPosts = async (req,res) => {
    try {
        const Posts = await Post.find();
        res.status(200).json(Posts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}

export const getPost = async (req, res) => { 
    const { id } = req.query;
    try {
        const post = await Post.findById(id);
        const user = await getUserById(post.creator);
        if (post == null) {
            return res.status(404).json(ApiResponse(false, "Post not found", id));
        }
        const postDto = PostDto.create(post, user);
        
        res.status(200).json(ApiResponse(true, "Post fetched successfully", postDto));
    } catch (error) {
        res.status(404).json(ApiResponse(false, error.message, null));
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

export const updatePost = async (req, res) => {
    const { id, title, description, code } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, description, code, modifiedBy : req.user.cdui, modifiedAt: Date.now() };

    const result = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    if (!result) {
        return res.status(404).json(ApiResponse(false, "Post not found", null));
    }

    res.status(200).json(ApiResponse(true, "Post updated successfully", null));
}

export const createPost = async (req,res) => {
    const post = req.body;
    try {
        const existingPost = await Post.findOne({ title: post.title });
        if (existingPost) {
            return res.status(400).json(ApiResponse(false, "A post with this title already exists", null));
        }
        post.creator = req.user.cdui;
        post.createdBy = req.user.cdui;

        const newPost = new Post(post);
        await newPost.save();
        res.status(200).json(ApiResponse(true, "Post Created", null));
    } catch (error) {
        res.status(500).json(ApiResponse(false, error.message, null));
    }
}
