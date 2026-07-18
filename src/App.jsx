import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import Features from './pages/admin-view/features'
import Orders from './pages/admin-view/Orders'
import Products from './pages/admin-view/Products'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/Account'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingListing from './pages/shopping-view/Listing'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/unauth-page/Index'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from '../store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
const App = () => {
  const {isAuthenticated,user,isLoading} = useSelector(state=> state.auth)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])
  if(isLoading) return <Skeleton className='w-[800] bg-gray-400 h-[600px]'/>
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>}>
            <Route path='login' element={<AuthLogin/>}/>
            <Route path='register' element={<AuthRegister/>}/>
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>}>
            <Route path='dashboard' element={<Dashboard/>}></Route>
            <Route path='features' element={<Features/>} ></Route>
            <Route path='orders' element={<Orders/>} ></Route> 
            <Route path='products' element={<Products/>} ></Route>
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome/>} ></Route>
            <Route path='listing' element={<ShoppingListing/>}></Route>
            <Route path='account' element={<ShoppingAccount/>}></Route>
            <Route path='checkout' element={<ShoppingCheckout/>}></Route>
        </Route>
        <Route path='/unauth-page' element={<UnauthPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App