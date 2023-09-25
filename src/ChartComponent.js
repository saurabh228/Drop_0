import './ChartComponent.css'; 
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data, selectedRow }) => {
  const [chartData, setChartData] = useState({});
  const [district, setDistrict] = useState(null);
  
  const emptyChart = {
      labels: ["General", "OBC", "SC", "ST"],
      datasets: [
        {
          label: '',
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          data: [0],
        },
        
        {
          label: '',
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          data: [0],
        },
        {
          label: '',
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          data: [0],
        },
        {
          label: '',
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          data: [0],
        },
        
      ],
    };
  

  useEffect(() => {
    if (!selectedRow || selectedRow < 4 || selectedRow >36 ) {
      return; // No row selected
    }
    

    const districtIndex =(selectedRow-3)*5;
    setDistrict(data[(selectedRow-3)*5][0]);
    const generalIndex = districtIndex;
    const obcIndex = districtIndex +1;
    const scIndex = districtIndex + 2;
    const stIndex = districtIndex +3;

    console.log('data:', data);
console.log('selectedRow:', selectedRow);
console.log('districtIndex:', districtIndex);
// ... add more logs for other variables

    

  

    const chartData = {
      labels: [data[generalIndex][1], data[obcIndex][1], data[scIndex][1], data[stIndex][1]],
      datasets: [
        {
          label: 'Primary',
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          data: [data[generalIndex][4], data[obcIndex][4], data[scIndex][4], data[stIndex][4]],
        
          barPercentage: 1, // Adjust the width of the bars in the group
          categoryPercentage: 0.5, // Adjust the space between groups

        },
        
        {
          label: 'Higher-Primary',
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(54, 162, 235, 0.6)'],
          data: [data[generalIndex][7], data[obcIndex][7], data[scIndex][7], data[stIndex][7]],
        
          barPercentage: 1,
          categoryPercentage: 0.5,
        
        },
        {
          label: 'Secondary',
          backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 206, 86, 0.6)'],
          data: [data[generalIndex][10], data[obcIndex][10], data[scIndex][10], data[stIndex][10]],
        
          barPercentage: 1,
          categoryPercentage: 0.5,

        },
        
      ],
    };

    setChartData(chartData);
  }, [selectedRow, data]);

  const filteredTableData = data.filter((row, rowIndex) => {
    return (rowIndex > 4 && row[1] === 'Overall') && rowIndex <170;
  });

  

  return (
    <div>
      <h2>Bar Chart</h2>
      <div className="chart">
        {selectedRow!=null && chartData.labels && chartData.datasets ? (
          <div>
            <h4>{district}</h4>
            <Bar
              data={chartData}
              options={{
              scales: {
                  x: {
                    stacked: false,
                  },
                  y: {
                    stacked: false,
                  },
                },
              }}
              />
          </div>
        ) : (
          <div>
            <p >Please Select a District from Table on Left.</p>
            <Bar
            data={emptyChart}
            options={{
              scales: {
                x: {
                  stacked: false,
                },
                y: {
                  stacked: false,
                },
              },
            }}
        />
          </div>
          
        )}
      </div>
    </div>
  );
};

export default ChartComponent;

  