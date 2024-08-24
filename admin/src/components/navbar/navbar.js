import React from 'react'
 import { assets } from '../../assets/assets.js'
 import './navbar.css'
export const Navbar = () => {
  return (
     <div className='navbar'>
        <img className='logo' src={assets.logo} alt="logo"/>
        <img className='profile' src={assets.profile} alt="logo"/>
     </div>
  )
}
