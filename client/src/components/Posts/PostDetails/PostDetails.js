import { React, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Container, Typography, Card, CardContent, CardMedia, IconButton, Grid, Chip} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { likePost, deletePost, getPost } from '../../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import NestedModal from '../../Modal/Modal';
import { CopyBlock, monokaiSublime as theme } from "react-code-blocks";

const PostDetails = ( { postId } ) => {

  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const PostItems = useSelector((state) => state.posts.find((p) => p._id === postId));
  const [localLikeCount, setLocalLikeCount] = useState(PostItems ? PostItems.likeCount : 0);
  const dispatch = useDispatch();


  const handleClose = () => {
    setOpen(false);
  };

  
  useEffect(() => {
    if (!PostItems) {
      dispatch(getPost(postId));
    } else {
      setLocalLikeCount(PostItems.likeCount);
    }
  }, [postId, dispatch, PostItems]);
  
  const handleLikeClick = () => {
    setLocalLikeCount(localLikeCount + 1);
    dispatch(likePost(PostItems._id));
  };
  
  const handleDeleteClick = () => {
    dispatch(deletePost(PostItems._id));
    Navigate('/dashboard');
    alert('Post Deleted Successfully');
  }
  
  const handleEditClick = () => {
    setOpen(true); //this will open Modal Component.

  };

  if (!PostItems) {
    return <div>Loading...</div>;
  }
  
  return (
    <Container style={{ marginTop: '20px', width: '100%' }}>
      <Card style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                {PostItems.title}
              </Typography>
            </Grid>
            <Grid item>

              <IconButton onClick={handleLikeClick} aria-label="favorite" style={{ color: '#f50057' }}>
                <FavoriteIcon />
              </IconButton>
              
              <IconButton aria-label="delete" style={{ color: '#3f51b5' }}>
                <DeleteIcon onClick={handleDeleteClick} />
              </IconButton>

              <IconButton onClick={handleEditClick} aria-label="edit" style={{ color: '#3f51b5' }}>
                <EditIcon />
                <NestedModal open={open} handleClose={handleClose} post={PostItems}/>
              </IconButton>
              
            </Grid>
          </Grid>
          <Typography variant="subtitle1" color="textSecondary">
            by {PostItems.creator}
          </Typography>
          <Typography variant="body1" paragraph
            style={{ color: '#333' }}
            >
              {PostItems.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Code:
              <br />
              <CopyBlock
                text={PostItems.code}
                codeBlock
                theme={theme}
                showLineNumbers={true}
                wrapLines
              />
              <br />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Likes: {localLikeCount}
            </Typography>
            {PostItems.selectedFile && (
              <CardMedia
                component="img"
                alt="Uploaded content"
                height="auto"
                image={PostItems.selectedFile}
                title="Uploaded content"
                style={{ maxWidth: '50%', margin: '20px 0', borderRadius: '10px' }}
              />
            )}
            <Typography variant="body2" color="textSecondary">
            {moment(PostItems.createdAt).format('MMMM Do YYYY')}
            {/* {moment(PostItems.createdAt).format('MMMM Do YYYY, h:mm:ss a')} */}
            </Typography>
            <div style={{ marginTop: '10px' }}>
              {PostItems.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  color="primary"
                  style={{ marginRight: '5px', marginBottom: '5px' }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default PostDetails;
  