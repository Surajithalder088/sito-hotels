"use client"

import  {createSlice} from "@reduxjs/toolkit"

export const orderCartSlice=createSlice({
    name:'orderCart',
    initialState:{
      items:[],
      totalQuantity:0,
      totalPrice:0
        
    },
    reducers:{
        addToCart:(state,action)=>{
            const {id,name,price}=action.payload;
            const existingItem=state.items.find((item)=>item.id===id)
            if(existingItem){
                existingItem.quantity +=1;

            }else{
                state.items.push({id,name,price,quantity:1})
            }
            state.totalQuantity +=1;
            state.totalPrice +=price

        },
        removeFromCart:(state,action)=>{
            const {id}=action.payload;
            const existingItem=state.items.find((item)=>item.id===id)
            if(existingItem){
                state.totalPrice -=existingItem.price* existingItem.quantity
                state.totalQuantity -= existingItem.quantity
             state.items=state.items.filter((item)=>item.id!==id)
            }
            

        },
        updateQuantity:(state,action)=>{
            const {id,quantity}=action.payload
            const existingItem=state.items.find((item)=>item.id===id)
            if(existingItem && quantity>0){
                const difference= quantity -existingItem.quantity;
                state.totalQuantity +=difference;
                state.totalPrice += difference* existingItem.price;
                existingItem.quantity +=difference
            }

        },
        clearCart:(state)=>{
            state.items=[]
            state.totalPrice=0
            state.totalQuantity=0
        },
       
    }
})

export const {addToCart,removeFromCart,updateQuantity,clearCart}=orderCartSlice.actions;

export default orderCartSlice.reducer;

