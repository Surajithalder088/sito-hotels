"use client"

import React, { useState } from 'react'
import "./style.css"
import Link from 'next/link'
import axios from "axios"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


const api=process.env.NEXT_PUBLIC_API_URL

const hotelRegister = () => {
    const[email,setEmail]=useState("")
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[address,setAddress]=useState("")
    const router=useRouter()

    const apiregister=async(e)=>{
        e.preventDefault()
 try{
     const res= await axios.post(api+`/api/hotel/register`,{name,email,password,address})
     console.log(res.data);
     alert("registered successfully")
     router.push(`/hotel-services/${res.data.newUser._id}`)
     
        }catch(error){
            console.log(error);
            alert("Failed to register")
        }
          
    }
  return (
   <>
   <div className="loginContainer">
    <div className="card">
        <h3>Register to Hotel's Account</h3>
        <div className="formR">
            
            <form onSubmit={apiregister}>
                 <input
                 type='String'
                 placeholder='Enter Your Name'
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 />
                <input
                 type='email'
                 placeholder='Enter Your Email'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
                 <input
                 type='password'
                 placeholder='Enter Your password'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 />
                 <input
                 type='text'
                 placeholder='Enter your hotel address'
                 value={address}
                 onChange={(e)=>setAddress(e.target.value)}
                 />
                 <button  type='submit'>Register</button>
            </form>
        </div>
        <p className='p'>Already have account :<Link href={'/hotel-login'}>Login</Link></p>
    </div>
   </div>
   </>
  )
}

export default hotelRegister