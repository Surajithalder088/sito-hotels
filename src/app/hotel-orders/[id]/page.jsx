"use client"

import "./style.css"
import { useParams } from 'next/navigation'
import { format } from "date-fns";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const api=process.env.NEXT_PUBLIC_API_URL

const hotelOrders = () => {
    const [orders,setOrders]=useState([])
 const [searchId,setSearchId]=useState("")
    const {id}=useParams()
   

    const fetchHotelData=async()=>{
 
        try{
            const res= await axios.get(api+`/api/hotel/profile/${id}`,{withCredentials:true})
            console.log(res.data);
            setOrders(res.data.receipts)
            
        }catch(error){
            console.log(error);
            
        }
    }

    const filterList=searchId===""? orders :orders.filter(item=>item.buyer.includes(searchId.toLowerCase()))
    useEffect(() => {
      fetchHotelData()
    }, [])

    

      return (
        <>
        <div className="page">
    <div className="head1">hotelOrders of hotel :{id}</div>
    <div className="search">
      <img src="/search-line.png"/>
        <input
        placeholder="Search by Customer id"
        value={searchId}
         onChange={(e)=>setSearchId(e.target.value)}/>
         
         </div>
    <div className="head2">Your orders are --</div>
    <div className="receiptContainer">
   {
    filterList.map((o)=>(
        <div className='receipt' key={o._id}>
          <div className="left">
            <p>order Id : {o._id}</p>
            <p>order type : {o.type}</p>
            <p>customer id : {o.buyer}</p>
            </div>
            <div className="left">
            <p>total price : {o.price}</p>
            <p>ordered at : {format(new Date(o.createdAt ),'dd MMM yyyy,hh:mm a')}</p>
            <p>order details : {o.details}</p>
            <div className="paym">
            <p>order payment: {o.paid?"paid":"pending"}</p>
            {o.paid?(
              <div className="paid"></div>
            ):(
              <div className="pending"></div>
            )}
          </div>
            </div>
        </div>
    ))
   }
    </div>
    </div>
    </>
  )
}

export default hotelOrders