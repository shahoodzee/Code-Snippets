import React from 'react';
import Post from './Post/Post';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  // table: {
  //   minWidth: 650,
  // },
}));

function Posts() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Like Count</TableCell>
              <TableCell align="right">Creator</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default Posts;
