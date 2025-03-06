"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import "./style.css"
import { motion, useInView } from 'motion/react'

import axios from 'axios'
const api=process.env.NEXT_PUBLIC_API_URL


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

const Service = ({l}) => {
  if(!l || !l._id){
    console.error(" invalid data",l)
    return<p>
       invalid service  data
    </p>
  }

const ref=useRef()
const   isInView=useInView(ref,{margin:"-200px"})

const deleteHandler =async(e)=>{
  e.preventDefault()
  try{

      if(!l._id) return
   const res= await axios.delete(api+`/api/service/service-delete/${l?._id}`,{withCredentials:true})
   console.log(res.data);
   window.location.reload()
   alert("Deleted the Service")
   
   
     }catch(error){
      console.log(error);
      alert("failed to delete")
      
     }
}

  return (
    <motion.div 
    variants={divVariant}
    animate={"animate"}
    initial='initial'
    key={l._id} className="serviceContainer" ref={ref}>
     <div className="access">
      <Link href={`/edit-service/${l._id}`}>
        <button className="iconedit"
        
        >
            <img src='/file-edit-line.png'/>
        </button>
        </Link>
        <button className="iconedit" 
        onClick={deleteHandler}
        >
        <img src='/delete-bin-6-line.png'/>
        </button>
     </div>
            <div className="desc1">
            <div className=''> {l.name}</div>
            <div className='type'>Service Type is : {l.type}</div>
          <div className='details'>
            <p className="para">Description of the service : </p>{l.details}
            </div>
         
            </div>
        <div className="desc2">
          <div className='price'>
            <img src='/rupee-indian.png' className='rupee'/>
              {l.price} </div>
          <div className='buyer'>Number of Buyer : {l.buyer.length}</div>
          </div>
        
          </motion.div>
  )
}

export default Service