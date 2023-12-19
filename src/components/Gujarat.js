
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import gujaratTopojson from './gujarat.json';

const GujaratMap = () => {
  const svgRef = useRef(null);
  const [districtRowNum, setDistrictRowNum] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [district, setDistrict] = useState("Gujarat");
  const [filePath, setFilePath] = useState('/data/DropRate21_22.json');

  const gujaratGeojson = useMemo(() => {
    return topojson.feature(gujaratTopojson, gujaratTopojson.objects.districts);
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setFilePath(year);
  };

  useEffect(() => {
    const fetchData = async (filePath) => {
      try {
        const response = await fetch(filePath);
        const json = await response.json();
        // console.log('Fetched Data:', json);
        setTableData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(filePath);
  }, [filePath]);

  useEffect(() => {

    if (!tableData || tableData.length === 0 ) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const width = 500;
    const height = 500;
    const projection = d3.geoMercator().fitSize([width, height], gujaratGeojson);
    const pathGenerator = d3.geoPath().projection(projection);

    // Find the maximum value of "Overall_3" in the tableData
    const maxValue = Math.max(...tableData.map(entry => entry["Overall_3"]));


    svg
      .selectAll('path')
      .data(gujaratGeojson.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', 'white')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1')
      .on('mouseover', (event, d) => {
        d3.select(event.target).attr('fill', 'rgba(0, 200, 200, 1');
        setDistrictRowNum(d.properties.dt_code);
      })
      .on('mouseout', (event) => {
        d3.select(event.target).attr('fill', (d) => {
          const opacity = tableData[d.properties.dt_code] ? tableData[d.properties.dt_code]["Overall_3"] / maxValue : 0;
          return `rgba(255, 0, 0, ${opacity})`;
        });
        // setDistrictRowNum(null);
      })
      .style('fill', (d) => {
        const opacity = tableData[d.properties.dt_code] ? tableData[d.properties.dt_code]["Overall_3"] / maxValue : 0;
        return `rgba(255, 0, 0, ${opacity})`;
      });

  }, [gujaratGeojson, tableData]);


  useEffect(() => {
    if (districtRowNum !== null && tableData.length > 0) {
      setDistrict(tableData[districtRowNum]?.Location || "Gujarat");
    }
  }, [districtRowNum, tableData]);

  return (
    <div>
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
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 500 500`}
      ></svg>
      <h3>{district}</h3>
    </div>
  );
};

export default GujaratMap;
