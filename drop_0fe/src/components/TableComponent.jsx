import '../styles/tableComponent.css'; 
import React, { useState } from 'react';
import { Table, TableHead, TableContainer, TableBody, TableRow, TableCell } from '@mui/material';

const TableComponent = ({ onRowHover, tableData }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [clickedRow, setClickedRow] = useState(null);

  const handleRowHover = (rowIndex, dataId) => {
    if (rowIndex >= 0 && rowIndex < tableData.length/5 && clickedRow === null) {
      setHoveredRow(rowIndex);
      onRowHover(dataId);
    }
  };

  const handleRowClick = (rowIndex, dataId) => {
    if (clickedRow === rowIndex) {
      setHoveredRow(null);
      setClickedRow(null);
    } else {
      setClickedRow(rowIndex);
      setHoveredRow(rowIndex);
      onRowHover(dataId);
    }
  };

  const filteredTableData = tableData.filter((item) => item['social_category'] === 'Overall');

  const [sortConfig, setSortConfig] = useState({
    key: 'Location',
    direction: 'ascending',
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTableData = [...filteredTableData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <TableContainer >
      {tableData.length > 0 ? (
        <Table className="custom-table" style={{width: 'fit-content' ,marginRight: 'auto', marginLeft: 'auto'}}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={3}>Primary</TableCell>
              <TableCell colSpan={3}>Higher Primary</TableCell>
              <TableCell colSpan={3}>Secondary</TableCell>
            </TableRow>
            <TableRow>
              {[
                'location',
                'primary_girls',
                'primary_boys',
                'primary_overall',
                'upper_primary_girls',
                'upper_primary_boys',
                'upper_primary_overall',
                'secondary_girls',
                'secondary_boys',
                'secondary_overall',
              ].map((key) => (
                <TableCell
                  key={key}
                  onClick={() => handleSort(key)}
                  className={sortConfig.key === key ? sortConfig.direction : ''}
                >
                  {capitalizeFirstLetter(key.includes('_') ? key.split('_').pop() : key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{height:'fit-content'}}>
            {sortedTableData.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={
                  rowIndex === hoveredRow ? 'hov-row' : rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
                }
                onClick={() => handleRowClick(rowIndex, item.id)}
                onMouseEnter={() => handleRowHover(rowIndex, item.id)}
              >
                <TableCell className={item.location === 'All India' ? 'overallRate' : ''} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  {item.location}
                </TableCell>
                {[
                  'primary_girls',
                  'primary_boys',
                  'primary_overall',
                  'upper_primary_girls',
                  'upper_primary_boys',
                  'upper_primary_overall',
                  'secondary_girls',
                  'secondary_boys',
                  'secondary_overall',
                  ].map((key) => (
                  <TableCell key={key}>{item[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>Fetching files...</div>
      )}
    </TableContainer>
  );
};

export default TableComponent;