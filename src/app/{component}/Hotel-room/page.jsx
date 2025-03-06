"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import "./style.css"
import { motion, useInView } from 'motion/react'
import { format } from "date-fns";



const divVariant={
  initial:{
    y:100,
    opacity:0
},
  animate:{
    y:0,
    opacity:1,
    transition:{
      duration:2.7,
      straggerChildren:0.2
    }
  }
}

const HotelRoom = ({l}) => {
  if(!l || !l._id){
    console.error(" invalid data",l)
    return<p>
       invalid hotel data
    </p>
  }

const ref=useRef()
const   isInView=useInView(ref,{margin:"-200px"})
const itemTypes=[...new Set(l?.services.filter(service=>service.type==='room').map(service=>service.itemType))]

const hotelDate= !l?._id ? format(new Date( Date.now()),'dd MMM yyyy,hh:mm a') :
    format(new Date(l?.createdAt ),'dd MMM yyyy,hh:mm a')
  return (
    <motion.div 
    variants={divVariant}
    animate={"animate"}
    initial='initial'
     className="serviceContainer" ref={ref}>
      <Link href={`/hotel/${l._id}`}>
        <div className='hotelname'>{l.name}</div>
        </Link>
            <div className="desc1">
            
            <div className='address'>--{l.address}</div>
            <div className="imageConatainer">
            <img src={l.image.length>=6?l.image :"/hotelimg.png"}
            
            className="hotelpic" />
            </div>
           <h4>Room varaity --</h4>
            <div className="items">
            <ul>
            {
              itemTypes.map(item=>
                <li>{item}</li>
              )
            }
         </ul>
         </div>
          
         
         
            </div>
        <div className="des2">
        <div className="reveiw"><img src="/star-fill.png"/><p>{(l.starValue /l.starQunatity) ||0 }</p>
            <p>({l.starQunatity ||0})</p>
            </div> 
              <div className='buyer'>Total Services -{l.services.length}</div>
          </div>

          <div className="date">Hotel registered at :{hotelDate}</div>
          </motion.div>
  )
}

export default HotelRoom