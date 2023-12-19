import React from 'react'
import transition from '../Transition'
import Visuals from './Visuals';

const Home = () => {
  
  return (
    <div className='body_container'>
      <Visuals />
    </div>
  )
}

export default transition(Home);
