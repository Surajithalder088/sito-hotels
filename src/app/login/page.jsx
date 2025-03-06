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

       
        setLoading(true)
       const data=await loginApi({email,password})
      
       console.log(data.existingUser);
       
      dispatch(userAuth(data.existingUser.email))
       route.push('/profile')
     }catch(error){
        console.log(error);
        
     }
       
    }
  return (
   <>
   <div className="loginContainer">
    <div className="heading">
    <h3>An authenticate customer has access to all the services of this platform,so Login first</h3>
   </div>
    <div className="card">
        <h3>Login</h3>
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
        <p className='p'>New Customer?Register first :<Link href={'/register'}>Register</Link></p>
    </div>
   </div>
   </>
  )
}

export default login