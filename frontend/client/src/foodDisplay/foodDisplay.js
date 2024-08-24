 
 import React, { useContext } from 'react';
 import './foodDisplay.css';
 import { StoreContext } from '../context/storeContext';
 import { FoodItem } from '../comoponents/foodItem/foodItem';
 
 export const FoodDisplay = ({ category }) => {
   const { food_list } = useContext(StoreContext);
 
   // Log the food list to see its current state
   console.log('food_list:', food_list);
 
   // Handle the case where food_list might be undefined or still loading
   if (!food_list || food_list.length === 0) {
     return <div>Loading...</div>;
   }
 
   return (
     <div className='food-display' id="food-display">
       <h2>Top dishes are here</h2>
       <div className='food-display-list'>
         {food_list.map((item, index) => {
           if (category === "ALL" || category === item.category) {
             return (
               <FoodItem
                 key={index}
                 id={item._id}
                 name={item.name}
                 description={item.description}
                 price={item.price}
                 image={item.image}
               />
             );
           }
           return null; // To avoid warnings for not returning a value
         })}
       </div>
     </div>
   );
 };
 