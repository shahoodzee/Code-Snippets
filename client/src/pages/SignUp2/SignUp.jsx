import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TemplateFrame from './TemplateFrame';
import { GoogleIcon, FacebookIcon, CodeSnippetsIcon } from './customIcons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import getSignUpTheme from './theme/getSignUpTheme';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import CssBaseline from '@mui/material/CssBaseline';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '90vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
  });

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    setMode(savedMode || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const validateInputs = () => {
    const formErrors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!document.getElementById('name').value) formErrors.name = 'Name is required';
    if (!emailPattern.test(document.getElementById('email').value)) formErrors.email = 'Please enter a valid email';
    if (document.getElementById('password').value.length < 6) formErrors.password = 'Password must be at least 6 characters long';
    if (!document.getElementById('phone').value) formErrors.phone = 'Phone number is required';
    if (!document.getElementById('dob').value) formErrors.dob = 'Date of birth is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      console.log(Object.fromEntries(data.entries()));
    }
  };

  return (
    <TemplateFrame showCustomTheme={showCustomTheme} mode={mode} toggleColorMode={toggleColorMode}>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <CodeSnippetsIcon />
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={!!errors.name}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <PhoneInput
                country="us"
                id="phone"
                name="phone"
                containerStyle={{ width: '100%' }}
                inputStyle={{ width: '100%' }}
                onChange={() => setErrors({ ...errors, phone: '' })}
                isValid={!errors.phone}
              />
              {errors.phone && <Typography color="error">{errors.phone}</Typography>}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="dob">Date of Birth</FormLabel>
              <TextField
                required
                fullWidth
                name="dob"
                placeholder="YYYY-MM-DD"
                id="dob"
                autoComplete="bday"
                variant="outlined"
                error={!!errors.dob}
                helperText={errors.dob}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="/material-ui/getting-started/templates/sign-in/" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Sign up with Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </TemplateFrame>
  );
}
