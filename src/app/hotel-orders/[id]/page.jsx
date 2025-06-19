"use client"

import "./style.css"
import { useParams, useRouter } from 'next/navigation'
import { format } from "date-fns";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const api=process.env.NEXT_PUBLIC_API_URL

const hotelOrders = () => {
    const [orders,setOrders]=useState([])
 const [searchId,setSearchId]=useState("")
    const {id}=useParams()
    const[load,setLoad]=useState(false)
   
  const navigate=useRouter()
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

    const handlePayment=async(id)=>{
  
  setLoad(true)
 
  
    try {
      const data=await fetch(`${api}/api/payment/create-order`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          orderId:id,
          amount:0,
          customer_name:"",
          customer_email:"",
          customer_phone:""
        })
      },{withCredentials:true})
      
      console.log("payment status",data);
     
        setLoad(false)
        alert("Payment Successfull")
        navigate.push("/")
        
      
    
      

      // if(data.order_meta.return_url){
      //   console.log(data);
        
      // // window.location.href=data.order_meta.return_url
      // }else{
      //   alert("Error to generate payment link")
      // }
    } catch (error) {
      console.log("payment error",error);
      alert("Failed to payment")
      navigate.push("/")
      
    }finally{
      setLoad(false)
    }
}

    

      return (
        <>
        <div className="page">
    <div className="head1">
        <div className="home_back">
          <button onClick={()=>navigate.push(`/hotel-services/${id}`)}>dashboard</button>
    <div className="search">
      <img src="/search-line.png"/>
        <input
        placeholder="Search by Customer id"
        value={searchId}
         onChange={(e)=>setSearchId(e.target.value)}/>
         
         </div>
         </div>
       
       <p>  hotelOrders of hotel :{id}</p>
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
             {o.paid?(
              ""
            ):(
              <div style={{border:"1px solid black",padding:"10px",cusrsor:"pointer"}}
              onClick={()=>handlePayment(o._id)}
              >{load?"processing..":"Conform paid"}</div>
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