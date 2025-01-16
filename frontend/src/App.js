import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import SavingsGoals from './pages/SavingsGoals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { token } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      {token && <Navigation />}
      <main style={{ flexGrow: 1, padding: token ? '20px' : 0 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <PrivateRoute>
                <Budget />
              </PrivateRoute>
            }
          />
          <Route
            path="/savings"
            element={
              <PrivateRoute>
                <SavingsGoals />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
