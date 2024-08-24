 

 import React, { useContext, useEffect, useState } from 'react';
 import "./placeOrder.css";
 import axios from 'axios';
 import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
 
 export const PlaceOrder = () => {
   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
   const [data, setData] = useState({
     firstName: "",
     lastName: "",
     email: "",
     street: '',
     city: "",
     state: "",
     zipcode: "",
     country: "",
     mobile: ""
   });
 
   const onChangeHandler = (e) => {
     const { name, value } = e.target;
     setData(prevData => ({ ...prevData, [name]: value }));
   };
 
   const placeOrder = async (e) => {
     e.preventDefault();
     let orderItems = [];
     food_list.forEach((item) => {
       if (cartItems[item._id] > 0) {
         let itemInfo = { ...item, quantity: cartItems[item._id] };
         orderItems.push(itemInfo);
       }
     });
 
     let orderData = {
       address: data,
       items: orderItems,
       amount: getTotalCartAmount() + 2
     };
 
     try {
       let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
       if (response.data.success) {
         const { session_url } = response.data;
         window.location.href = session_url;
       } else {
         alert("Error: Unable to place order");
       }
     } catch (error) {
       console.error("Error placing order", error);
       alert("Error: Unable to place order");
     }
   };
   const navigate =useNavigate( )

   useEffect(()=>{
if(!token){
navigate('/cart')
}
else if(getTotalCartAmount()===0)
{
  navigate('/cart')
}
   },[token])
 
   return (
     <form className='place-order' onSubmit={placeOrder}>
       <div className='place-order-left'>
         <p className='title'>Delivery Information</p>
         <div className='multi-fieldes'>
           <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type='text' placeholder='First Name' />
           <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type='text' placeholder='Last name' />
         </div>
         <input required name='email' value={data.email} onChange={onChangeHandler} type='email' placeholder='Email' />
         <input required name='street' value={data.street} onChange={onChangeHandler} type='text' placeholder='Street' />
         <div className='multi-fieldes'>
           <input required name='city' value={data.city} onChange={onChangeHandler} type='text' placeholder='City' />
           <input required name='state' value={data.state} onChange={onChangeHandler} type='text' placeholder='State' />
         </div>
         <div className='multi-fieldes'>
           <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type='text' placeholder='Zip Code' />
           <input required name='country' value={data.country} onChange={onChangeHandler} type='text' placeholder='Country' />
         </div>
         <input required name='mobile' value={data.mobile} onChange={onChangeHandler} type='text' placeholder='Mobile Number' />
       </div>
       <div className='place-order-right'>
         <h2>Cart Total</h2>
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
           <button type="submit">PROCEED TO PAYMENT</button>
         </div>
       </div>
     </form>
   );
 };
 