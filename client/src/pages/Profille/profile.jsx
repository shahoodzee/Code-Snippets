import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../service/api';
import { Container, Paper, Typography, Avatar, Grid, Box, CircularProgress } from '@mui/material';
import { format } from 'date-fns';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (!user) {
    return (
      <Container maxWidth="md">
        <Typography align="center">No user data available.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100%', height: 'auto', minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4, pt: "10px" }}>
      
      <Box sx={{ maxWidth: 'false', mx: 'auto', pl: 2, pr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 4, borderRadius: 2, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
          <Avatar
            alt={user.fullName}
            src={user.imageUrl}
            sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', mr: 2 }}
          >
            {!user.imageUrl && user.fullName.split(' ').map(name => name[0]).join('').slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
            {user.fullName}
          </Typography>
        </Box>

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                <strong>Email:</strong>
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#e0e0e0', borderRadius: 1, width: '50%' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                  {user.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                <strong>Date of Birth:</strong>
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#e0e0e0', borderRadius: 1, width: '50%' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                  {user.dateOfBirth ? format(new Date(user.dateOfBirth), 'MMMM dd, yyyy') : 'Not provided'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                <strong>Joined Since:</strong>
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#e0e0e0', borderRadius: 1, width: '50%' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                  {user.dateCreated ? format(new Date(user.dateCreated), 'MMMM dd, yyyy') : 'Not available'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                <strong>Gender:</strong>
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#e0e0e0', borderRadius: 1, width: '50%' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'black' }}>
                  {user.gender || 'Not specified'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      
      </Box>
    </Container>
  );
};

export default Profile;
