import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Tab,
  Tabs,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    full_name: '',
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const success = await register(formData);
    if (success) {
      setActiveTab(0);
      setFormData((prev) => ({
        ...prev,
        username: '',
        full_name: '',
      }));
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Finance Tracker
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {activeTab === 0 ? (
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleRegister}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="full_name"
                label="Full Name"
                name="full_name"
                autoComplete="name"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
