import React from 'react'
import Slidebar from './Slidebar'
import { useEffect } from 'react'
import { useState } from 'react'
import {toast} from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminQuery = () => {
    const[query ,setQuery] = useState([]);

   async function AllQuery() {
    try {
      const response = await fetch("/api/userallquery");
      const record = await response.json();
      if (response.ok) {
        setQuery(record.data);
      } else {
        toast.error(record.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function handleDelete(id){
    try {
        const response = await fetch(`/api/deletequery/${id}`,{
            method:"DELETE"
        });
        const record = response.json();
        if(response.ok){
            toast.success(record.message);
            AllQuery();
        }else{
            toast.error(record.message);
        }
    } catch (error) {
        toast.error(error);
    }
  }

    useEffect(()=>{
        AllQuery();
    },[])
return (
    <div className='flex mt-16' >
        <Slidebar/>
    <div className='flex-1 p-10 bg-gray-50 min-h-screen'>

    <h1 className='text-3xl font-bold mb-6 text-gray-800'>Query Management</h1>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-6 py-3">
                    S.No.
            </th>

            <th scope="col" className="px-6 py-3">
                    User_Name
            </th>

            <th scope="col" className="px-6 py-3">
                    Query
            </th>

            <th scope="col" className="px-6 py-3">
                    Email-Id
            </th>

            <th scope="col" className="px-6 py-3">
                    Status
            </th>

            <th scope="col" className="px-6 py-3">
                    Action
            </th>

            <th scope="col" className="px-6 py-3">
                    Action 2
            </th>
    </tr>
</thead>
<tbody>
    {
        query.map((item , index)=>(
 <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {index + 1} 
        </th>

        <td className="px-6 py-4">
            {item.Name}
        </td>

        <td className="px-6 py-4">
             {item.Query}
        </td>

        <td className="px-6 py-4">
            {item.Email}
        </td>

        <td className="px-6 py-4 ">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{item.Querystatus}</a>
        </td>

        <td className="px-6 py-4 ">
            <Link to={`/admin/query-reply/${item._id}`}>
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reply</button>
            </Link>
        </td>

        <td className="px-6 py-4 ">
            <a href="#" onClick={()=>{handleDelete(item._id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
        </td>
</tr>
        ))
    }
   
</tbody>
</table>
</div>

</div>
</div>
)}

export default AdminQuery
