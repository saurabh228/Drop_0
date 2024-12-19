import React, { use, useEffect, useState } from 'react';
import '../styles/visuals.css';
import TableComponent from './TableComponent';
import ChartComponent from './ChartComponent';
import GenderYearGraph from './GenderYearGraph';
import { fetchDropOutRates, fetchStates } from '../services/api';

function Home() {
  const [states, setStates] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [dropoutData, setDropoutData] = useState({});
  const [focusedRowData, setFocusedRowData] = useState([]);

  useEffect(() => {
    fetchStates().then((data) => {
      setStates(data);
      const nationalKey = Object.keys(data).find((key) => data[key] === 'National');
      setSelectedState(nationalKey);
    });
  }, []);

  useEffect(() => {
    if (!states || !selectedState) return;
    fetchDropOutRates(selectedState).then((data) => {
      setDropoutData(data);
      setYearsList(Object.keys(data));
      setSelectedYear(Math.max(...Object.keys(data)));
    });
  }, [selectedState, states]);


  const handleRowHover = (dataId) => {
    const dataIndex = dropoutData[selectedYear].findIndex((item) => item['id'] === dataId);
    // taka data from dataIndex and 4 previous indexes
    setFocusedRowData(dropoutData[selectedYear].slice(dataIndex - 4, dataIndex + 1));
  };

  const handleYearChange = (event) => {
    
  };

  return (
    <div>
      <div className="Visuals">
        <div className="left-half">
            <div className='dropdown-container'>
              <label htmlFor="yearDropdown" className="dropdown-button">Dropout Rates for</label>
              <select id="yearDropdown" value={0} onChange={handleYearChange} className="dropdown-content">
                {['14', '15', '16', '17', '18', '19', '20', '21', '22'].map((year) => (
                  <option key={year} value={`/data/national/${year}.json`}>{`${parseInt(year)-1}-${parseInt(year)}`}</option>
                ))}
              </select>
            </div>
          <div className='table-container'>
            { selectedYear && dropoutData[selectedYear] && (
              <TableComponent onRowHover={handleRowHover} tableData={dropoutData[selectedYear]} />
            )}
          </div>
        </div>
        <div className="right-half">
          <div>
            <ChartComponent focusedRowData={focusedRowData} />
            {/* <GenderYearGraph selectedRow={selectedRow} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;