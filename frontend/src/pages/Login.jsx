import React, { useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash ,FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';


const Login = () => {
    const navigate = useNavigate();
    const [showpass, setShowPass] = useState(false);
    const [login ,setLogin] = useState({loginEmail:"",loginPass:""});

    async function handleForm(e){
        e.preventDefault();
        try {
        const response = await fetch("/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });     
      const result = await response.json();

      if(response.ok){

        if(result.data && result.data.userEmail === "admin@gmail.com"){
            navigate("/admin/dashboard");
            toast.success("Hello Admin");
        }else{
        toast.success(result.message);
        navigate("/");
        }
       
      } else{
        toast.error(result.error);
      }
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(e){
        setLogin({...login,[e.target.name]:e.target.value});
    }

    return (
        <div className='fixed inset-0 bg-back bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50'>
           <div className='bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative mx-4'>
            <button onClick={()=>{navigate("/ ")}} className='absolute top-3 right-3 text-gray-500 hover:text-green-500 text-xl'><FaTimes/></button>

            <h2 className='text-2xl font-bold mb-4 text-green-600 text-center'>LogIn To continue</h2>

            <form action="" onSubmit={handleForm}>
                <label htmlFor="" className='block text-sm text-gray-700 mb-2'>Email</label>
                <input type="email" name="loginEmail" value={login.loginEmail} onChange={handleChange} placeholder='you@example.com' id="" className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-2'/>

                 <label htmlFor="" className='block text-sm text-gray-700 mb-2'>Password</label>
                 <div className='relative'>
                    <input type={showpass? "password" : "text"} value={login.loginPass} name="loginPass" onChange={handleChange} placeholder='*******' id="" className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500'/>
                <button type='button' onClick={()=>{setShowPass(!showpass)}} className='absolute top-4 right-3 text-gray-500 hover:text-green-600'>
                    {showpass ? <FaEyeSlash/> : <FaEye/>}
                </button>

                 </div>

                <button type='submit' className='w-full bg-green-600 hover:bg-green-800 text-white rounded py-2 mt-6 font-semibold'>LogIn</button>
            </form>

            <p className='text-sm text-center text-gray-600 mt-5'>Don't have an account? <Link to={"/reg"} className='text-green-600 hover:underline'>Register</Link></p>
            </div> 
        </div>
    )
}

export default Login
