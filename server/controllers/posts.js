import PostMessage from '../models/postMessage.js';
import express from 'express';
import mongoose from 'mongoose';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}

export const getPost = async (req,res) => {
    try {
        res.send("working")
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const likePost = async (req,res) => {
    try {
        res.send("working")
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const updatePost = async (req,res) => {
    try {
        res.send("working")
    } catch (error) {
        res.status(404).json({message: error.message });        
    }
}

export const createPost = async (req,res) => {
    
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save()
        res.status(200).json(newPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
