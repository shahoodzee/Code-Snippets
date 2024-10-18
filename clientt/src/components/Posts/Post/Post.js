import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/Post/`, { state: { postId: post._id } });
    alert("Clicked");
  };

  return (
    <TableRow className={classes.row} onClick={handleRowClick}>
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
    </TableRow>
  );
};

export default Post;
