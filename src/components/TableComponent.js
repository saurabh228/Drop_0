import './TableComponent.css'; 
import React, { useEffect, useState } from 'react';

const TableComponent = ({ onRowHover, filePath}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [clickedRow, setClickedRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState('Fetching files...');
  const handleRowHover = (rowIndex,rowNum) => {
    if(rowIndex >= 0 && rowIndex < 34 && clickedRow===null) {
      setHoveredRow(rowIndex);
      onRowHover(rowNum); 
    }
  };

  useEffect(() => {
    
    const fetchData = async (filepath) => {
      try {
        const response = await fetch(filepath);
        const json = await response.json();
        setTableData(json);
        setFetchingStatus('');

      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchingStatus('Error fetching file.');
      }
    };
    fetchData(filePath);
  },[filePath]);

  const handleRowClick = (rowIndex, rowNum) => {
    // Toggle the clicked row by setting it to null if it's already the clicked row
    if(clickedRow === rowIndex){
      setHoveredRow(null); 
      setClickedRow(null);
    }else{
      setHoveredRow(rowIndex); onRowHover(rowNum);
      setClickedRow(rowIndex);
    }
  };
  
  const filteredTableData = tableData.filter((item) => {
    return ( item['Social Category'] === 'Overall');
  });
  

  return (
    <div>
      {tableData.length > 0 ? (
      <table className="custom-table">
        <tbody>
        <tr>
        <th></th>
          <th colSpan={3}>Primary</th>
          <th colSpan={3}>Higher Primary</th>
          <th colSpan={3}>Secondary</th>
        </tr>
        <tr>
            <th>Location</th>
            <th>Girls</th>
            <th>Boys</th>
            <th>Overall</th>
            <th>Girls</th>
            <th>Boys</th>
            <th>Overall</th>
            <th>Girls</th>
            <th>Boys</th>
            <th>Overall</th>
          </tr>
        {filteredTableData.map((item, rowIndex) => (
            <tr key={rowIndex}
              className={rowIndex === hoveredRow ? 'hov-row' : (rowIndex % 2 === 0 ? 'even-row' : 'odd-row')}
                
                  onClick={()=>  handleRowClick(rowIndex,item.Index -1)}
                  onMouseEnter={() => handleRowHover(rowIndex,item.Index -1)}
            >
              <td>{item.Location}</td>
              <td>{item.Girls_1}</td>
              <td>{item.Boys_1}</td>
              <td>{item.Overall_1}</td>
              <td>{item.Girls_2}</td>
              <td>{item.Boys_2}</td>
              <td>{item.Overall_2}</td>
              <td>{item.Girls_3}</td>
              <td>{item.Boys_3}</td>
              <td>{item.Overall_3}</td>
            </tr>
          ))}
         
        </tbody>
      </table>
      ) : (
        <div>{fetchingStatus}</div>
      )}
    </div>
  );
};

export default TableComponent;
