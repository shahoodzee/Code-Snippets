import { styled } from '@mui/system';
import { Container, Typography, Chip, Card } from '@mui/material';


export const PostContainer = styled(Container)(({ theme }) => ({
    padding: '40px 20px',
    backgroundColor: '#f7f9fc',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
}));

export const CodeBlock = styled('pre')({
    backgroundColor: '#2d2d2d',
    color: '#f8f8f2',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontSize: '1rem',
    overflowX: 'auto',
    fontFamily: 'monospace',
});

export const PostTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333333', // Replace with your desired hex color
    fontSize: '2rem',
}));

export const PostDescription = styled(Typography)(({ theme }) => ({
    color: '#333333', // Replace with your desired hex color
    marginBottom: '25px',
    fontSize: '1.2rem',
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: '#333333', // Replace with your desired hex color
    color: 'white',
    fontWeight: 'bold',
}));

export const CommentBox = styled(Card)(({ theme }) => ({
    marginTop: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
}));

export const CommentAuthor = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: '#333333', // Replace with your desired hex color
}));

export const CommentContent = styled(Typography)(({ theme }) => ({
    color: '#333333', // Replace with your desired hex color
    marginTop: '10px',
}));