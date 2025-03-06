"use client"


import Image from "next/image";
import Link from "next/link";
import "./app.css"
import { services } from "@/assets/service";
import Service from "./{component}/Service/page"
import Navbar from "./{component}/Navbar/page";
import { useEffect, useState } from "react";
import { motion, useInView } from 'motion/react'
//import { fetchingServiceList } from "@/utils/api";
const links=[
  {id:1,name:"hotel abc",price:450},
  {id:2,name:"hotel tyf",price:450},
  {id:3,name:"hotel kls",price:450},
  {id:4,name:"hotel wrd",price:450}
]

import axios from "axios"
import Loading from "./{component}/Loading/page";
import HotelRoom from "./{component}/Hotel-room/page";
import HotelReastaurant from "./{component}/Hotel-Restaurant/page";
import { useSelector } from "react-redux";
import Speech from "./{component}/Speech/page";

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


export default function Home() {

  const [searchTerm,setSearchTerm]=useState("")
  const [roomSearch,setroomSearch]=useState(false)
  const [restuarantSearch,setRestuarantSearch]=useState(false)
  const [services,setServices]=useState([])
 
  const [roomLoc,setRoomLoc]=useState("")
  const [roomType,setRoomType]=useState("")
  const [roomPrice,setRoomPrice]=useState(0)
  const[filter,setfilter]=useState(false)

 const [hotelList,setHotelList]=useState([])

const dummyhotel=  {
  _id:"",
  name:"",
  address:"",
  image:"",
  email:"",
  password:"",
  createdAt:"",
  starQuantity:"",
  starValue:"",
  updatedAt:"",
  _v:"",
  services:[{}]
}

  // filtering hotels based on their location ,service itemType and price
  let filterData=filter===false?hotelList :
  hotelList.filter((hotel)=>hotel.address===roomLoc 
  && hotel.services.some(service=>service.itemType===roomType &&service.price<=roomPrice)

)

  const handleradio=(e)=>{
    setSearchTerm(e.target.value)
  }
  const searchHandle=()=>{
   
    if(!roomLoc || !roomPrice || !roomType){
      alert('Fill all filters')
    }

  setfilter(true)
    console.log(`location ${roomLoc} item ${roomType} price ${roomPrice}`);
    
  }

  const fetchingServiceList=async()=>{
    try{
      const list= await axios.get(api+'/api/service/service-all')
      //list.sort((a,b)=>a.buyer.length - b.buyer.length)
      console.log(list.data.allServices);
      setServices(list.data.allServices)
    
    }catch(error){
      console.log(data);
      
    }
    
    
  }

  const fetchAllHotels=async()=>{
    try{
      const list =await axios.get(api+`/api/hotel/hotel-all`,{withCredentials:true})
      console.log(list.data.hotels);
      setHotelList(list.data.hotels)
      
    }catch(error){
      console.log(error);
      
    }
    
  }

const authUser=useSelector((state)=>state.authUser.type)

  useEffect(() => {
   

      fetchAllHotels()
     console.log(authUser);
 
 
    }, [authUser])
  
  return (
   <div className="home">
   <div className='navbarContainer'> 
   <div className="links" >
        <Link href={'/'}>
       <img src="/home-2-fill.png" className="icon" />
        </Link>
        </div>
    
   <div className="navFilter">
    <h5>search hotels based on:</h5>
    <div className="fil">
   <label>
    room
    <input 
    type="radio"
    value="room"
    name="search"
    checked={searchTerm==='room'}
    onChange={handleradio}
    /></label>
    </div>
    <div className="fil">
    <label>restaurant
    <input 
    type="radio"
   value="restaurant"
    name="search"
    checked={searchTerm==='restaurant'}
    onChange={handleradio}
    />
    </label>
   </div>
   </div>
  
   
   
     
        <div className="linksp" >
        <Link href={'/profile'}>
        <img src="/user-3-fill.png"  className="icon"  />
        </Link>
      </div>
   
    </div>
    <div className="demonav">demonav</div>

    <div className="filterChoice">
      {
       ( searchTerm==="")?(
        <div className="choice"> 
        <h3>Find best hotels around you on our platform :</h3>
        <h5>Find best food and room based on your desire search location and price,with facility like online pament and review & feedback.</h5>
        </div>
       ):
      ( ( searchTerm==='room')?(
        <div className="roomChoice">
          <div className="selectLoc">
            <p className="selectP">Select location:</p>
          <select
          className="selectinput"
          value={roomLoc} onChange={(e)=>{setRoomLoc(e.target.value)}}>
          <option value=''>all</option>
            <option value='kolkata'>kolkata</option>
            <option value='delhi'>delhi</option>
            <option value='mumbai'>mumbai</option>
            <option value='hyderabad'>hyderabad</option>
            <option value='bangalore'>bangalore</option>
           </select>
          </div>
          <div className="selectType">
            <p className="selectP">Select room type:</p>
          <select className="selectinput" value={roomType} onChange={(e)=>{setRoomType(e.target.value)}}>
          <option value=''>all</option>
            <option value='1_bed_ac'>1_bed_ac</option>
            <option value='2_bed_ac'>2_bed_ac</option>
            <option value='1_bed_nonac'>1_bed_nonac</option>
            <option value='2_bed_nonac'>2_bed_nonac</option>
           
           </select>
          </div>
          <div className="selectPrice">
            <p className="selectP">Select price:</p>
          <select className="selectinput" value={roomPrice} onChange={(e)=>{setRoomPrice(e.target.value)}}>
          <option value=''>0</option>
            <option value='500'>0-500</option>
            <option value='2000'>0-2000</option>
            <option value='5000'>0-5000</option>
            <option value='10000'>0-10,000</option>
            <option value='30000'>0-30,000</option>
           </select>
          </div>
        <button className="searchbtn" onClick={searchHandle}>SEARCH</button>

        </div>
       ):(
        <div className="restaurantChoice">
        <div className="selectLoc">
          <p className="selectP">Select location:</p>
        <select
        className="selectinput"
        value={roomLoc} onChange={(e)=>{setRoomLoc(e.target.value)}}>
           <option value=''>all</option>
          <option value='kolkata'>kolkata</option>
          <option value='delhi'>delhi</option>
          <option value='mumbai'>mumbai</option>
          <option value='hyderabad'>hyderabad</option>
          <option value='bangalore'>bangalore</option>
         </select>
        </div>
        <div className="selectType">
          <p className="selectP">Select food type:</p>
        <select className="selectinput" value={roomType} onChange={(e)=>{setRoomType(e.target.value)}}>
        <option value=''>all</option>
          <option value='chienese'>chienese</option>
          <option value='chicken'>chicken</option>
          <option value='mutton'>mutton</option>
          <option value='veg'>veg</option>
          <option value='nonveg'>non veg</option>
         
         </select>
        </div>
        <div className="selectPrice">
          <p className="selectP">Select price:</p>
        <select className="selectinput" value={roomPrice} onChange={(e)=>{setRoomPrice(e.target.value)}}>
        <option value=''>0</option>
          <option value='50'>0-50</option>
          <option value='100'>0-100</option>
          <option value='500'>0-500</option>
          <option value='1000'>0-1,000</option>
          
         </select>
        </div>
        <button className="searchbtn" onClick={searchHandle}>SEARCH</button>

      </div>
       ))
      }
      
      
    </div>
    <div className="text">
      <div className="textPad">
        <div className="textIcon1">
        <img src='/happy-svgrepo-com.png'/>
      </div>
        <Speech/>
      </div>
      <div className="textIcon2">
        <img src='/user-received-2-line.svg'/>
      </div>
      
    </div>

    {
      hotelList.length===0?
      (
        <Loading/>
      ):
      (

     
    <motion.div 
       variants={divVariant}
       animate={"animate"}
       initial='initial'
    className="sList"
    style={{
      width: "100vw"
    }}
    >
      {
        filterData.length===0?<>
        <div className="nodata">
          <h2>No data has been fetched based on your filter</h2>
        </div>
        </>:

        filterData.filter((hotel)=>hotel && hotel._id)
        .map((hotel ,id)=>(
         searchTerm!=='room'?( <HotelReastaurant l={hotel} key={hotel._id}/>):
         (<HotelRoom l={hotel} key={hotel._id}/>)
         
       
        ))
      }
      
    </motion.div>
     )
    }

    
   </div>
  );
}
