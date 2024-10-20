import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { fetchUser } from '../../service/api';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', borderBottom: '1px solid grey', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: 'black' }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            Code Snippets
          </Link>
          <Link to="/blogs" style={{  marginLeft: 15, textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            Blogs
          </Link>
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 2 }}>
              <Typography variant="body2" sx={{ color: 'black', lineHeight: 1.1 }}>
                {user.fullName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'grey', lineHeight: 1 }}>
                {user.role}
              </Typography>
            </Box>
            <IconButton 
              onClick={handleMenuOpen} 
              sx={{ 
                color: 'black',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              disableRipple
            >
              <Avatar 
                alt={user.fullName} 
                src={user.imageUrl}
                sx={{
                  width: 40,
                  height: 40,
                  border: 'none',
                }}
              >
                {!user.imageUrl && user.fullName.split(' ').map(name => name[0]).join('').toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ color: 'red' }}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;