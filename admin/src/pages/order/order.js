 
 import React, { useState, useEffect } from 'react'
 import './order.css'
 import axios from 'axios'
 import { toast } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'
 import { assets } from '../../assets/assets.js'
 
 export const Order = ({ url }) => {
   const [orders, setOrders] = useState([])
 
   const fetchAllOrders = async () => {
     try {
       const response = await axios.get(url + "/api/order/list")
       if (response.data.success) {
         setOrders(response.data.data)
         console.log(response.data.data)
       } else {
         toast.error("Error fetching orders")
       }
     } catch (error) {
       toast.error("Error fetching orders")
     }
   }
 
const statusHandler =async(e,orderId)=>{
  const response = await axios.post(url+"/api/order/status",{
    orderId,
    status:e.target.value,

  })
  if(response.data.success){
    await fetchAllOrders();
  }
console.log(e,orderId)
}

   useEffect(() => {
     fetchAllOrders()
   }, [url])
 
   return (
     <div className='order add'>
       <h3>Order Page</h3>
       <div className='order-list'>
         {orders.map((order, index) => (
           <div key={index} className='order-item'>
             <img src={assets.order} alt='Order' />
             <p className='order-item-food'>
               {order.items.map((item, itemIndex) => (
                 <span key={itemIndex}>
                   {item.name} x {item.quantity}
                   {itemIndex < order.items.length - 1 && ', '}
                 </span>
               ))}
             </p>
             <p className='order-item-name'>
               {order.address.firstName} {order.address.lastName}
             </p>
             <div className='order-item-address'>
               <p>{order.address.street},</p>
               <p>
                 {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
               </p>
             </div>
             <p className='order-item-phone'>{order.address.phone}</p>
             <p>Items: {order.items.length}</p>
             <p>${order.amount}</p>
             <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
               <option value='food processing'>Food Processing</option>
               <option value='out for delivery'>Out for Delivery</option>
               <option value='delivered'>Delivered</option>
             </select>
           </div>
         ))}
       </div>
     </div>
   )
 }
 