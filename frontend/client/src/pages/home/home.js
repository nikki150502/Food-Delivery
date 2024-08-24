 import React, { useState } from 'react'
 import "./home.css"
import { Header } from '../../comoponents/header/header'
import { Explor } from '../../comoponents/explormenu/explor'
import { FoodDisplay } from '../../foodDisplay/foodDisplay'

 export const Home = () => {
const [category,setCategory] = useState("ALL");

   return (
     <div>
        <Header/>
        <Explor category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
     </div>
   )
 }
 