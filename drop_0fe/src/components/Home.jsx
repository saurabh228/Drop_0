import React from 'react';
import Header from './Header';
import Visuals from './Visuals';
import { Container, Box } from '@mui/material';
import '../styles/home.css';

const Home = () => {
  return (
    <Container maxWidth={false}>
      <Box className="home-container">
        <Header />
        <Box className="main-content">
          <Visuals />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;