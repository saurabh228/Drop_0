import React from 'react'
import transition from '../Transition'
import GujaratMap from './Gujarat';

const Region = () => {
  return (
    <div className='body_container'>
      
      <h1>Gujarat Map</h1>
      <div className="mapcontainer">
              <GujaratMap style ={{width : '30%', height :'30%'}} />
      </div>

    </div>
  )
}

export default transition(Region);
