import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatCurrency } from '../utils/currencyFormatter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [3000, 3200, 3100, 3400, 3300, 3500],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: [2500, 2700, 2400, 2800, 2600, 2900],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  // Chart options with Rupee formatting
  const chartOptions = {
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
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Balance
              </Typography>
              <Typography variant="h4">
                {formatCurrency(5234)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Income
              </Typography>
              <Typography variant="h4">
                {formatCurrency(3500)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Expenses
              </Typography>
              <Typography variant="h4">
                {formatCurrency(2900)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expenses
            </Typography>
            <Line data={chartData} options={chartOptions} />
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            {/* Add transaction list component here */}
          </Paper>
        </Grid>

        {/* Budget Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Budget Overview
            </Typography>
            {/* Add budget overview component here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
