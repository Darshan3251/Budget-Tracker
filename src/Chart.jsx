// Chart.jsx
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registering necessary components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ type, income, expenses }) => {
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expenses],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };
  const options = {
    responsive: true,
    tooltip: {
        titleColor: '#ff5722', // Tooltip title color
        bodyColor: '#ffffff', // Tooltip body text color
        backgroundColor: '#333', // Tooltip background color
      },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff', // Change legend text color
        },
      },
    },
    scales: {
        x: {
          ticks: {
            color: '#fff', // X-axis label color
          },
        },
        y: {
          ticks: {
            color: '#fff', // Y-axis label color
          },
        },
      },
   
  };

  return (
    <div>
      <h3>Budget Overview</h3>
      {type === 'pie' ? <Pie data={data} options={options} /> : <Bar data={barData} options={options} />}
    </div>
  );
};

export default Chart;
