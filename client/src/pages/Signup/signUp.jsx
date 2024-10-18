import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Link,
  Grid,
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from '@mui/system';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const theme = createTheme();

const StyledBox = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const StyledPaper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 24,
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
  borderRadius: 8,
});

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateFullName = (name) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
  };

  const validateDateOfBirth = (date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 10;
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Example: Password must be at least 8 characters long
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFullName(fullName)) {
      toast.error('Full name should not contain numbers or special characters.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!validateDateOfBirth(dateOfBirth)) {
      toast.error('You must be at least 10 years old.');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    const requestBody = { fullName, email, phone, dateOfBirth, gender, profileImage, password };
    try {
      // Replace with your sign-up API call
      console.log('Sign-up request:', requestBody);
      toast.success('Sign-up successful', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate('/login');
    } catch (error) {
      toast.error('Sign-up error', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error('Sign-up error:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Container component="main">
          <StyledPaper>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} noValidate style={{ marginTop: 8, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={setPhone}
                inputStyle={{ color: 'black', width: '100%' }}
              />
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy/MM/dd"
                customInput={<TextField fullWidth margin="normal" label="Date of Birth" />}
                wrapperClassName="datePicker"
              />
              <style>
                {`
                  .datePicker {
                    width: 100%;
                  }
                  .datePicker > div {
                    width: 100%;
                  }
                `}
              </style>

              <TextField
                margin="normal"
                required
                fullWidth
                select
                id="gender"
                label="Gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>

              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Profile Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              {profileImage && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {profileImage.name} uploaded
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={() => navigate('/login')}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </StyledPaper>
        </Container>
      </StyledBox>
    </ThemeProvider>
  );
}

export default SignUp;
