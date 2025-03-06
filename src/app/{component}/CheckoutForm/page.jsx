"use client"

import React, { useState } from 'react'
import axios from "axios"
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"


const api=process.env.NEXT_PUBLIC_API_URL

const Checkout = ({clientSecret,id}) => {
    
    const stripe=useStripe();
    const elements=useElements()
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const [succes,setSuccess]=useState(false)

    const payBill=async ()=>{
        try{ 
          const data= await axios.get(api+`/api/receipt/receipt-pay/${id}`, {withCredentials:true})
          console.log(data.data);
          
          navigate.push('/profile')
        }catch(error){
          console.log(error);
          window.history.back()
          
        }
      
      }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        setLoading(true)
        setError(null)
        if(!stripe || !elements){
            return
        }
        const cardElement=elements.getElement(CardElement)

        const {error,paymentIntent}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:cardElement,
            }
        })
        if(error){
            setError(error.message)
            setLoading(false)
        }else{
            setSuccess(true)
            setLoading(false)
           await payBill()
        }

    }

  return (
    <form onSubmit={handleSubmit}>
        <CardElement />
        <button type='submit' disabled={!stripe ||loading}>
            {loading?"Processing":"Pay"}
        </button>

        {error && <div>{error}</div>}
        {succes && <div>Payment Successful !</div>}
    </form>
  )
    
}

export default Checkout
