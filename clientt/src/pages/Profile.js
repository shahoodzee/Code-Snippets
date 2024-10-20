import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const ProfileComponent = () => <div>Profile Component</div>;
const AccountComponent = () => <div>Account Component</div>;
const GeneralComponent = () => <div>General Component</div>;

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<ProfileComponent />);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleItemClick = (item) => {
    if (item.navigate) {
      navigate(item.navigate); // Navigate to the specified route
    } else {
      setSelectedComponent(<item.component />); // Render the selected component
    }
    setDrawerOpen(false); // Close drawer on item click for better UX on mobile
  };

  const menuItems = [
    { text: 'Profile', icon: <AccountCircleIcon />, component: ProfileComponent },
    { text: 'Account', icon: <ManageAccountsIcon />, component: AccountComponent },
    { text: 'General', icon: <AccessibilityIcon />, component: GeneralComponent },
    { text: 'Dashboard', icon: <DashboardIcon />, navigate: '/Dashboard' }, // This will handle navigation
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <SettingsSuggestIcon /> Profile Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box sx={{ width: 240 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => handleItemClick(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default Sidebar;
