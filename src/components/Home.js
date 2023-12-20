import React from 'react'
import transition from '../Transition'
import ActionBarI from './ActionBarI';

import './Home.css'

const Home = () => {
  
  
  return (
    <div className="home-container" >
      <ActionBarI/>
      {/* <SVGWrapped/> */}
      < div className="tilecol1">
      <div className="tile1">
       <div className="tile1-item">
        {/* <h1>Tile1</h1>   */}
         </div>
         </div>

         <div className="tile3">    
          </div>
         </div>

      <div className="tilecol2">
        <div className="tile2">

        </div>

        <div className="tile4">

        </div>

      </div>
      </div>
     
    
    
  )
}

export default transition(Home);
