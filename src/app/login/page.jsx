"use client"

import React, { useState } from 'react'
import "./style.css"
import Link from 'next/link'
import { loginApi } from '@/utils/authApi'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import {userAuth}from "../../lib/features/authUser/authUserSlice"

const login = () => {
    const [loading,setLoading]=useState(false)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const route=useRouter()

    const dispatch=useDispatch()

    const loginHandler=async(e)=>{
        e.preventDefault()
        try{

       console.log(email,password);
       
        setLoading(true)
       const data=await loginApi({email,password})
      
       console.log(data);
       
      dispatch(userAuth(data.existingUser.email))
       route.push('/profile')
     }catch(error){
        console.log(error);
        
     }finally{
        setLoading(false)
     }
       
    }
  return (
   <>
   <div className="loginContainer">
    <div className="heading">
    <h3>An authenticate customer has access to all the services of this platform,so Login first</h3>
    <button className='hotelLogin'
    onClick={()=>redirect('/hotel-login')}
    >Login as Hotel</button>
   </div>
    <div className="cardl">
        <h3>Login as Customer</h3>
       
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
        <div 
        onClick={(e)=>{e.preventDefault() 
            alert('Google login is under implementation now.')}}
        className="googleAuth">
        <img src='/google-icon.png'/>
            <p>login with google</p>
        </div>
        <p className='p'>New Customer?Register first :<Link href={'/register'}>Register</Link></p>
    </div>
    <div className='demoLogin'>
        <p>For testing,login as demo customer <br/>
        Email: user1@mail.com <br/>
        password: 123456</p>
    </div>
   </div>
   </>
  )
}

export default login