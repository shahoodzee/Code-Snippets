import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Box, Grid, IconButton } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login, loginFailure } from '../../actions/auth'; // Import loginFailure
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(login(form, navigate));
  };

  const handleGoogleLogin = (response) => {
    //const user = { email: 'google_user@example.com' };
    console.log(response);
    //dispatch(login(user, navigate));
  };

  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton color="primary">
        <LockOutlinedIcon />
      </IconButton>
      <Typography component="h1" variant="h5">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        {isSignUp && (
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={handleChange}
          />
        )}
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
        <Grid container>
          <Grid item xs>
            <Button onClick={() => setIsSignUp(!isSignUp)} variant="text">
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => dispatch(loginFailure('Google login failed'))} />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
