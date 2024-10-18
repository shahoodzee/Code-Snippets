import React from 'react';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  if (isMdDown) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        width: '200px',
        backgroundColor: 'white',
        padding: '10px',
        borderRight: '1px solid grey',
      }}
    >
      <Button
        component={Link}
        to="/create-post"
        sx={{
          marginBottom: '10px',
          color: 'grey',
          borderColor: 'darkgrey',
          border: '1px solid',
          backgroundColor: 'transparent',
        }}
      >
        Create Post
      </Button>
      <Button
        component={Link}
        to="/dashboard"
        sx={{
          marginBottom: '10px',
          color: 'grey',
          borderColor: 'darkgrey',
          border: '1px solid',
          backgroundColor: 'transparent',
        }}
      >
        Dashboard
      </Button>
      <Button
        component={Link}
        to="/account"
        sx={{
          color: 'grey',
          borderColor: 'darkgrey',
          border: '1px solid',
          backgroundColor: 'transparent',
        }}
      >
        Account
      </Button>
    </Box>
  );
}

export default Sidebar;