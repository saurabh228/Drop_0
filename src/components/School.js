import React from 'react'
import transition from '../Transition'
import { motion } from 'framer-motion'

const School = () => {
  return (
    <motion.div 
    initial ={{opacity:0.5}}
    animate ={{opacity:1}}
    transition={{delay: 0.2}}
    className='body_container'>
      <h1>School</h1>
    </motion.div>
  )
}

export default transition(School);
