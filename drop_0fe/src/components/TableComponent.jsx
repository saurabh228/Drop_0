import '../styles/tableComponent.css'; 
import React, { useEffect, useState } from 'react';

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
      setHoveredRow(rowIndex);
      onRowHover(dataId);
      setClickedRow(rowIndex);
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
    <div>
      {tableData.length > 0 ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th></th>
              <th colSpan={3}>Primary</th>
              <th colSpan={3}>Higher Primary</th>
              <th colSpan={3}>Secondary</th>
            </tr>
            <tr>
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
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={sortConfig.key === key ? sortConfig.direction : ''}
                >
                  {capitalizeFirstLetter(key.includes('_') ? key.split('_')[1] : key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTableData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex === hoveredRow
                    ? 'hov-row'
                    : rowIndex % 2 === 0
                    ? 'even-row'
                    : 'odd-row'
                }
                onClick={() => handleRowClick(rowIndex, item.id)}
                onMouseEnter={() => handleRowHover(rowIndex, item.id)}
              >
                <td className={item.Location === '_Overall_' ? 'overallRate' : ''}>
                  {item.location}
                </td>
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
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Fetching files...</div>
      )}
    </div>
  );
};

export default TableComponent;