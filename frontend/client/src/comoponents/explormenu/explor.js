 // Explor.js
import React from 'react';
import { menu_list } from '../../assets/assets';
import "./explor.css";

export const Explor = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Selecting delicious food is about satisfying your taste buds and enjoying a delightful culinary experience.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div  onClick={()=>setCategory(prev=>prev===item.menu_name ? "All":item.menu_name)} key={index} className='explore-menu-list-item'>
              <div className='menu_img'>
                <img className={category===item.menu_name ? "active" : "" } src={item.menu_img} alt={item.menu_name} />
              </div>
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr/>
    </div>
  );
};
