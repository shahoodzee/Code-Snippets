import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Card, Grow, Grid } from '@material-ui/core';
import Navbar from '../components/Navbar/Navbar';
import PostDetails from '../components/Posts/PostDetails/PostDetails';
import PostComments from '../components/Posts/PostComments/PostComments';

const Post = () => {
  const location = useLocation();
  const { postId } = location.state || {};

  if (!postId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Container>
          <Grow in>
              <Container>
                  <Grid container marginTop='50px' display='flex' justifyContent='space-between' spacing='10px'>
                      <Grid item xs={12} md={8}>
                          <PostDetails postId={postId}/>
                      </Grid>
                      <Grid item xs={12} md={4} marginTop='50px'>
                        <PostComments />
                      </Grid>
                  </Grid>
              </Container>
          </Grow>
      </Container>
    </>
    );
  };
  
  export default Post;
  