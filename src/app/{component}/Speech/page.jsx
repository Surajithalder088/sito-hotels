"use client"

import {TypeAnimation} from 'react-type-animation'
import { motion } from 'motion/react'

const Speech = () => {
  return (
    <motion.div animate={{opacity:[0,1]}} transition={{duration:5}} className="bubbleContainer">
        <div className="bubble">
            <TypeAnimation 
            sequence={['Find best Hotels of your location', 1000, 'Search Hotels by desire filters', 1000]}
            wrapper='span'
            speed={35}
            deletionSpeed={85}
            style={{fontSize: '20px',fontFamily:'cursive'}}
            repeat={Infinity}
            />
            
        </div>
        
    </motion.div>
  )
}

export default Speech