import React, { useState, useEffect, useRef } from 'react';
import '../styles/genderYearGraph.css';
import Chart from 'chart.js/auto';
import { Container, Box, Button, Paper } from '@mui/material';

const GenderYearGraph = ({ yearlyData, yearsList }) => {
  const [mode, setMode] = useState(0);
  const canvasId2 = "genderYearChart";
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!yearlyData || yearlyData.length === 0) {
      return;
    }

    const updateChart = () => {
      const labels = yearsList;
      const dataKeys = ['primary', 'upper_primary', 'secondary'].map((key) => `${key}_${mode === 1 ? 'girls' : mode === 2 ? 'boys' : 'overall'}`);

      const newChartData = {
        labels,
        datasets: dataKeys.map((key, i) => ({
          label: ['Girls', 'Boys', 'Overall'][i],
          borderColor: ['PaleGreen', 'Purple', 'OrangeRed'][i],
          data: yearsList.map(year => {
            const yearData = yearlyData[year]?.find(row => row.social_category === 'General');

            return yearData ? yearData[key] : 0;
          }),

        })),
      };

      if (chartInstance.current) {
        chartInstance.current.data = newChartData;
        chartInstance.current.update();
      } else if (document.getElementById(canvasId2)) {
        chartInstance.current = new Chart(document.getElementById(canvasId2), {
          type: 'line',
          data: newChartData,
          options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              x: { ticks: { font: { size: 12 } } },
              y: { ticks: { font: { size: 12 } } },
            },
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 40,
                padding: 20,
                color: 'black',
                font: { size: 14 },
              },
            },
          },
        });
      }
    };

    updateChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [yearlyData, mode]);

  return (
    <Container mb={4} sx={{maxWidth: '600px'}}>
      <Paper 
        elevation={3} 
        padding={8} 
        sx={{
          maxWidth: '600px',  
          marginLeft:'auto', 
          marginRight: 'auto'
        }}>
        <canvas id={canvasId2}></canvas>
      </Paper>
      <Box 
        display="flex" 
        justifyContent="center" 
        mt={2} 
        mb={1} 
        sx={{
          maxWidth: '600px',  
          marginLeft:'auto', 
          marginRight: 'auto'  
        }}>
        {['Primary', 'Higher Primary', 'Secondary'].map((label, i) => (
          <Box key={i} mx={1}>
            <Button 
              variant={mode === i ? 'contained' : 'outlined'} 
              onClick={() => setMode(i)}
            >
              {label}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default GenderYearGraph;