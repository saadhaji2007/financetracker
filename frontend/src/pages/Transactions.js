import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { formatCurrency } from '../utils/currencyFormatter';

const categories = [
  'Groceries',
  'Transportation',
  'Entertainment',
  'Bills',
  'Shopping',
  'Healthcare',
  'Other',
];

function Transactions() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2025-01-12',
      type: 'expense',
      category: 'Groceries',
      amount: 150.00,
      description: 'Weekly groceries',
    },
    // Add more sample transactions here
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTransaction({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Add validation here
    const transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    };
    setTransactions([...transactions, transaction]);
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Transactions</Typography>
        <Button
          variant="contained"
          startIcon={<Button />}
          onClick={handleClickOpen}
        >
          Add Transaction
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell align="right" sx={{ color: transaction.type === 'expense' ? 'error.main' : 'success.main' }}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <Button size="small">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Transaction Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
                label="Type"
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
              fullWidth
              InputProps={{
                startAdornment: <span style={{ marginRight: 8 }}>$</span>,
              }}
            />

            <TextField
              name="description"
              label="Description"
              value={newTransaction.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Transactions;
