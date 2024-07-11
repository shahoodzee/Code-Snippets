import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { TableCell, TableRow, Button } from '@mui/material';
import { likePost, deletePost } from '../../../actions/posts';

const useStyles = makeStyles((theme) => ({}));

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {post.title}
      </TableCell>
      <TableCell align="right">
        {moment(post.createdAt).fromNow()}
      </TableCell>
      <TableCell align="right">
        {post.likeCount}
      </TableCell>
      <TableCell align="right">
        {post.creator}
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => dispatch(likePost(post._id))}>Like</Button>
        <Button onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default Post;
