import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { formatCurrency } from '../utils/currencyFormatter';

function SavingsGoals() {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'New Car',
      targetAmount: 30000,
      currentAmount: 15000,
      deadline: '2025-12-31',
    },
    {
      id: 2,
      name: 'Vacation',
      targetAmount: 5000,
      currentAmount: 2500,
      deadline: '2025-06-30',
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const goal = {
      id: goals.length + 1,
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount),
    };
    setGoals([...goals, goal]);
    handleClose();
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Savings Goals</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} key={goal.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">{goal.name}</Typography>
                <Typography color="textSecondary">
                  {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)} saved
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={calculateProgress(goal.currentAmount, goal.targetAmount)}
                  sx={{
                    mt: 1,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'success.main',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {Math.round(calculateProgress(goal.currentAmount, goal.targetAmount))}% of goal achieved
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Target Date: {new Date(goal.deadline).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Savings Goal</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              margin="dense"
              label="Goal Name"
              fullWidth
              value={newGoal.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Target Amount"
              type="number"
              fullWidth
              value={newGoal.targetAmount}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <span style={{ marginRight: 8 }}>$</span>,
              }}
            />
            <TextField
              margin="dense"
              label="Current Amount"
              type="number"
              fullWidth
              value={newGoal.currentAmount}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <span style={{ marginRight: 8 }}>$</span>,
              }}
            />
            <TextField
              margin="dense"
              label="Target Date"
              type="date"
              fullWidth
              value={newGoal.deadline}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SavingsGoals;
