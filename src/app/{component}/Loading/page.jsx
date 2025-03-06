"use client"

import { CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'
import "./style.css"

const Loading = () => {
  return (
    <>
    <div className="loadingContainer">
        <div className="loading">
        <CircularProgress/>
        </div>
    </div>
    </>
  )
}

export default Loading