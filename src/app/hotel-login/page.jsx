"use client"

import React, { useState } from 'react'
import "./style.css"
import Link from 'next/link'
import { loginApi } from '@/utils/authApi'
import { redirect } from 'next/navigation'
import axios from 'axios'

const api=process.env.NEXT_PUBLIC_API_URL

const hotelLogin = () => {
    const [loading,setLoading]=useState(false)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [user,setUser]=useState({})
  const [ dashboard,setdashboard]=useState(false)

    const loginHandler=async(e)=>{
        e.preventDefault()
       
        try{ setLoading(true)
             const data=await axios.post(api+`/api/hotel/login`,{email,password},{withCredentials:true})
      
       console.log(data.data.existingUser);
      setUser(data.data.existingUser)
      
      setdashboard(true)
       setLoading(false)

        }catch(error){
            console.log(error);
            
        }
      
       
    }
    return (
        <>
        <div className="loginContainer">
         <div className="heading">
         <h3>Sign in as hotel admin to see dashboard</h3>
        </div>
         <div className="card">
             <h3>Login to Hotel's Account</h3>
            {
                !dashboard? 
                (
             <div className="form">
                 
                 <form onSubmit={ loginHandler}>
                     <input
                      type='email'
                      placeholder='Enter Your Email'
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                      <input
                      type='password'
                      placeholder='Enter Your password'
                      onChange={(e)=>setPassword(e.target.value)}
                      />
                      <button className={loading?"load":"loginbtn"} type='submit'>{loading?"Loading..":"Login"}</button>
                 </form>
             </div>
             ):(

               
             <button className="btnd"
             onClick={()=>{
                redirect(`/hotel-services/${user._id}`)
             }}
             >View dashboard</button>
              )
             }
             <p className='p'>New Customer?Register first :<Link href={'/hotel-register'}>Register</Link></p>
         </div>
        </div>
        </>
       )
     }
     
     export default hotelLogin