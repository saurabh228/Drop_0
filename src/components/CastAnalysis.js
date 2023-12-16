
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './CastAnalysis.css';
import Chart from 'chart.js/auto';
import { useLocation } from 'react-router-dom';

function CastAnalysis () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [districtRowNum, setDistrictRowNum] = useState(searchParams.get('district'));
  const [district, setDistrict] = useState(null);
  const [filePath, setFilePath] = useState('/data/DropRate21_22.json');
  const [tableData, setTableData] = useState([]);
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setFilePath(year);
  };

  useEffect(() => {
    const fetchData = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const json = await response.json();
        setTableData(json);
        setDistrict(json[districtRowNum]['Location']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(filePath);
  },[filePath]);

  useEffect(() => {
    if (tableData.length > 0) {
      const generalIndex = districtRowNum - 4;
      const obcIndex = generalIndex + 1;
      const scIndex = generalIndex + 2;
      const stIndex = generalIndex + 3;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx1 = document.getElementById('chart1').getContext('2d');
      const ctx2 = document.getElementById('chart2').getContext('2d');
      const ctx3 = document.getElementById('chart3').getContext('2d');

      const data1 = {
        labels: ['General', 'OBC', 'SC', 'ST'],
        datasets: [{
          label: 'Overall 1',
          data: [
            tableData[generalIndex]['Overall_1'],
            tableData[obcIndex]['Overall_1'],
            tableData[scIndex]['Overall_1'],
            tableData[stIndex]['Overall_1']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      };

      const data2 = {
        labels: ['General', 'OBC', 'SC', 'ST'],
        datasets: [{
          label: 'Overall 2',
          data: [
            tableData[generalIndex]['Overall_2'],
            tableData[obcIndex]['Overall_2'],
            tableData[scIndex]['Overall_2'],
            tableData[stIndex]['Overall_2']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      };

      const data3 = {
        labels: ['General', 'OBC', 'SC', 'ST'],
        datasets: [{
          label: 'Overall 3',
          data: [
            tableData[generalIndex]['Overall_3'],
            tableData[obcIndex]['Overall_3'],
            tableData[scIndex]['Overall_3'],
            tableData[stIndex]['Overall_3']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      };

      chartInstance.current = new Chart(ctx1, {
        type: 'polarArea',
        data: data1,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Overall 1'
            }
          }
        }
      });

      chartInstance.current = new Chart(ctx2, {
        type: 'polarArea',
        data: data2,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Overall 2'
            }
          }
        }
      });

      chartInstance.current = new Chart(ctx3, {
        type: 'polarArea',
        data: data3,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Overall 3'
            }
          }
        }
      });
    }
  }, [tableData, districtRowNum]);

  return (
    <div className='Analysis'>
      <h1>Cast Analysis</h1>
      <div className='dropdown-container'>
        <label htmlFor="yearDropdown" className="dropdown-button">Dropout Rates for Year</label>
        <select id="yearDropdown" value={filePath} onChange={handleYearChange} className="dropdown-content">
          <option value="/data/DropRate14_15.json">2014-2015</option>
          <option value="/data/DropRate15_16.json">2015-2016</option>
          <option value="/data/DropRate16_17.json">2016-2017</option>
          <option value="/data/DropRate17_18.json">2017-2018</option>
          <option value="/data/DropRate18_19.json">2018-2019</option>
          <option value="/data/DropRate19_20.json">2019-2020</option>
          <option value="/data/DropRate20_21.json">2020-2021</option>
          <option value="/data/DropRate21_22.json">2021-2022</option>
        </select>
      </div>
      <h2>{district}</h2>
      <div className="chart-container">
        <canvas id="chart1" ref={canvasRef}></canvas>
        <canvas id="chart2" ref={canvasRef}></canvas>
        <canvas id="chart3" ref={canvasRef}></canvas>
      </div>
    </div>
  );

}
export default CastAnalysis;