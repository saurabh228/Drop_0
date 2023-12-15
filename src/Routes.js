// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Visuals from './components/Visuals';
import CastAnalysis from './components/CastAnalysis';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Visuals />} />
        <Route path="/CastAnalysis" element={<CastAnalysis />} />
      </Routes>
      
    </Router>
  );
};

export default AppRoutes;