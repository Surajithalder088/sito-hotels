"use client"

import "./style.css"
import { CircularProgress, LinearProgress } from '@mui/material'
import { useParams } from 'next/navigation'
import React ,{useEffect, useState} from 'react'
import {TypeAnimation} from 'react-type-animation'
import { services } from "@/assets/service"
import Service from "@/app/{component}/Service/page"
import Navbar from "@/app/{component}/Navbar/page"
import axios from 'axios'


import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { clearCart } from "@/lib/features/orderCart/orderCartSlice"
import { receiptCreate } from "@/utils/api"
import Loading from "@/app/{component}/Loading/page"
import Speech from "@/app/{component}/Speech/page"
import { Warning } from "postcss"



const api=process.env.NEXT_PUBLIC_API_URL


                    const Hotel= () => {

   const authUser=useSelector((state)=>state.authUser.type)
   const userEmail=useSelector((state)=>state.authUser.email)
   const route=useRouter()

   useEffect(() => {
    if(authUser!=='customer'){
      route.push('/login')
    }
    
   }, [])
   
   const orderCart=useSelector((state)=>state.orderCart)
    const {id}=useParams()
   // const hotel=services.find(l=>l.id===1)
   const [hotel,setHotel]=useState(null)
   const [services,setServices]=useState([])
   const [item,setItem]=useState('')
   const [price,setPrice]=useState(0)
   const [type,setType]=useState('')
   const [searching,setSearching]=useState(false)

   const [ordering,setOrdering]=useState(false)
  
   const dispatch =useDispatch()
  

   const orderHandler=async(e)=>{
e.preventDefault()
      if(orderCart.items.length===0){
        alert("select at least one item to order") //will set toast message
        return
      }
    try{
     
      setOrdering(true)
       let price=orderCart.totalPrice
    let services=orderCart.items.map(item=>item.id)
    let details=orderCart.items.map(item=>(` name:${item.name},quantity:${item.quantity},price:${item.price}  .`))
      console.log({userEmail,type,price,services,details});

    const receipt= await axios.post(api+`/api/receipt/receipt-create/${id}`,{userEmail,type:"various",price,services,details},{withCredentials: true})
     // const res= await receiptCreate({id:id,type:"food",price,services,details})
    
      
     console.log(receipt.data);
     dispatch(clearCart())
     route.push(`/receipt/${receipt.data.receipt._id}`)

    }catch(error){
      console.log(error);
      setOrdering(false)
      alert("Failed to generate new receipt")
      
    }
   
     
   }

    const hotelByid=async()=>{
     const data= await axios.get(api+`/api/hotel/hotelbyid/${id}`,{withCredentials:true})
     console.log(data.data);
     setHotel(data.data.hotel)
     setServices(data.data.services)
    }
    useEffect(() => {
      hotelByid()
    
    }, [])
    let filterServices=searching===false?services:services.filter((i)=>
      i.type===type && i.itemType===item && i.price<=price
    )
    const handleSearch=(e)=>{
 e.preventDefault()
 setSearching(true)
    }

   
    
  return (
   <>
   <div className="hotelContainer">
    <Navbar/>
    <div className="navbar">nav</div>
    <div className="filters">
    <div className="selectLoc">
            <p className="selectP">Select service:</p>
          <select
          className="selectinput"
          value={type} onChange={(e)=>{setType(e.target.value)}}>
          <option value=''>all</option>
            <option value='room'>room</option>
            <option value='restaurant'>restaurant</option>
            
           </select>
          </div>
          {
            type==='room'?(
              <div className="selectLoc">
            <p className="selectP">Select room:</p>
          <select
          className="selectinput"
          value={item} onChange={(e)=>{setItem(e.target.value)}}>
          <option value=''>all</option>
          <option value='1_bed_ac'>1_bed_ac</option>
            <option value='2_bed_ac'>2_bed_ac</option>
            <option value='1_bed_nonac'>1_bed_nonac</option>
            <option value='2_bed_nonac'>2_bed_nonac</option>
            
           </select>
          </div>
            ):(

            
          <div className="selectLoc">
            <p className="selectP">Select food:</p>
          <select
          className="selectinput"
          value={item} onChange={(e)=>{setItem(e.target.value)}}>
          <option value=''>all</option>
          <option value='chienese'>chienese</option>
          <option value='chicken'>chicken</option>
          <option value='mutton'>mutton</option>
          <option value='veg'>veg</option>
          <option value='nonveg'>non veg</option>
            
           </select>
          </div>
          )
          }
           <div className="selectLoc">
            <p className="selectP">Select price:</p>
          <select
          className="selectinput"
          value={price} onChange={(e)=>{setPrice(e.target.value)}}>
          <option value=''>all</option>
          <option value='50'>0-50</option>
          <option value='100'>0-100</option>
          <option value='500'>0-500</option>
          <option value='1000'>0-1,000</option>
          <option value='2000'>0-2,000</option>
          <option value='5000'>0-5,000</option>
          <option value='10000'>0-10,000</option>
          <option value='20000'>0-20,000</option>
          <option value='30000'>0-30,000</option>
            
           </select>
          </div>
          <button
          className="searchBtn"
          onClick={handleSearch}
          >search</button>
    </div>
    


    <div className="aboutehotelContainer">
      {
        !hotel ?(
          <div className="aboutehotel">
            <p>failed to get hotel data</p>
          </div>
        ):(

        
        <div className="aboutehotel">
            <div className="name">
             <h3>{hotel.name}</h3>
            <p className="">({hotel.email})</p>
            <p className="">{hotel.address}</p>
            </div>
             <img className="phone" src="/vercel.svg" onClick={()=>alert("call to hotel ")}/>
            <p className="aboute">Totel Services: {hotel.services.length}</p>
            <p  className="aboute">hotel is Registered at : {format(new Date(hotel.createdAt ),'dd MMM yyyy,hh:mm a')}</p>
           
           <div className="reveiw"><img src="/star-fill.png"/><p>{(hotel.starValue /hotel.starQunatity) ||0 }</p>
            <p>({hotel.starQunatity})</p>
            </div> 

            <div className="textH">
     <div className="textIconH">
      <img src="/group-line.svg"/>
     </div>
     <div className="textPadH">
     <TypeAnimation 
           sequence={[`Search your favourite food or desire room  from our Hotel !`, 1000, 'Add multiple items to order cart!', 1000]}
           wrapper='span'
           speed={35}
           deletionSpeed={85}
           style={{fontSize: '20px',fontFamily:'cursive',color:"black"}}
           repeat={Infinity}
           />
     </div>
     
   </div>

        </div>
        )
      }
      <div className="image">
        <img src={hotel?.image.length>=6?hotel.image :"/hotelimg.png"}className="hotelimg" />
        </div>
        <div className="orderCart">
        
         <div className="cartlist">
          {
            orderCart.items.length===0?" No item":(
               <ol>
            <p>{"Name --> Price -->   Quantity"}</p>
         {
          orderCart.items.map(item=>
           <li>
            <div className="cartItem">
              
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              
            </div></li>
            
          )
          

         }</ol>
            )
          }
          
         <div>Total Items:{orderCart.totalQuantity}</div>
         <div>Total Price :{orderCart.totalPrice}</div>
          
         
            </div>
              <div className="cartBtn">
            <button  onClick={orderHandler}>{
              ordering?(<CircularProgress className="circle"/>):"order"
              }</button>
             <button  onClick={()=>{
              dispatch(clearCart())
             }
            }>clear cart</button>
            </div>

        </div>
    </div>


  


    {
      (filterServices.length===0)?(
        <div className="allservices">
         <h1> no services provided</h1>
        </div>
      ):(

     
    <div className="allservices">
   {
        filterServices.filter((service)=>service && service._id && service.name)
        .map(service=>(
       <Service l={service} key={service._id} />
        ))
        
      }
    </div>
     )
    }
   </div>
   </>
  )
}

export default Hotel