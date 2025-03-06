"use client"

import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from 'axios'
import Loading from '@/app/{component}/Loading/page'
const api=process.env.NEXT_PUBLIC_API_URL


const EditService = () => {

    const {id}=useParams()
    
    const [name,setName]=useState("default")
    const [image,setImage]=useState("")
    const [address,setAddress]=useState("")
    const [hotel,setHotel]=useState("")
    const [load,setLoad]=useState(false)

    const hotelByid=async()=>{
     try{

    setLoad(true)
     const res= await axios.get(api+`/api/hotel/hotelbyid/${id}`,{withCredentials:true})
      console.log(res.data);
      setName(res.data.hotel.name)
      setImage(res.data.hotel.image)
      setAddress(res.data.hotel.address)
      setLoad(false)
    }catch(error){
      alert("Unauthorized")
      setLoad(false)
    }
    }

    useEffect(() => {
     hotelByid()
    }, [])

    const edithandler=async(e)=>{
      e.preventDefault()
      try{    
        setLoad(true)
     const res= await axios.put(api+`/api/hotel/edit/${id}`,{image,address},{withCredentials:true})
     console.log(res.data);
     window.history.back()
     redirect(`../../hotel-services/${hotel}`)
     
       }catch(error){
        console.log(error);
        setLoad(false)
       
       }
    }
    

    
  return (
    <>
    <div className="formcontainer">
      {
        load ?(
          <Loading/>
        ):(

       
      <div className="editForm">
        <form onSubmit={edithandler}>
          <h5>Edit the hotel details {id}</h5>
          <div className="input">
          <p>Name:</p>
          <input type='text'
          value={name}
          onChange={(e)=>{
            setName(e.target.value)
          }}
          /></div>
            <div className="input">
          <p>Image:</p>
           <input type='string'
          value={image}
          onChange={(e)=>{
            setImage(e.target.value)
          }}
          /></div>
            <div className="input">
          <p>Address:</p>
           <textarea type='text'
          value={address}
          onChange={(e)=>{
            setAddress(e.target.value)
          }}
          ></textarea></div>

          <button>{
            load?"loading..":"Confirm"
            }</button>


        </form>
      </div>
       )
      }
    </div>
    </>
  )
}

export default EditService