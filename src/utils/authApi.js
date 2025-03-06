import axios from "axios"

const api=process.env.NEXT_PUBLIC_API_URL

export const loginApi=async({email,password})=>{
    try{
         const authData=await axios.post(api+`/api/customer/login`,{email,password},{withCredentials:true})
    return authData.data;

    }catch(error){
        return {
            data:"failed",
            error
        }
    }
   
}