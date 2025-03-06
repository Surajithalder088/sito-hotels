"use client"
import Navbar from "@/app/{component}/Navbar/page";
import { receipts } from "@/assets/receipt";
import { redirect, useParams } from 'next/navigation'
import React, { useState,useEffect } from 'react'
import "./style.css"
import axios from 'axios'
import {format} from 'date-fns'
import { CircularProgress } from "@mui/material";
import Loading from "@/app/{component}/Loading/page";



const api=process.env.NEXT_PUBLIC_API_URL

const Receipt = () => {
   
     const {id} =useParams()
    // const receipt=receipts.find((item)=>item.id=== 1)

      const [receipt,setReceipt]=useState([])
      const [service,setService]=useState([])
      const [hoteldata,setHoteldata]=useState({})
      const[starvalue,setStarvalue]=useState(1)
      const [reviewText,setReviewText]=useState("default review")
      const starArray=[1,2,3,4,5]
     


      const fetchReceiptDetails= async()=>{
       const data= await axios.get(api+`/api/receipt/${id}`,{withCredentials:true})
       console.log(data.data);
       setReceipt(data.data.receipt)
       setService(data.data.service)
       setHoteldata(data.data.hotel)
       
      }
   useEffect(() => {
       fetchReceiptDetails()
      
       
      }, [])
      const [paid,setPaid]=useState(receipt.paid)
      const [reviewed,setReviewed]=useState(false)

      const reviewCreate=async(e)=>{
        e.preventDefault()
        try{
           setReviewed(true)
           const data= await axios.post(api+`/api/review/review-create`,
          {text :reviewText,ratings:starvalue,serviceid:receipt.serviceId,receiptId:id},
          {withCredentials:true}
        )
        console.log(data.data);
       
        redirect(`/`)
        }catch(error){
          console.log(error);
          setReviewed(false)
          redirect(`/`)
        }
      

      }
      
 const receiptDate= receipt.length===0 ? format(new Date( Date.now()),'dd MMM yyyy,hh:mm a') :
 format(new Date(receipt?.createdAt || Date.now()),'dd MMM yyyy,hh:mm a')
 const hotelDate=receipt.length===0 ? format(new Date( Date.now()),'dd MMM yyyy,hh:mm a') :
 format(new Date(service?.hotel.createdAt|| Date.now()),'dd MMM yyyy,hh:mm a')

  return (
    <>
    <Navbar/>
    <div className="nav">nav</div>

    {
     (receipt.length===0)?(
        <div className="receiptBody">
          <Loading />
        </div>
      ) :(

     

    <div className="receiptBody">
      <div className="first">
    <h2> Receipt Generated for Service : <div className="id">{receipt.serviceId.map(i=><h5>{i}</h5>)}</div> </h2>

      <p> <div className="variable">Receipt id :</div>{receipt._id}</p>
      <p><div className="variable">service Type: </div>{receipt.type}</p>
      <p><div className="variable">receipt generated at : </div>{receiptDate}</p>
      
        <p><div className="variable">Total payable Price: </div>
      <img src="/rupee-indian.png" className="rupee"/>
      {receipt.price}</p>
      <div className="variable">Orders Details: </div>{receipt.details.map(i=><p>{i}</p>)}
      </div>

      <div className="second">
    
      
      
      {
        !receipt.paid?
        <div className="payment">
          <span>Make payment :</span>
        <button className="paybtn"
        onClick={()=>{
          redirect(`/payment/${id}`)
        }}
        >pay</button>
        </div>
        :""
      }
      <div className="price">
      <p><div className="variable">paid : </div>{receipt.paid?"yes":"no"}</p>
      {
        receipt.paid? <div className="done"></div>
        :
        <div className="pending"></div>
      }
     </div>
     <p><div className="variable">Hotel Name: </div> <div className="nam">{hoteldata.name}</div>({hoteldata.email})</p>
     <p><div className="">Hotel Id : </div>{receipt.hotelName}</p>
     <p><div className="">Address:</div>{hoteldata.address}</p>
     <p><div className="variable">hotel Registered at : </div>{hotelDate}</p>
     
      <p>Customer Id : {receipt.buyer}</p>
     <div className="reviewbox">
      {
        receipt.reviewed?(
          <div className="reviewform">
        <p>You already reviewed</p></div>
      ):
        (<div className="reviewform">
          <div className="star">
            {
              starArray.map(s=>(
                <img className="starimg" src={(starvalue>=s)?"/star-fill.png":"/star-line.png"} key={s} 
                onClick={()=>{
                  setStarvalue(s)
                  
                }}
                />
              ))
            }
            
            
          </div>
         <textarea placeholder="Give reviews" 
         value={reviewText}
         onChange={(e)=>setReviewText(e.target.value)}
         ></textarea>
          <button
          onClick={reviewCreate}
          className="btn"
          >{
            reviewed?(<CircularProgress />)
            :"submit"
          }
           
          </button>
        </div>)
        
      }
     </div>
     
      </div>
    </div>
     )
    }
    </>
  )
}

export default Receipt