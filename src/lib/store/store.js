"use client"

import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../features/authUser/authUserSlice"
import orderCartReducer from "../features/orderCart/orderCartSlice"

export const store=configureStore({
    reducer:{
            authUser:authUserReducer,
            orderCart:orderCartReducer
    },
})