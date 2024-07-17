import React, { useState } from 'react';
import Post from './Post/Post';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TableSortLabel } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  headerCell: {
    fontWeight: 'bold',
    color: theme.palette.common.white,
  },
  bodyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  sortLabel: {
    '&.MuiTableSortLabel-root': {
      color: theme.palette.common.white,
    },
    '&.MuiTableSortLabel-root.Mui-active': {
      color: theme.palette.common.white,
    },
    '&.MuiTableSortLabel-root:hover': {
      color: theme.palette.common.white,
    },
    '& .MuiTableSortLabel-icon': {
      color: theme.palette.common.white,
    },
  },
}));

function Posts() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (orderBy === 'createdAt') {
      return order === 'desc'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    } else if (orderBy === 'likeCount') {
      return order === 'desc'
        ? b.likeCount - a.likeCount
        : a.likeCount - b.likeCount;
    }
    return 0;
  });

  return (
    !sortedPosts.length ? <CircularProgress /> : 
    (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="sortable table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell className={classes.headerCell}>Title</TableCell>
              <TableCell align="right" className={classes.headerCell}>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={() => handleRequestSort('createdAt')}
                  className={classes.sortLabel}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" className={classes.headerCell}>
                <TableSortLabel
                  active={orderBy === 'likeCount'}
                  direction={orderBy === 'likeCount' ? order : 'asc'}
                  onClick={() => handleRequestSort('likeCount')}
                  className={classes.sortLabel}
                >
                  Like Count
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" className={classes.headerCell}>Creator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default Posts;
