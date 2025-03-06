"use client"

import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from 'axios'
const api=process.env.NEXT_PUBLIC_API_URL


const EditService = () => {

    const {id}=useParams()
    
    const [name,setName]=useState("default")
    const [price,setPrice]=useState("")
    const [details,setDetails]=useState("")
    const [hotel,setHotel]=useState("")
    const [image,setImage]=useState("")
    const [load,setLoad]=useState(false)

    const serviceByid=async()=>{
     try{

    
     const res= await axios.get(api+`/api/service/${id}`,{withCredentials:true})
      console.log(res.data.service);
      setName(res.data.service.name)
      setPrice(res.data.service.price)
      setDetails(res.data.service.details)
      setHotel(res.data.service.hotel._id)
      setImage(res.data.service.image)
    }catch(error){
      alert("Unauthorized")
    }
    }

    useEffect(() => {
     serviceByid()
    }, [])

    const edithandler=async(e)=>{
      e.preventDefault()
      try{    
        setLoad(true)
     const res= await axios.put(api+`/api/service/service-update/${id}`,{name,price,details,image},{withCredentials:true})
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
      <div className="editForm">
        <form onSubmit={edithandler}>
          <h5>Edit the service of id: {id}</h5>
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
          <input type='text'
           placeholder='Past a image link'          
          value={image}
          onChange={(e)=>{
            setImage(e.target.value)
          }}
          /></div>
            <div className="input">
          <p>Price:</p>
           <input type='number'

          value={price}
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
          /></div>
            <div className="input">
          <p>Details:</p>
           <textarea type='text'
          value={details}
          onChange={(e)=>{
            setDetails(e.target.value)
          }}
          ></textarea></div>

          <button>{
            load?"loading..":"Confirm"
            }</button>


        </form>
      </div>
    </div>
    </>
  )
}

export default EditService