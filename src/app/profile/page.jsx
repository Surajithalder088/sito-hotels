"use client"

import React, { useEffect, useState } from 'react'
import "./style.css"
import { receipts } from '@/assets/receipt'
import Navbar from '../{component}/Navbar/page'
import Link from 'next/link'
import Order from '../{component}/Order/page'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../../lib/features/authUser/authUserSlice"
import { useRouter } from 'next/navigation'



const api=process.env.NEXT_PUBLIC_API_URL



const Profile = () => {
  const authUser=useSelector((state)=>state.authUser.type)
    const route=useRouter()
 
    useEffect(() => {
     if(authUser!=='customer'){
       route.push('/login')
     }
     
    }, [])
 const [user,setUser]=useState(null)
 const [receiptList,setReceiptList]=useState([])
  

 const dispatch=useDispatch()

  const fetchUserProfile=async()=>{
    const data=  await axios.get(api+`/api/customer/profile`,{withCredentials:true})
    console.log(data.data);
    
    setUser(data.data.authUser)
    setReceiptList(data.data.receipts)
    
  }
 
  const logOut=(e)=>{
    e.preventDefault()
      dispatch(logout())
    console.log(authUser);
    
  }
  useEffect(() => {
    fetchUserProfile()
  
   
  }, [])
  
  return (
    <>
    <Navbar/>
    <div className="nav"></div>
    <div className="profile">
      {
        (user ===null)?(
          <div className="user">
            <p> no user</p>
            <button className="btn"
        onClick={logOut}
        >Logout</button>
          </div>
        ):

        (

       <div className="user">
      <div  className="userinfo">
        <p>Email - {user.email} </p>
        <p>Id -{user._id}</p>
        <p>total orders :{user.receipts.length}</p>
        <p>acb road, kol-768906</p>
        
      </div >
      <button className="logout"
        onClick={logOut}
        >Logout</button>
      </div> 
      )
      }
      {
        (receiptList.length===0)?
        (<div className="receipts">
          <p>No orders</p>
        </div>)
        :(

        

      <div className="receipts">
        <h2>Order history</h2>
          {
            receiptList.filter((item)=>item && item._id)
            .map((item)=>
              ( <Link href={`/receipt/${item._id}`}>

                <Order key={item._id} item={item}/>
             </Link>
     
        )
            )
          }
       
      </div>
      )
      }
      </div>
    </>
  )
}

export default Profile