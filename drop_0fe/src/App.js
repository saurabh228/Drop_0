import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import { Container, Box } from '@mui/material';

function App() {
  const location = useLocation();

  return (
    <Container maxWidth={false}>
      <Box className="App" sx={{mx:0, px:0}}>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;