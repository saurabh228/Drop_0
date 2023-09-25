import './TableComponent.css'; 
import React, { useState } from 'react';

const TableComponent = ({tableData,cellSpans,onRowHover}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [clickedRow, setClickedRow] = useState(null);

  const handleRowHover = (rowIndex) => {
    if(rowIndex > 3 && rowIndex < 37 && clickedRow===null) {setHoveredRow(rowIndex);
    onRowHover(rowIndex); }
  };

  if (!tableData || tableData.length === 0) {
    return <div>No data to display.</div>;
  }

  // Function to specify columns to hide
  const columnsToHide = (columnIndex) => {
    // column indexes to hide
    const hiddenColumns = [1];
    return hiddenColumns.includes(columnIndex);
  };

  // Function to specify rows to hide
  const rowsToHide = (rowIndex) => {
    // row indexes to hide
    const hiddenRows = [0,1];
    return hiddenRows.includes(rowIndex);
  };

  const getCellSpan = (rowIndex, columnIndex) => {
    // Find the cell span object for the specified coordinates
    const cellSpan = cellSpans.find(
      (span) => span.rowIndex === rowIndex && span.columnIndex === columnIndex
    );
    return cellSpan || { colSpan: 1, rowSpan: 1 }; // Default values if no span is defined
  };

  const handleRowClick = (rowIndex) => {
    // Toggle the clicked row by setting it to null if it's already the clicked row
    if(clickedRow === rowIndex){
      setHoveredRow(null); onRowHover(null);
      setClickedRow(null);
    }else{
      setHoveredRow(rowIndex); onRowHover(rowIndex);
      setClickedRow(rowIndex);
    }
  };

  // Filter tableData to include only rows with 'Overall' in cellIndex 1 and rowIndex >= 5
  const filteredTableData = tableData.filter((row, rowIndex) => {
    return rowIndex < 5 || (rowIndex > 4 && row[1] === 'Overall');
  });
  

  return (
    <div>
      <h2>Table</h2>
      <table className="custom-table">
        <thead>
          {/* <tr>
            {tableData[0] &&
              tableData[0].map((header, columnIndex) => (
                !columnsToHide(columnIndex) && <th key={columnIndex}>{header}</th>
              ))}
          </tr> */}
        </thead>
        <tbody>
          {filteredTableData.slice(1).map((row, rowIndex) => (
            !rowsToHide(rowIndex) && (
              <tr key={rowIndex} 
                  className={rowIndex === hoveredRow ? 'hov-row' : (rowIndex % 2 === 0 ? 'even-row' : 'odd-row')}
  
                  onClick={()=>  handleRowClick(rowIndex)}
                  onMouseEnter={() => handleRowHover(rowIndex)}
                  // onMouseLeave={() => setHoveredRow(null)}
                  >
                    {row.map((cell, columnIndex) => {
                    const { colSpan, rowSpan } = getCellSpan(rowIndex, columnIndex);
                    return (
                      (!columnsToHide(columnIndex) && <td key={columnIndex} colSpan={colSpan} rowSpan={rowSpan}>{cell}</td>)
                    );
                    })}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
