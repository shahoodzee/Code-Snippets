import mongoose from 'mongoose';

class PostDto {
    constructor(post, creator) {
        this.id = post._id;
        this.title = post.title;
        this.description = post.description;
        this.code = post.code;
        this.creator = {
            id: creator._id,
            fullName: creator.fullName,
            email: creator.email,
            phoneNumber: creator.phoneNumber,
            gender: creator.gender
        };
        this.tags = post.tags;
        this.selectedFile = post.selectedFile;
        this.likeCount = post.likeCount;
        this.createdAt = post.createdAt;
        this.modifiedAt = post.modifiedAt;
    }

    static create = (post, creator) => new PostDto(post, creator);
}

export default PostDto;
