"use client"

import React, { useState } from 'react'
import "./style.css"
import Link from 'next/link'
import axios from "axios"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {userAuth}from "../../lib/features/authUser/authUserSlice"


const api=process.env.NEXT_PUBLIC_API_URL

const Register = () => {
    const[email,setEmail]=useState("")
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const route=useRouter()

    const apiregister=async(e)=>{
        e.preventDefault()
        try{
     const res= await axios.post(api+`/api/customer/register`,{name,email,password})
     console.log(res.data);
     route.push('/login')
     
        }catch(error){
            console.log(error);
            
        }
          
    }
  return (
   <>
   <div className="loginContainer">
    <div className="card">
        <h3>Register</h3>
        <div className="formR">
            
            <form onSubmit={apiregister}>
                 <input
                 type='String'
                 placeholder='Enter Your Name'
                 onChange={(e)=>setName(e.target.value)}
                 />
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
                 <button  type='submit'>Register</button>
            </form>
        </div>
        <p className='p'>Already have account :<Link href={'/login'}>Login</Link></p>
    </div>
   </div>
   </>
  )
}

export default Register