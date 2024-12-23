import React, { useEffect, useState } from 'react';
import { Container, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid2';
import TableComponent from './TableComponent';
import ChartComponent from './ChartComponent';
import GenderYearGraph from './GenderYearGraph';
import { fetchDropOutRates, fetchStates } from '../services/api';

function Visuals() {
  const [states, setStates] = useState(new Map());
  const [selectedState, setSelectedState] = useState('');
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [dropoutData, setDropoutData] = useState({});
  const [focusedRowData, setFocusedRowData] = useState([]);
  const [yearlyData, setYearlyData] = useState({});

  useEffect(() => {
    fetchStates().then((data) => {
      const nationalKey = Object.keys(data).find((key) => data[key] === 'National');
      data[nationalKey] = 'All India'
      const sortedEntries = Object.entries(data).sort(([, a], [, b]) => a.localeCompare(b));
      const sortedData = new Map(sortedEntries);
      setStates(sortedData);
      setSelectedState(nationalKey);
    });
  }, []);

  useEffect(() => {
    if (!states || !selectedState) return;
    fetchDropOutRates(selectedState).then((data) => {
      const dataYears = Object.keys(data).sort((a, b) => b - a);
      setSelectedYear(dataYears[0]);
      setYearsList(dataYears);
      setDropoutData(data);
    });
  }, [selectedState, states]);

  const handleRowHover = (dataId) => {
    const dataIndex = dropoutData[selectedYear].findIndex((item) => item.id === dataId);
    setFocusedRowData(dropoutData[selectedYear].slice(dataIndex - 4, dataIndex + 1));
    const location = dropoutData[selectedYear][dataIndex].location;
    const socialCategory = dropoutData[selectedYear][dataIndex].social_category;
    const yearData = {};

    Object.keys(dropoutData).forEach((year) => {
      const yearIndex = dropoutData[year].findIndex(
        (item) => item.location === location && item.social_category === socialCategory
      );
      const data = dropoutData[year].slice(yearIndex - 4, yearIndex + 1);
      if (data) yearData[year] = data;
      
    });
    setYearlyData(yearData);
  };

  useEffect(() => {
    if (!dropoutData || !selectedYear) return;
    let stateName = states.get(selectedState);
    const stateId = dropoutData[selectedYear].find(
      (item) => item.location === stateName && item.social_category === 'Overall'
    );
    if (stateId) handleRowHover(stateId.id);
  }, [dropoutData]);

  useEffect(() => {
    if (focusedRowData.length > 0 && yearlyData) {
      const location = focusedRowData[0].location;
      const stateId = dropoutData[selectedYear].find(
        (item) => item.location === location && item.social_category === 'Overall'
      );
      if (stateId) handleRowHover(stateId.id);
    }
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handelStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <Container maxWidth={false} sx={{ width: '100%'}}>
      <Box sx={{ width: '100%' }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid size={6} sx={{alignContent: 'center', height: '85vh'}} >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'clip' }}>
              <Grid container columnSpacing={1} px={2} py={1} sx={{ width: '100%'}} justifyContent={"center"}>
                <Grid size={5} sx={{display: 'flex', alignItems: 'center', justifyContent:'right'}}>
                  <Box sx={{ mr: 2 }}>
                    <InputLabel sx={{ fontSize:17 }}>Dropout Rates of</InputLabel>
                  </Box>
                  <FormControl variant='standard'>
                    <Select
                      id="stateDropdown"
                      value={selectedState}
                      onChange={handelStateChange}
                    >
                      {[...states.entries()].map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                  <Box sx={{ mr: 2 }}>
                    <InputLabel sx={{ fontSize:17 }}> for year</InputLabel>
                  </Box>
                  <FormControl variant='standard'>
                    <Select
                      id="yearDropdown"
                      value={selectedYear}
                      onChange={handleYearChange}
                      sx={{height:'50%', width:'fit-content'}}
                    >
                      {yearsList.map((year) => (
                        <MenuItem key={year} value={year}>
                          {`${year - 1}-${year}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{height:'inherit', overflow: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, marginRight: 'auto', marginLeft: 'auto' }}>
              {selectedYear && dropoutData[selectedYear] && (
                <TableComponent onRowHover={handleRowHover} tableData={dropoutData[selectedYear]} />
              )}
            </Box>
          </Grid>
          <Grid size={6} mt={"20px"} sx={{height: '86vh' , display: 'flex', flexDirection: 'column', justifyContent:'space-around'}}>
            <Box sx={{margin: 1}}>
              <ChartComponent focusedRowData={focusedRowData} />
            </Box>
            <Box sx={{margin: 1}}>
              <GenderYearGraph yearlyData={yearlyData} yearsList={yearsList} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Visuals;