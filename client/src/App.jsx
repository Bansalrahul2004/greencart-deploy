import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
// Lazy load all route-based components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/Login'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const ProductCategory = lazy(() => import('./pages/ProductCategory'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const AddAddress = lazy(() => import('./pages/AddAddress'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const Profile = lazy(() => import('./pages/Profile'));
const SellerLogin = lazy(() => import('./components/seller/SellerLogin'));
const SellerLayout = lazy(() => import('./pages/seller/SellerLayout'));
const AddProduct = lazy(() => import('./pages/seller/AddProduct'));
const ProductList = lazy(() => import('./pages/seller/ProductList'));
const Orders = lazy(() => import('./pages/seller/Orders'));
const Analytics = lazy(() => import('./pages/seller/Analytics'));
const Reviews = lazy(() => import('./pages/seller/Reviews'));
const Loading = lazy(() => import('./components/Loading'));
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller} = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
     {isSellerPath ? null : <Navbar/>} 
     <Suspense fallback={<div>Loading...</div>}>
      {showUserLogin ? <Login/> : null}
     </Suspense>
     <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 pt-24"}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/products' element={<AllProducts/>} />
            <Route path='/products/:category' element={<ProductCategory/>} />
            <Route path='/products/:category/:id' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/add-address' element={<AddAddress/>} />
            <Route path='/my-orders' element={<MyOrders/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/loader' element={<Loading/>} />
            <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
              <Route index element={isSeller ? <AddProduct/> : null} />
              <Route path='analytics' element={<Analytics/>} />
              <Route path='product-list' element={<ProductList/>} />
              <Route path='orders' element={<Orders/>} />
              <Route path='reviews' element={<Reviews/>} />
            </Route>
          </Routes>
        </Suspense>
      </div>
     {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
