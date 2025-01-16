import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalance as TransactionsIcon,
  Assignment as BudgetIcon,
  Savings as SavingsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Transactions', icon: <TransactionsIcon />, path: '/transactions' },
    { text: 'Budget', icon: <BudgetIcon />, path: '/budget' },
    { text: 'Savings Goals', icon: <SavingsIcon />, path: '/savings' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          Finance Tracker
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}

export default Navigation;
