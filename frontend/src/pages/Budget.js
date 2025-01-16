import React, { useState } from 'react';
import {
  Box,
  Typography,
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
  Grid,
  Paper,
  LinearProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { formatCurrency } from '../utils/currencyFormatter';

const defaultBudgets = [
  {
    id: 1,
    category: 'Groceries',
    amount: 500,
    spent: 350,
    period: 'monthly',
  },
  {
    id: 2,
    category: 'Entertainment',
    amount: 200,
    spent: 150,
    period: 'monthly',
  },
  {
    id: 3,
    category: 'Transportation',
    amount: 300,
    spent: 200,
    period: 'monthly',
  }
];

function Budget() {
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState(defaultBudgets);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    period: 'monthly',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewBudget({
      category: '',
      amount: '',
      period: 'monthly',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({
      ...newBudget,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const budget = {
      id: budgets.length + 1,
      ...newBudget,
      amount: parseFloat(newBudget.amount),
      spent: 0,
    };
    setBudgets([...budgets, budget]);
    handleClose();
  };

  const calculateProgress = (spent, amount) => {
    return (spent / amount) * 100;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Budgets</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        {budgets.map((budget) => (
          <Grid item xs={12} md={6} key={budget.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">{budget.category}</Typography>
                <Typography color="textSecondary">
                  {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)} spent
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(budget.spent, budget.amount)}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 
                        calculateProgress(budget.spent, budget.amount) > 90
                          ? '#f44336'
                          : calculateProgress(budget.spent, budget.amount) > 75
                          ? '#ff9800'
                          : '#4caf50',
                    },
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                align="right"
                sx={{ mt: 1 }}
              >
                {budget.period}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Budget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={newBudget.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={newBudget.amount}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Period</InputLabel>
            <Select
              name="period"
              value={newBudget.period}
              onChange={handleInputChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Budget;
