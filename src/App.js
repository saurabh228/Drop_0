import React, { useEffect, useState } from 'react';
import './App.css';
import TableComponent from './TableComponent';
import ChartComponent from './ChartComponent';
import * as XLSX from 'xlsx';

function App() {

  const [tableData, setTableData] = useState([]);
  const [cellSpans, setCellSpans] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowHover = (row) => {
    setSelectedRow(row);
  };


  useEffect(() => {
    fetch('/DropRate21_22.xlsx') // Path to your Excel file in the public directory
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setTableData(parsedData);
        setCellSpans([
          { rowIndex: 2, columnIndex: 2, colSpan: 3, rowSpan: 1 }, 
          { rowIndex: 2, columnIndex: 5, colSpan: 3, rowSpan: 1 }, 
          { rowIndex: 2, columnIndex: 8, colSpan: 3, rowSpan: 1 }, 
          // Set colspan and rowspan for a cell
        ]);
      })
      .catch((error) => {
        console.error('Error loading Excel file:', error);
      });
  }, []);


  return (
    <div className="App">
      <div className="left-half">
        <div className='scroll-container'>
        <TableComponent tableData={tableData} cellSpans={cellSpans} onRowHover={handleRowHover} />
        </div>
      </div>
      <div className="right-half">
        <div className='scroll-container'>
        <ChartComponent data={tableData} selectedRow={selectedRow}/>
        </div>
      </div>
    </div>
  );
}

export default App;
