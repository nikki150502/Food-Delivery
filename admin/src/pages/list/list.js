 import React, { useEffect, useState } from 'react'
 import './list.css'
 import axios from 'axios'
 import {toast, ToastContainer} from 'react-toastify'
 
 export const List = ({url}) => {
  const [list,setList]=useState([]);
 


  const fetchList =async()=>{
     const res =  await axios.get(`${url}/api/food/list`);
      console.log(res.data);
     if(res.data.success)
       {
        setList(res.data.data)
       }
       else
       {
        toast.error("error");
       }
  }
  useEffect(()=>{
    fetchList();
    },[])

  const removeFood = async( foodId)=>{
 
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
   await fetchList();
   if(response.data.success){
    toast.success(response.data.message);
   }else
   {
    toast.error("error")}
   }
 

   return (
     <div className='list add flec-col'>
       <p>All Food List</p>
       <div className='list-table'>
         <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
           
          <b>Price</b>
          <b>Action</b>
         </div>
         {list.map((item,index)=>{
             return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt=""/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                 <p>${item.price}</p>
                 <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
                </div>
             )
         })}
       </div>
       <ToastContainer/>
     </div>
   )
 
  }