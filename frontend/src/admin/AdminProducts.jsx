import React, { useState } from 'react'
import Slidebar from './Slidebar'
import { Link } from 'react-router-dom'
import { FaPlus ,FaEdit ,FaTrash  } from "react-icons/fa";
import { useEffect } from 'react';
import {toast} from 'react-hot-toast'


const AdminProducts = () => {

const [products ,setProducts] = useState([]);
    

async function getAllProducts() {
    try {
   const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/getproduct`);
    const result = await response.json();
    console.log(result);
    setProducts(result.data);

    } catch (error) {
    console.log(error);
    }}

    useEffect(()=>{
    getAllProducts();
    },[]);

async function handleDelete(id){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productdelete/${id}`,
{
    method:"DELETE",
    } );
    const result =await response.json();
    if(response.ok){
        toast.success(result.message);
        getAllProducts();
    }   else{
        toast.error(result.error);
    }} 
    catch (error) {
        toast.error(error);
    }
}

return (
    <div className='flex mt-16' >
        <Slidebar/>
    <div className='flex-1 p-10 bg-gray-50 min-h-screen'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Admin Products 📊</h1>

        {/* Product Manage */}
    <Link to={'/admin/add_product'}>
    <button className='flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition'>
        <FaPlus/> Add Products
    </button>
    </Link>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5'>

    {
        products.map((items,index)=>(
        <div key={index} className='bg-white rounded-xl shadow p-4 hover:shadow-xl transition '>

      <img
  src={`${import.meta.env.VITE_API_URL}/uploads/${items.productImage}`}
  alt="Product img"
  className="w-full h-40 object-cover rounded-md mb-4 border"
/>

        <h1 className='text-xl font-semibold text-gray-700'>{items.productName}</h1>

        <p className='text-sm text-gray-600'>Category:- {items.productCategory}</p>

        <p className='text-green-500 font-bold mt-1'>Price:- ₹{items.productPrice}</p>

        {
            items.productStatus === "In-Stock" ?
             <p className='text-blue-700 font-semibold mt-1'>{items.productStatus}</p> :  <p className='text-red-500 font-semibold mt-1'>{items.productStatus}</p>
        }
       

        <div className='flex justify-between mt-4 flex-col sm:flex-row'>
            <Link  to={`/admin/edit-product/${items._id}`} className='flex items-center  text-blue-500 hover:text-blue-700'> <FaEdit/> Edit</Link>
                        
            <Link onClick={()=>{handleDelete(items._id)}} className='flex items-center  text-red-500 hover:text-red-700'> <FaTrash/>Delete</Link>
        </div>
</div>))
}
</div>
</div>
</div>
)}

export default AdminProducts
