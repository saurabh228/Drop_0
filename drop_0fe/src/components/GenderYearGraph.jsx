import React, { useState, useEffect, useRef } from 'react';
import '../styles/genderYearGraph.css';
import Chart from 'chart.js/auto';

const GenderYearGraph = ({ selectedRow }) => {
  const [mode, setMode] = useState(1);
  const [tablesArray, setTablesArray] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState('Fetching files...');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: 'Girls', borderColor: 'pink', data: [] },
      { label: 'Boys', borderColor: 'blue', data: [] },
      { label: 'Overall', borderColor: 'orange', data: [] },
    ],
  });
  const canvasId2 = "genderYearChart";
  const chartInstance = useRef(null);
  const files = [
    '/data/DropRate14_15.json',
    '/data/DropRate15_16.json',
    '/data/DropRate16_17.json',
    '/data/DropRate17_18.json',
    '/data/DropRate18_19.json',
    '/data/DropRate19_20.json',
    '/data/DropRate20_21.json',
    '/data/DropRate21_22.json',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromises = files.map(async (file) => {
          const response = await fetch(file);
          return response.json();
        });

        const fetchedTables = await Promise.allSettled(fetchPromises);
        const successfulTables = fetchedTables
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        setTablesArray(successfulTables);
        setFetchingStatus('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchingStatus('Error fetching files.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!tablesArray.length || ![1, 2, 3].includes(mode)) return;
    const rowIndex = selectedRow !== null ? selectedRow : 169;

    const labels = tablesArray.map((_, index) => 2015 + index);
    const dataKeys = ['Girls', 'Boys', 'Overall'].map((key) => `${key}_${mode}`);

    const newChartData = {
      labels,
      datasets: dataKeys.map((key, i) => ({
        label: ['Girls', 'Boys', 'Overall'][i],
        borderColor: ['PaleGreen', 'Purple', 'OrangeRed'][i],
        data: tablesArray.map((table) => table[rowIndex][key]),
      })),
    };

    setChartData(newChartData);

    if (chartInstance.current) {
      chartInstance.current.data = newChartData;
      chartInstance.current.update();
    } else if (document.getElementById(canvasId2)) {
      chartInstance.current = new Chart(document.getElementById(canvasId2), {
        type: 'line',
        data: newChartData,
        options: {
          maintainAspectRatio: true,
          responsive: false,
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [selectedRow, tablesArray, mode]);

  return (
    <div className='lines'>
      <div className="mode-buttons">
        {['Primary', 'Higher Primary', 'Secondary'].map((label, i) => (
          <button key={i} onClick={() => setMode(i + 1)} className={mode === i + 1 ? 'active' : ''}>
            {label}
          </button>
        ))}
      </div>
      <canvas id={canvasId2} width="650" height="300"></canvas>
    </div>
  );
};

export default GenderYearGraph;