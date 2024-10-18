import mongoose from "mongoose";
import baseSchema from "./baseSchema.js";
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    selectedFile: {
        type: String,
        required: false
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    }],
    likedBy: [{
        type: String,
        required: false
    }]
});

postSchema.add(baseSchema);
    
const Post = mongoose.model('Post', postSchema, 'Post');
export default Post;