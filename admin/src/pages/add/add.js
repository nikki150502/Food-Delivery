 

 import React, { useEffect, useState } from 'react';
 import './add.css';
 import axios from 'axios';
 import { assets } from '../../assets/assets';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 
 export const Add = ({ url }) => {
   const [image, setImage] = useState(false);
   const [data, setData] = useState({
     name: "",
     description: "",
     price: "",
     category: "Salad"
   });

  

   const [loading, setLoading] = useState(false);
 
   const onChangeHandler = (e) => {
     const name = e.target.name;
     const value = e.target.value;
     setData(data=>({...data,[name]:value}));
   };
   useEffect(() => {
    console.log(data);
  }, [data]);
 
   const onSubmitHandler = async (event) => {
     event.preventDefault();
     setLoading(true);
     const formData = new FormData();
     formData.append("name", data.name);
     formData.append("description", data.description);
     formData.append("price", Number(data.price));
     formData.append("category", data.category);
     formData.append("image", image);
 
     try {
       const response = await axios.post(`${url}/api/food/add`, formData);
 
       if (response.data.success) {
         setData({
           name: "",
           description: "",
           price: "",
           category: "Salad"
         });
         setImage(false);
         toast.success(response.data.message);
       } else {
         toast.error(response.data.message);
       }
     } catch (error) {
       toast.error("An error occurred while adding the product. Please try again.");
     } finally {
       setLoading(false);
     }
   };
 
  
   return (
     <div className='add'>
       <form className='flex-col' onSubmit={onSubmitHandler}>
         <div className='add-image-upload flex-col'>
           <p>Upload Image</p>
           <label htmlFor='image'>
             <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="upload" />
           </label>
           <input
             onChange={(e) => setImage(e.target.files[0])}
             type="file"
             id="image"
             className="hidden"
             required
           />
         </div>
         <div className='add-product-name flex-col'>
           <p>Product Name</p>
           <input
             onChange={onChangeHandler}
             value={data.name}
             type='text'
             name='name'
             placeholder='Type Name'
             required
           />
         </div>
         <div className='add-product-description flex-col'>
           <p>Description</p>
           <textarea
             onChange={onChangeHandler}
             value={data.description}
             name='description'
             rows="6"
             placeholder='Description'
             
           />
         </div>
         <div className='add-category-price flex-col'>
           <div className='add-category flex-col'>
             <p>Product Category</p>
             <select onChange={onChangeHandler} value={data.category} name="category" required>
               <option value="Salad">Salad</option>
               <option value="Rolls">Rolls</option>
               <option value="Noodles">Noodles</option>
               <option value="Pizza">Pizza</option>
               <option value="Fries">Fries</option>
               <option value="South">South</option>
               <option value="Deserts">Deserts</option>
               <option value="Juice">Juice</option>
               <option value="Cake">Cake</option>
               <option value="Sandwich">Sandwich</option>
             </select>
           </div>
           <div className='add-price flex-col'>
             <p>Product Price</p>
             <input
               onChange={onChangeHandler}
               value={data.price}
               type="number"
               name='price'
               placeholder='$20'
               required
             />
           </div>
         </div>
         <button type='submit' className='add-button' disabled={loading}>
           {loading ? "Adding..." : "ADD"}
         </button>
       </form>
     </div>
   );
 };
 