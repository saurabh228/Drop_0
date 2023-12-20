import React from 'react'
import transition from '../Transition'
import GujaratMap from './Gujarat';
import ActionBar from './ActionBar';



const Region = () => {
  return (
    <>
        <ActionBar/>
      
      <div>
      
      <h1 className='PgTitle'>Gujarat Map</h1>
      <div className="mapcontainer">
              <GujaratMap style ={{width : '30%', height :'30%'}} />
      </div>

    </div>

    </>
    
  )
}

export default transition(Region);
