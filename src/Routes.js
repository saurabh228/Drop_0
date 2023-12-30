// // Routes.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // import Visuals from './components/Visuals';
// import Home from './components/Home';
// import Age from './components/Age';
// import Gender from './components/Gender';
// import Caste from './components/Caste';
// import School from './components/School';
// import Region from './components/Region';
// import CastAnalysis from './components/CastAnalysis';

// const AppRoutes = () => {

//   const location = useLocation();
  
//   return (
//     <Router>
//       <Routes location={location} key={location.pathname}>
//         {/* <Route path="/" exact element={<Visuals />} /> */}
//         <Route path="/CastAnalysis" element={<CastAnalysis />} />

        
//           <Route index element={<Home/>}/>
//           <Route path='/age' element={<Age/>}/>
//           <Route path='/gender' element={<Gender/>}/>
//           <Route path='/caste' element={<Caste/>}/>
//           <Route path='/region' element={<Region/>}/>
//           <Route path='/school' element={<School/>}/>
//       </Routes>
      
//     </Router>
//   );
// };

// export default AppRoutes;