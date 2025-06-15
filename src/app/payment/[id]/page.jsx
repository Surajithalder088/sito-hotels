"use client"
import "./style.css"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import Checkout from "@/app/{component}/CheckoutForm/page"
import { Loader2 } from "lucide-react"

const api=process.env.NEXT_PUBLIC_API_URL
const stripe_publishable_key="pk_test_51Qycsc2fvWXfpS0a9f5dW4wp8Vr0fLjQM17BwjpuA4EaFW4EfkcOxFCBWWPIC2LgeMmnLtDx0trOYrlnF5YnApaX00KhObaB56"

const stripePromise=loadStripe(stripe_publishable_key)

const Payment = () => {
  const {id}=useParams()
 const navigate=useParams()

 const [clientSecret,setClientSecret]=useState("")
 const [cardNumber ,setCardNumber]=useState("")
 const[cvv,setCvv]=useState(null)
 const[date,setDate]=useState("")
 const [order,setOrder]=useState({})
 const [price,setPrice]=useState(1)


 const[amount,setAmount]=useState(0)
 const [customerName,setCustomerName]=useState("")
 const [customerEmail,setCustomerEmail]=useState("")
 const [customerPhone,setCustomerPhone]=useState("")

 const fetchingPaymentIntent=async()=>{
  try {
   const respons= await fetch(`${api}/create-payment-intent`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({amount:price})
  }).then((res)=>res.json()).then((data)=>{console.log(data)
   setClientSecret(data.clientSecret)
  console.log("client secret",data)}
  )
 
  
  } catch (error) {
    console.log("failed to get client secret",error);
    
  }
  
}

 const fetchReceiptDetails= async()=>{
 try {
  const data= await axios.get(api+`/api/receipt/${id}`,{withCredentials:true})
  console.log(data.data.receipt);
  setOrder(data.data.receipt)
  setPrice(order.price)
  //fetchingPaymentIntent()
 } catch (error) {
  console.log(error);
  
  
 }
  

 }

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

const handlePayment=async()=>{
  if(!amount||!customerEmail||!customerName||!customerPhone){
  //  alert("Fill all details")
   // return
  }
  console.log("upi");
  
    try {
      const respons=await fetch(`${api}/api/payment/create-order`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          orderId:"order_"+Date.now(),
          amount:"0",
          customer_name:"o",
          customer_email:"o",
          customer_phone:"o"
        })
      })
      const data=await respons.json()
      console.log(data);
      

      if(data.order_meta.return_url){
        console.log(data);
        
      // window.location.href=data.order_meta.return_url
      }else{
        alert("Error to generate payment link")
      }
    } catch (error) {
      console.log("payment error",error);
      
    }
}
  

  useEffect(()=>{
    fetchReceiptDetails()
    console.log(clientSecret);
    
  },[])

  return (
    
   <>
 

    {/*
    clientSecret ? 
   <div className="stripe">
   <Checkout  clientSecret={clientSecret}id={id}/>
   </div>
   :
    
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <p>Payment form will be available soon !</p>
    <Loader2 className="loader"/></div>
    */}
    
   
   
   
   <div className="paymentContainer">
    <div className="cardid">Payment for Receipt Id  :{id}</div>
    
    
    <div className="paymentForm"
   
    >
      
    
      <span>Total Payable price :{order.price}</span>

    <input className="input" placeholder="Name" value={customerName} onChange={(e)=>setCustomerName(e.target.value)}/>
    <input className="input" placeholder="Email" value={customerEmail} onChange={(e)=>setCustomerEmail(e.target.value)}/>
    <input className="input" placeholder="phone" value={customerPhone} onChange={(e)=>setCustomerPhone(e.target.value)}/>
    <input type="number" className="input" placeholder="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
      <button className="paybill" onClick={handlePayment}>Pay</button>
      
      <div className="upi" onClick={()=>alert('G pay is under construction')}>pay using <span className="gpay">GPay</span> </div>
    </div>
    </div>
    
  
    </>
  )
}

export default Payment