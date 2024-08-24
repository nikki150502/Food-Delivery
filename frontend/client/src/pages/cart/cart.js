 
 import React, { useContext } from 'react';
 import "./cart.css";
 import { StoreContext } from '../../context/storeContext';
 import { useNavigate } from 'react-router-dom';
 
 export const Cart = () => {
   const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
   const navigate = useNavigate();
 
   return (
     <div className='cart'>
       <div className='cart-items'>
         <div className='cart-items-title'>
           <p>Items</p>
           <p>Title</p>
           <p>Price</p>
           <p>Quantity</p>
           <p>Total</p>
           <p>Remove</p>
         </div>
 
         {food_list.map((item) => {
           if (cartItems[item._id] > 0) {
             return (
               <div key={item._id}>
                 <div className='cart-items-title cart-items-item'>
                   <img src={`${url}/images/${item.image}`} alt={item.name} />
                   <p>{item.name}</p>
                   <p>{item.price}</p>
                   <p>{cartItems[item._id]}</p>
                   <p>${item.price * cartItems[item._id]}</p>
                   <p className="cross" onClick={() => removeFromCart(item._id)}>
                     x
                   </p>
                 </div>
                 <br />
                 <hr />
               </div>
             );
           }
           return null;
         })}
       </div>
 
       <div className='cart-bottom'>
         <div className='cart-total'>
           <h2>Cart Total</h2>
           <div>
             <div>
               <div className='cart-total-details'>
                 <p>Subtotal</p>
                 <p>${getTotalCartAmount()}</p>
               </div>
               <hr />
               <div className='cart-total-details'>
                 <p>Delivery Charge</p>
                 <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
               </div>
               <hr />
               <div className='cart-total-details'>
                 <b>Total</b>
                 <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
               </div>
             </div>
             <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
           </div>
         </div>
 
         <div className='cart-promocode'>
           <div>
             <p>If you have a promo code, enter it here</p>
             <div className='cart-promocode-input'>
               <input type='text' placeholder='Promo code' />
               <button>Submit</button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
 