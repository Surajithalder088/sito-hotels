"use client"

import React from 'react'
import "./style.css"
import { format } from 'date-fns'

const Order = ({item}) => {
  if(!item || !item._id){
    console.error(" invalid data",item)
    return<p>
       invalid receipt data
    </p>
  }

   const orderDate= !item._id ? format(new Date( Date.now()),'dd MMM yyyy,hh:mm a') :
      format(new Date(item.createdAt ),'dd MMM yyyy,hh:mm a')
  return (
    <>
    <div className="receipt" >
        <div className="hotel">
               <p>{}</p>
               </div>
               <div className="data">
               
              <p><div className="variable">Price : </div>
                <img src='/rupee-indian.png' className='rupee'/>
                {item.price}</p>
               
               <p><div className="payable"> 
                <div className="variable">payment : </div>{item.paid?"paid":"pending"}
               {
                item.paid?<div className="donee"></div>
                :
                <div className="pendingg"></div>
               }</div></p>

               <p><div className="variable">Service Taken :</div>{item.details}</p>
               <p><div className="variable">Order Date :</div>{orderDate}</p>
               </div>
                  
             </div>
    </>
  )
}

export default Order