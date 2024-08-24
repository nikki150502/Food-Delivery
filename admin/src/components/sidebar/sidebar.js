import React from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add} alt="add" />
          <p>Add items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'> {/* Corrected path */}
          <img src={assets.list} alt="list" />
          <p>List items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order} alt='order' />
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  );
};
