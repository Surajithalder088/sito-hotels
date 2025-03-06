"use client"

import "./style.css"
import { useParams } from 'next/navigation'
import React ,{useEffect, useState} from 'react'

import { services } from "@/assets/service"
import Service from "@/app/{component}/HotelService/page"
import Navbar from "@/app/{component}/Navbar/page"
import axios from 'axios'
import Link from "next/link"



const api=process.env.NEXT_PUBLIC_API_URL


const Hotel= () => {
    const {id}=useParams()
   // const hotel=services.find(l=>l.id===1)
   const [hotel,setHotel]=useState(null)
   const [services,setServices]=useState([])
   const [editId,setEditId]=useState("")

    const hotelByid=async()=>{
     const data= await axios.get(api+`/api/hotel/hotelbyid/${id}`,{withCredentials:true})
     console.log(data.data);
     setHotel(data.data.hotel)
     setServices(data.data.services)
    }
    useEffect(() => {
      hotelByid()
    
    }, [])

    const [type,setType]=useState('room')
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [details,setDetails]=useState("")
    const [itemType,setItemType]=useState("")
    const [loading,setLoading]=useState(false)
  
const handleSubmit=async(e)=>{
  e.preventDefault()

  try{
    setLoading(true)
    const res=await axios.post(api+`/api/service/service-create/${hotel._id}`,{type,name,price,details,itemType},{withCredentials:true})
    console.log(res.data);
    window.location.reload()
    
  }catch(error){
    console.log(error);
    setLoading(false)
    alert("Failed due to network")
    window.location.reload()
  }

  
}
    
  return (
   <>
   <div className="hotelContainer">
    
   

    <div className="aboutehotelContainer">
      {
        !hotel ?(
          <div className="aboutehotel">
            <p>failed to get hotel data</p>
          </div>
        ):(

        <>
        <div className="aboutehotel">
          <div>
            <p className="hotelname">Email of this hotel is : {hotel.email}</p>
          
            <p className="aboute">Totel Service Provided : {hotel.services.length}</p>
            <p  className="aboute">This hotel is Registered at : {hotel.createdAt}</p>
      </div> <div className="edit">
        <Link href={`/hotel-edit/${id}`}>
        <img src="/pencil-fill.svg"/>
</Link>

      </div>
        </div>
       </>
        )
      }
      <div className="newform">
       
        <form onSubmit={handleSubmit}>
           <h5>Add new service to your hotel:</h5>
           <div className="select">
           <select value={type} onChange={(e)=>{setType(e.target.value)}}>
            <option value='room'>room</option>
            <option value='restaurant'>restaurant</option>
           
           </select>
           {
            type==="room"?(
            <select className="selectinput" value={itemType} onChange={(e)=>{setItemType(e.target.value)}}>
           <option value=''>select room</option>
            <option value='1_bed_ac'>1_bed_ac</option>
            <option value='2_bed_ac'>2_bed_ac</option>
            <option value='1_bed_nonac'>1_bed_nonac</option>
            <option value='2_bed_nonac'>2_bed_nonac</option>
           
           </select>

            ):(
              <select className="selectinput" value={itemType} onChange={(e)=>{setItemType(e.target.value)}}>
        <option value=''>select food</option>
          <option value='chienese'>chienese</option>
          <option value='chicken'>chicken</option>
          <option value='mutton'>mutton</option>
          <option value='veg'>veg</option>
          <option value='nonveg'>non veg</option>
         
         </select>

            )
           }
           
          </div>
          <input type="text"
          value={name}
          placeholder="Give service name"
          onChange={(e)=>{
            setName(e.target.value)
          }}
          />
          <input type="number"
          value={price}
          placeholder="Give service price"
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
          />
          <textarea value={details}
          placeholder="Give service details" 
          onChange={(e)=>{
            setDetails(e.target.value)
          }}
          ></textarea>
          <button className="add">{
              loading?"Creating":"Add New Service"
    }</button>
        </form>
      </div>

      <div className="ordersBtn">
        <h5>View list of new and previous orders :</h5>
        <Link href={`/hotel-orders/${id}`}>
        <button>View  Orders of this hotel</button>
        </Link>
      </div>
    </div>

   
    {
      (services.length===0)?(
        <div className="allservices">
         <p> no services provided</p>
        </div>
      ):(
<>
      <h3>All services of this Hotel :</h3>
    <div className="allservices">
     
   {
        services.filter((service)=>service && service._id)
        .map(service=>(
       <Service l={service} key={service._id} />
        ))
        
      }
    </div>
    </>
     )
    }
   </div>
   </>
  )
}

export default Hotel