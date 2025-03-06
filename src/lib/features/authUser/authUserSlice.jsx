"use client"

import  {createSlice} from "@reduxjs/toolkit"

export const authUserSlice=createSlice({
    name:'authUser',
    initialState:{
      
        email:"xxxx",
        type:"xxxx"
    },
    reducers:{
        userAuth:(state,action)=>{
            state.email=action.payload
            state.type='customer'
        },
        logout:state=>{
            state.email="xxxx"
            state.type="xxxx"
        },
        hotelAuth:(state,action)=>{
            state.email=action.payload
            state.type='hotel'
        },

    }
})

export const {userAuth,hotelAuth,logout}=authUserSlice.actions;

export default authUserSlice.reducer;