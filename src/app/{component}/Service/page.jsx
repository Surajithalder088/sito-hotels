"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import { motion, useInView } from 'motion/react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity } from '@/lib/features/orderCart/orderCartSlice'



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
  if(!l || !l._id ||!l.name){
    console.error(" invalid data",l)
    return<p>
       invalid service data
    </p>
  }

  const dispatch =useDispatch()

const ref=useRef()
const   isInView=useInView(ref,{margin:"-200px"})

const [add,setAdd]=useState(false)
const [number,setNumber]=useState(1)



function qunatityHandler(){
 
  dispatch(updateQuantity({id:l._id,quantity:number+1}))
}

const orderCart=useSelector((state)=>state.orderCart)

useEffect(() => {
  if(orderCart.items.length===0){
    setAdd(false)
    setNumber(1)
  }
 
  
}, [orderCart])





  return (
    <motion.div 
    variants={divVariant}
    animate={"animate"}
    initial='initial'
    key={l._id} className="serviceContainer" ref={ref}>
      
        <div className='add'>
            {
              !add? (
              <button
          onClick={()=>{
            setAdd(!add)
            dispatch(addToCart({id:l._id,name:l.name,price:l.price}))
          }}
          >
          Add
          </button>

              ):(<button
                onClick={()=>{
                  setAdd(!add)
                  dispatch(removeFromCart({id:l._id}))
                }}
                >
                Remove
                </button>

              )
            }
          
          {
            !add ?"":(
              <div className='cartHandle' >
                {
                  number>=1?(
                    <button className="quan" 
                onClick={()=>{setNumber(number-1)
                  dispatch(updateQuantity({id:l._id,quantity:number-1}))
                } 
                }>-</button>
                  ):""
                }
                
                <p className='number'>{number}</p>
                <button className="quan" onClick={()=>{setNumber(number+1)
                 qunatityHandler()
                } 

                }>+</button>
              </div>
            )
          }
          

        </div>
       
            <div className="desc1">
            
            <div className='type'>{l.name}</div>
            <div className='itemType'>  ({l.itemType})</div>
          {
          
            l.type==="room"?(<div className="image_service">
              <img className="image_service" src={l.image?.length>10?l.image:"/room_image.jpg"}/>
            </div>):(<div className="image_service">
              <img className="image_service" src={l.image?.length>10?l.image:"/food_image.jpg"}/>
            </div>)
          }
             

          <div className='details'>
            <p className="para">Description of the service : </p>{l.details}
            </div>

           
         
            </div>
        <div className="desc2">
          <div className='price'>
            <img src='/rupee-indian.png' className='rupee'/>
              {!add?l.price:l.price*number} </div>
          
          </div>
        <Link className='link' href={`/service/${l._id}`}>
        <button className='btn'>View Details</button>
        </Link>
          </motion.div>
  )
}

export default Service