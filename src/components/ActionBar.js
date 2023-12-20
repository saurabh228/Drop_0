import React from 'react';
import { Link } from 'react-router-dom';
import logo from './DataCloverLogo.png';
import './ActionBar.css';
import BestPerformers from './BestPerformers';
import CriticalDist from './CriticalDist';
import Interventions from './Interventions';

const ActionBar = () => {
  return (
    <div className='ActionBar_container'>
      <div className='static-column'>
        

        <div className="action-items">
          <div className="side-itemA">
             <h1>🧠Action Lab</h1>
          </div>

          <div className="TitleIns">
          <Interventions/>
           
          </div>

          <div className="TitlePC">
            <h1 className='InsightTitle'>Insights</h1>
           <BestPerformers/>
            <CriticalDist/>
          </div>

          <div className="side-itemA">
           
          </div>

        </div>
      </div>
    </div>
  );
}

export default ActionBar;
