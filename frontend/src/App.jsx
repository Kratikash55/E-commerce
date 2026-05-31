import React from 'react'
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AddProducts from './admin/AddProducts'
import EditProducts from './admin/EditProducts'
import Contact from './pages/Contact'
import AdminQuery from './admin/AdminQuery'
import Queryreply from './admin/Queryreply'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/products' element={<AdminProducts/>}/>
        <Route path='/admin/add_product' element={<AddProducts/>}/>
        <Route path='/admin/edit-product/:id' element={<EditProducts/>}/>
        <Route path='/admin/query' element={<AdminQuery/>}/>
        <Route path='/admin/query-reply/:id' element={<Queryreply/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
