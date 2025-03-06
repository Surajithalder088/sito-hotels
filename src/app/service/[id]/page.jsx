"use client"
import "./style.css"

import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { services } from "@/assets/service";
import { reviews } from "@/assets/review";

import { motion, useInView } from 'motion/react'
import axios from "axios";
import {receiptCreate} from "@/utils/api"
import Loading from "@/app/{component}/Loading/page";
import Navbar from "@/app/{component}/Navbar/page";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/navigation";



  const serviceVariant={
    initial:{
      x:-100,
      opacity:0
  },
    animate:{
      x:0,
      opacity:1,
      transition:{
        duration:1.5,
        straggerChildren:0.2
      }
    }
  }
  const hotelVariant={
    initial:{
      x:100,
      opacity:0
  },
    animate:{
      x:0,
      opacity:1,
      transition:{
        duration:1.5,
        straggerChildren:0.2
      }
    }
  }

  const api=process.env.NEXT_PUBLIC_API_URL

const Service = () => {
   const [reviews,setReviews]=useState([])
 const [service,setService]=useState({})
 const [loading,setLoading]=useState(false)
    const {id} =useParams()
   // const service=services.find(l=>l.id===2)
    
   const route=useRouter()

    const fetchServiceDetails=async()=>{
      try{
         const data= await axios.get(api+`/api/service/${id}`,{withCredentials:true})
         let obj=data.data.service
         
          setService(obj)
        
         
      }catch(error){
        console.log(error);
        
      }
    }
    const fetchReviewsList=async()=>{
      try{
       const reviews= await axios.get(api+`/api/review/reviewbyserviceid/${id}`,{withCredentials:true})
       
        setReviews(reviews.data.reviews)
       
      }catch(error){
        console.log(error);
        
      }
    }

    const orderHandler=async(e)=>{
      e.preventDefault()
      setLoading(true)
     const receipt=await receiptCreate(service._id) //give hotel id and other data of orders
     console.log(receipt);
     const receiptLink=receipt.data.receipt._id ;
     
     redirect(`/receipt/${receiptLink}`)
     setLoading(false)
    }

    useEffect(() => {
     
      fetchServiceDetails()
    
    fetchReviewsList()
    
     
    }, [service])

    const serviceDate= !service._id ? format(new Date( Date.now()),'dd MMM yyyy,hh:mm a') :
    format(new Date(service.createdAt ),'dd MMM yyyy,hh:mm a')
    const hotelDate= !service._id ? format(new Date( Date.now()),'dd MMM yyyy,hh:mm a') :
    format(new Date(service.hotel.createdAt),'dd MMM yyyy,hh:mm a')
     // if service does not exists it taht case it will not show any error

  return (
    <>
    
   <Navbar/>
   <div className="nav">navbar</div>

    {
        !service._id?(
          <Loading/>
        )
        :
   ( <div className="service">
     

     
    <div className="orderBtn">
        <button
        onClick={
          ()=>{
            setLoading(true)
            route.push(`/hotel/${service.hotel._id}`)
          }
        }
        className="btn">{loading ?
        (
          <CircularProgress />
        ):"Back to hotel to order it "}</button>
       </div>
      <div className="Card">
        <motion.div 
        variants={serviceVariant}
        initial='initial'
        animate='animate'
        className="abouteService">
      <div className="id"> Service id :{id}</div> 
        <h2><div className="value">{service.name}</div></h2>
        <p><div className="value">Service type: </div>{service.type}</p>
     
        <p><div className="value"> Price : </div>{service.price}</p>
        <p><div className="value"> Details of the Service : </div>{service.details}</p>
        <span> Service generated at : {serviceDate}</span>
        </motion.div>
        <motion.div className="abouteHotel"
        variants={hotelVariant}
        initial='initial'
        animate='animate'
        >
        <p><div className="value"> Name of the Provider : </div> {service.hotel.email}</p>
        <p><div className="value"> Number of Services provided by this provider : </div>{service.hotel.services.length}</p>
        <p><div className="value"> Hotel Registered At : </div>{hotelDate}</p>
        </motion.div>
        
       </div>

       <div className="reviewContainer">
        <h3>Customer Ratings:</h3>
        <hr/>
        <div className="reviewList">
        {
          reviews.map(r=>(
            <div className="review" key={r._id}>
              <p>customer-id :<span>{r.user}</span></p>
              <p><img src="/star-line.png" /> {r.ratings}</p>
              <p>------{r.text}</p>
            </div>
          ))
        }
       </div>
       </div>

    </div>)
}

    
    </>
  )
}

export default Service