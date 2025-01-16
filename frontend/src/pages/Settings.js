import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    currency: 'USD',
    language: 'en',
    budgetAlerts: true,
    savingsReminders: true,
  });

  const [open, setOpen] = useState(false);
  const [currentSetting, setCurrentSetting] = useState(null);

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const handleOpenDialog = (setting) => {
    setCurrentSetting(setting);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSetting(null);
  };

  const handleChange = (value) => {
    setSettings({
      ...settings,
      [currentSetting]: value,
    });
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper>
        <List>
          {/* Notifications */}
          <ListItem>
            <ListItemText
              primary="Notifications"
              secondary="Enable push notifications"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          {/* Dark Mode */}
          <ListItem>
            <ListItemText
              primary="Dark Mode"
              secondary="Toggle dark/light theme"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          {/* Currency */}
          <ListItem button onClick={() => handleOpenDialog('currency')}>
            <ListItemText
              primary="Currency"
              secondary={`Current: ${settings.currency}`}
            />
          </ListItem>
          <Divider />

          {/* Language */}
          <ListItem button onClick={() => handleOpenDialog('language')}>
            <ListItemText
              primary="Language"
              secondary={`Current: ${settings.language.toUpperCase()}`}
            />
          </ListItem>
          <Divider />

          {/* Budget Alerts */}
          <ListItem>
            <ListItemText
              primary="Budget Alerts"
              secondary="Receive alerts when approaching budget limits"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.budgetAlerts}
                onChange={() => handleToggle('budgetAlerts')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          {/* Savings Reminders */}
          <ListItem>
            <ListItemText
              primary="Savings Reminders"
              secondary="Get reminded about your savings goals"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.savingsReminders}
                onChange={() => handleToggle('savingsReminders')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* Settings Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentSetting === 'currency' ? 'Select Currency' : 'Select Language'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            {currentSetting === 'currency' ? (
              <Select
                value={settings.currency}
                onChange={(e) => handleChange(e.target.value)}
              >
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
                <MenuItem value="JPY">JPY (¥)</MenuItem>
                <MenuItem value="INR">INR (₹)</MenuItem>
              </Select>
            ) : (
              <Select
                value={settings.language}
                onChange={(e) => handleChange(e.target.value)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="zh">Chinese</MenuItem>
              </Select>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Security Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Security
        </Typography>
        <Paper>
          <List>
            <ListItem button>
              <ListItemText
                primary="Change Password"
                secondary="Update your account password"
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Two-Factor Authentication"
                secondary="Enable additional security"
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Login History"
                secondary="View recent account activity"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>

      {/* Data Management */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Data Management
        </Typography>
        <Paper>
          <List>
            <ListItem button>
              <ListItemText
                primary="Export Data"
                secondary="Download your financial data"
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Clear Data"
                secondary="Remove all stored data"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default Settings;
