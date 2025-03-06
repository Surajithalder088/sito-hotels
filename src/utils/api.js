import axios from "axios"

const api=process.env.NEXT_PUBLIC_API_URL

export const receiptCreate=async({id,type,price,services,details})=>{
   
    try{
      
     const receipt= await axios.get(api+`/api/receipt/receipt-create/${id}`,{type,price,services,details},{withCredentials:true})
    
     return (receipt)
 
    }catch(error){
    
      return (error)
     
    }
  }

