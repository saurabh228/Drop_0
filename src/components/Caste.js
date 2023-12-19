import React from 'react'
import transition from '../Transition'
import CastAnalysis from './CastAnalysis';

const Caste = () => {
  return (
    <div className='body_container'>
      <CastAnalysis/>
    </div>
  )
}

export default transition(Caste);
