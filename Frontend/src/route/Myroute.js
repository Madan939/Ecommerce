import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Bills from '../pages/Bills'
import Items from '../pages/Items'
import Customers from '../pages/Customers'
import Cartlist from '../pages/Cartlist'
import AddItems from '../pages/AddItems'
import EditItem from '../components/EditItem'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Chargebill from '../pages/Chargebill'
export const Myroute = () => {
  
  return (
    <>
      <Routes>

        <Route path='/' element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path='/Bills' element={<ProtectedRoute><Bills /></ProtectedRoute>} />
        <Route path='/Customers' element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path='/Items' element={<ProtectedRoute><Items /></ProtectedRoute>} />
        <Route path='/Cartlist' element={<ProtectedRoute><Cartlist /></ProtectedRoute>} />
        <Route path='/AddItems' element={<ProtectedRoute><AddItems /></ProtectedRoute>} />
        <Route path='/Items/:_id' element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
        <Route path='/chargebill' element={<ProtectedRoute><Chargebill/></ProtectedRoute>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />


      </Routes>

    </>
  )
}
export function ProtectedRoute({ children }) {
  if (localStorage.getItem('User')) {
    return children
  }
  else {
    return <Navigate to="/Login" />
  }
}