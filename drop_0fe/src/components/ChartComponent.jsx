import React, { useEffect, useState, useRef } from 'react';
import '../styles/chartComponent.css';
import { Chart } from 'chart.js/auto';
import { Container, Box, Paper } from '@mui/material';

const ChartComponent = ({ focusedRowData }) => {
  const [district, setDistrict] = useState(null);
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!focusedRowData || focusedRowData.length === 0) {
      return;
    }

    const updateChart = () => {
      setDistrict(focusedRowData[0]['location']);
      const categories = ['General', 'OBC', 'SC', 'ST'];
      const newChartData = {
        labels: categories.map(category => {
          const row = focusedRowData.find(row => row.social_category === category);
          return row ? row.social_category : category;
        }),
        datasets: ['primary_overall', 'upper_primary_overall', 'secondary_overall'].map((key, i) => ({
          label: ['Primary', 'Upper-Primary', 'Secondary'][i],
          backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'][i],
          data: categories.map(category => {
            const row = focusedRowData.find(row => row.social_category === category);
            return row ? row[key] : 0;
          }),
        })),
      };

      if (chartInstance.current) {
        chartInstance.current.data = newChartData;
        chartInstance.current.update();
      } else if (canvasRef.current) {
        chartInstance.current = new Chart(canvasRef.current, {
          type: 'bar',
          data: newChartData,
          options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              x: { stacked: false },
              y: { stacked: false, beginAtZero: true },
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 20,
                  padding: 20,
                  font: { size: 14 },
                },
              },
            },
          },
        });
      }
    };

    updateChart();
  }, [focusedRowData]);

  return (
    <Container sx={{maxWidth: '600px'}}>
      <Box sx={{textAlign:'left', maxWidth: '600px',  marginLeft:'auto', marginRight: 'auto'}}>
        <h4 >{district || null}</h4>
      </Box>
      <Paper elevation={3} sx={{maxWidth: '600px',  marginLeft:'auto', marginRight: 'auto'}}>
        <canvas ref={canvasRef} ></canvas>
      </Paper>
    </Container>
  );
};

export default ChartComponent;