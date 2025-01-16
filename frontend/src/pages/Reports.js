import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { formatCurrency, CURRENCY_SYMBOL } from '../utils/currencyFormatter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [timeRange, setTimeRange] = useState('month');

  // Sample data - replace with real data from API
  const spendingTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Spending',
        data: [1200, 1900, 1500, 1700],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const categoryData = {
    labels: ['Groceries', 'Transportation', 'Entertainment', 'Bills', 'Shopping'],
    datasets: [
      {
        data: [300, 200, 150, 500, 250],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const incomeVsExpenseData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income',
        data: [2000, 2000, 2000, 2000],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Expenses',
        data: [1200, 1900, 1500, 1700],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Configure chart options with Rupee symbol
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += formatCurrency(context.parsed.y);
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Spending Trend */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Spending Trend
            </Typography>
            <Line
              data={spendingTrendData}
              options={options}
            />
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Spending by Category
            </Typography>
            <Pie
              data={categoryData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Income vs Expenses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expenses
            </Typography>
            <Bar
              data={incomeVsExpenseData}
              options={options}
            />
          </Paper>
        </Grid>

        {/* Summary Statistics */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Summary Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography color="textSecondary">Total Income</Typography>
                <Typography variant="h6">{formatCurrency(8000)}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography color="textSecondary">Total Expenses</Typography>
                <Typography variant="h6">{formatCurrency(6300)}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography color="textSecondary">Net Savings</Typography>
                <Typography variant="h6">{formatCurrency(1700)}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography color="textSecondary">Savings Rate</Typography>
                <Typography variant="h6">21.25%</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;
