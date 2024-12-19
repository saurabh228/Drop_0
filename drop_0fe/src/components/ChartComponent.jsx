import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/chartComponent.css';
import { Chart } from 'chart.js/auto';

const ChartComponent = ({ focusedRowData }) => {
  const [chartData, setChartData] = useState({
    labels: ["General", "OBC", "SC", "ST"],
    datasets: [
      { label: '', backgroundColor: ['rgba(255, 99, 132, 0.6)'], data: [0] },
      { label: '', backgroundColor: ['rgba(255, 99, 132, 0.6)'], data: [0] },
      { label: '', backgroundColor: ['rgba(255, 99, 132, 0.6)'], data: [0] },
    ],
  });
  const [district, setDistrict] = useState(null);
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  console.log("focused data: ", focusedRowData)
  useEffect(() => {
    if (!focusedRowData || Object.keys(focusedRowData).length === 0) {
      return;
    }

    const updateChart = () => {
      setDistrict(focusedRowData[0]['location']);
      const categories = ['General', 'OBC', 'SC', 'ST'];
      const newChartData = {
        labels: categories.map((category, i) => focusedRowData[i]['Social Category']),
        datasets: ['primary_overall', 'upper_primary_overall', 'secondary_overall'].map((key, i) => ({
          label: ['Primary', 'Upper-Primary', 'Secondary'][i],
          backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'][i],
          data: categories.map((category, j) => focusedRowData[j][key]),
        })),
      };

      setChartData(newChartData);

      if (chartInstance.current) {
        chartInstance.current.data = newChartData;
        chartInstance.current.update();
      } else if (canvasRef.current) {
        chartInstance.current = new Chart(canvasRef.current, {
          type: 'bar',
          data: newChartData,
          options: {
            maintainAspectRatio: true,
            responsive: false,
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
    <div className='chart'>
      <div className='getAnalysis'>
        <h4 className='div1'>{district || null}</h4>
        <Link to={{ pathname: "/CastAnalysis", search: `?district=${focusedRowData?.['General']?.['Location'] || null}` }} className='button-link'>
          Get Caste Analysis
        </Link>
      </div>
      <div>
        <canvas ref={canvasRef} width="650" height="300"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;