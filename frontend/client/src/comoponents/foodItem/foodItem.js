import React, { useContext, useState } from 'react';
import './foodItem.css';
import { StoreContext } from '../../context/storeContext';

export const FoodItem = ({ id, name, description, price, image }) => {
  const [itemCount, setItemCount] = useState(0);
  const{cartItems,addToCart,removeFromCart,url}  = useContext(StoreContext);
 

  return (
    <div className='food-item' id={id}>
      <div className='food-item-img-container'>
        <img src={url+'/images/'+image} alt={name} className='food-img' />
      {!cartItems[id]}
      </div>
      <div className='food-item-info'>
        <p className='food-name'>{name}</p>
        <p className='food-description'>{description}</p>
        <div className='food-item-footer'>
          <p className='food-price'>Rs. {price}</p>
          <div className='food-item-counter'>
            <button className="counter-btn" onClick={()=>removeFromCart(id)}>-</button>
            <span>{cartItems[id]}</span>
            <button className="counter-btn" onClick={()=>addToCart(id)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};
