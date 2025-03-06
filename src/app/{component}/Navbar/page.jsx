"use client"

import Link from "next/link"
import "./style.css"
import homeIcon from '../../../../public/home-2-fill.png'
import userIcon from '../../../../public/user-3-fill.png'

const Navbar = () => {
  return (
    <div className='navbarContainer'> 
    <div className="logo">
      <h1>  SITO</h1>
    </div>
   
      <div className="links" >
        <Link href={'/'}>
        <img src='/home-2-fill.png' className="icon" />
        </Link>
        <Link href={'/profile'}>
        <img src='/user-3-fill.png'  className="icon"  />
        </Link>
      </div>
   
    </div>
  )
}

export default Navbar