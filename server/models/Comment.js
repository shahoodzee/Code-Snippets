import mongoose from "mongoose";
import baseSchema from "./baseSchema.js";

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
});

commentSchema.add(baseSchema);

const Comment = mongoose.model('Comment', commentSchema, 'Comment');
export default Comment;
