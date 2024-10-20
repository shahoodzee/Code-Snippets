// PostPage.js
import React, { useEffect, useState } from 'react';
import { fetchPost } from '../../service/api';
import { Container, Typography, Grid, CardContent, Avatar, Box, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { PostContainer, CodeBlock, PostTitle, PostDescription, StyledChip, CommentBox, CommentAuthor, CommentContent } from './css';


const Post = () => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost().then(data => setPost(data));
    }, []);

    useEffect(() => {
        if (post?.code) {
            hljs.highlightAll();
        }
    }, [post]);

    if (!post) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <PostContainer maxWidth={false}>
            <Grid container spacing={3}>
                {/* Post Title */}
                <Grid item xs={12}>
                    <PostTitle variant="h3">{post.title}</PostTitle>
                </Grid>

                {/* Post Description */}
                <Grid item xs={12}>
                    <PostDescription variant="body1">
                        {post.description}
                    </PostDescription>
                </Grid>
                {/* Code Block with Highlight.js */}
                <Grid item xs={12}>
                    <Typography color="black" variant="h6" gutterBottom>
                        Code Example:
                    </Typography>
                    <Paper elevation={3} style={{ borderRadius: '8px', position: 'relative' }}>
                        <CodeBlock>
                            <code className="language-javascript">{post.code}</code>
                        </CodeBlock>
                        <IconButton
                            onClick={() => {
                                navigator.clipboard.writeText(post.code);
                                toast.success('Copied to clipboard!');
                            }}
                            sx={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                color: 'grey.500',
                                '&:hover': {
                                    color: 'grey.700',
                                },
                            }}
                        >
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Paper>
                </Grid>

                {/* Tags */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {post.tags.map((tag, index) => (
                            <StyledChip label={tag} key={index} />
                        ))}
                    </Box>
                </Grid>

                {/* Comments Section */}
                <Grid item xs={12}>
                    <Typography color="black" variant="h6" gutterBottom>
                        Comments
                    </Typography>
                    {post.comments.map(comment => (
                        <CommentBox key={comment.id}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar>{comment.author[0]}</Avatar>
                                    <CommentAuthor variant="subtitle2">{comment.author}</CommentAuthor>
                                    <Typography variant="caption" sx={{ marginLeft: 'auto' }}>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <CommentContent variant="body2">
                                    {comment.content}
                                </CommentContent>
                            </CardContent>
                        </CommentBox>
                    ))}
                </Grid>
            </Grid>
        </PostContainer>
    );
};

export default Post;
