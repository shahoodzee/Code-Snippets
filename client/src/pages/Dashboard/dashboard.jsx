import React, { useEffect, useState } from 'react';
import { getTotalUsers, getTotalPosts, getTotalSnippets, getTotalAttachments, fetchAllPosts } from '../../service/api';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableSortLabel, TableContainer } from '@mui/material';
import { styled } from '@mui/system';
import './dashboard.css';

const StyledTableContainer = styled(TableContainer)({
  boxShadow: 'none',
});

const StyledTableHead = styled(TableHead)({
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#0093ff !important',
  border: 'none'
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f5f5f5',
    },
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
    border: 'none'
});

function Dashboard() {
    const [stats, setStats] = useState({
        TotalUsers: 0,
        TotalPosts: 0,
        TotalSnippets: 0,
        TotalAttachments: 0
    });

    const [posts, setPosts] = useState([]);
    const [recentComments, setRecentComments] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');

    useEffect(() => {
        setStats({
            totalUsers: getTotalUsers(),
            totalPosts: getTotalPosts(),
            totalSnippets: getTotalSnippets(),
            totalAttachments: getTotalAttachments()
        });

        fetchAllPosts().then(response => {
            setPosts(response.posts);
            if (response.posts.length > 0) {
                setRecentComments(response.posts[0].comments);
            }
        });
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (orderBy === 'title') {
            return order === 'desc'
                ? b.title.localeCompare(a.title)
                : a.title.localeCompare(b.title);
        }
        return 0;
    });

    return (
        <div className="dashboard">
            <div className="main-content">
                <div className="stats">
                    {Object.entries(stats).map(([key, value]) => (
                        <div className="stat-card" key={key}>
                            <div className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className="stat-value">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="posts-table">
                    <h2>Posts</h2>
                    <StyledTableContainer component={Paper}>
                        <Table aria-label="sortable table">
                            <StyledTableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        <TableSortLabel
                                            active={orderBy === 'title'}
                                            direction={orderBy === 'title' ? order : 'asc'}
                                            onClick={() => handleRequestSort('title')}
                                        >
                                            Title
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell>Creator</StyledTableCell>
                                    <StyledTableCell>Created By</StyledTableCell>
                                    <StyledTableCell>                                    
                                        <TableSortLabel
                                            active={orderBy === 'likeCount'}
                                            direction={orderBy === 'likeCount' ? order : 'asc'}
                                            onClick={() => handleRequestSort('likeCount')}
                                        >
                                            Likes
                                        </TableSortLabel>
                                    </StyledTableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {sortedPosts.map((post, index) => (
                                    <StyledTableRow key={index}>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.createdBy}</TableCell>
                                        <TableCell>{post.createdBy}</TableCell>
                                        <TableCell>{post.likeCount || 0}</TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </div>
            </div>

            <div className="recent-comments">
                <div className="recent-comments-header">
                    Recent Comments
                </div>
                <ul>
                    {recentComments.map(comment => {
                        const initials = comment.author
                            .split(' ')
                            .map(name => name[0])
                            .join('')
                            .toUpperCase();

                        return (
                            <li key={comment.id} className="comment-card">
                                <div className="comment-image">
                                    {initials}
                                </div>
                                <div className="comment-content">
                                    <div className="comment-author">{comment.author}</div>
                                    <div className="comment-text">{comment.content}</div>
                                    <div className="comment-post-title">
                                        Commented on: <em>{comment.postTitle}</em>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>


                <div className="recent-snippets-header">
                    Recent Snippets
                </div>
                <ul>
                    {recentComments.map(comment => {
                        const initials = comment.author
                            .split(' ')
                            .map(name => name[0])
                            .join('')
                            .toUpperCase();

                        return (
                            <li key={comment.id} className="comment-card">
                                <div className="comment-image">
                                    {initials}
                                </div>
                                <div className="comment-content">
                                    <div className="comment-author">{comment.author}</div>
                                    <div className="comment-text">{comment.content}</div>
                                    <div className="comment-post-title">
                                        Created a new snippet: <em>{comment.postTitle}</em>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            
        </div>
    );
}

export default Dashboard;
