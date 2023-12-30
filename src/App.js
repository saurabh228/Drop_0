
import './App.css';
import Sidebar from './components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Age from './components/Age';
import Gender from './components/Gender';
import Caste from './components/Caste';
import School from './components/School';
import Region from './components/Region';
import CastAnalysis from './components/CastAnalysis';

import { AnimatePresence } from 'framer-motion';
import Loader from './components/loader';

function App() {

  const location = useLocation();

  return (
    <div className="App">

        <Sidebar/>
      {/* <Loader/> */}

        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home/>}/>
          <Route path="/CastAnalysis" element={<CastAnalysis />} />
          <Route path='/age' element={<Age/>}/>
          <Route path='/gender' element={<Gender/>}/>
          <Route path='/caste' element={<Caste/>}/>
          <Route path='/region' element={<Region/>}/>
          <Route path='/school' element={<School/>}/>
          <Route/>
        </Routes>
        </AnimatePresence>

        
    </div>
  );
}

export default App;

