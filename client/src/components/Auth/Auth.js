import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Box, Grid, IconButton } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login, loginFailure, signUp } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { getValidationErrors } from '../../common/ErrorMessages/FormValidationErrors';
const clientId = '806635105131-mt4ahi7522okg6h209mc3cq3tbeatb85.apps.googleusercontent.com';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = getValidationErrors(form, isSignUp);
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    console.log(form)

    if (isSignUp) {
      dispatch(signUp(form, navigate));
    } else {
      dispatch(login(form, navigate));
    }
  };

  const handleGoogleLogin = (response) => {
    try {
      console.log(response);
      //dispatch(login(user, navigate));
    } catch (error) {
      console.error('Google login error:', error);
      dispatch(loginFailure('Google login failed'));
    }
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
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
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
          error={!!errors.password}
          helperText={errors.password}
        />
        {isSignUp && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
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
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </>
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
          <GoogleLogin
            clientId={clientId}
            onSuccess={handleGoogleLogin}
            onError={() => dispatch(loginFailure('Google login failed'))}
            cookiePolicy="single_host_origin"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
