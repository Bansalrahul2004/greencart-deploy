import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
    const {products, currency, formatPrice, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount, axios, user, setCartItems, addToCart} = useAppContext()
    const [cartArray, setCartArray] = useState([])
    const [addresses, setAddresses] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState("COD")
    const [isLoading, setIsLoading] = useState(false)

    const getCart = ()=>{
        let tempArray = []
        for(const key in cartItems){
            const product = products.find((item)=>item._id === key)
            if(product) {
                product.quantity = cartItems[key]
                tempArray.push(product)
            }
        }
        setCartArray(tempArray)
    }

    const getUserAddress = async ()=>{
        try {
            const {data} = await axios.get('/api/address/get');
            if (data.success){
                setAddresses(data.addresses)
                if(data.addresses.length > 0){
                    setSelectedAddress(data.addresses[0])
                }
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const placeOrder = async ()=>{
        try {
            if(!selectedAddress){
                return toast.error("Please select an address")
            }

            setIsLoading(true)

            // Place Order with COD
            if(paymentOption === "COD"){
                const {data} = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id
                })

                if(data.success){
                    toast.success(data.message)
                    setCartItems({})
                    navigate('/my-orders')
                }else{
                    toast.error(data.message)
                }
            }else{
                // Place Order with Stripe
                const {data} = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id
                })

                if(data.success){
                    window.location.replace(data.url)
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId)
        } else {
            updateCartItem(productId, newQuantity)
        }
    }

    const cleanupInvalidCartItems = () => {
        if (products.length > 0 && cartItems) {
            const validCartItems = {}
            for (const key in cartItems) {
                const product = products.find((item) => item._id === key)
                if (product) {
                    validCartItems[key] = cartItems[key]
                }
            }
            if (Object.keys(validCartItems).length !== Object.keys(cartItems).length) {
                setCartItems(validCartItems)
                toast.success("Invalid items removed from cart")
            }
        }
    }

    useEffect(()=>{
        if(products.length > 0 && cartItems){
            cleanupInvalidCartItems()
            getCart()
        }
    },[products, cartItems])

    useEffect(()=>{
        if(user){
            getUserAddress()
        }
    },[user])

    const totalAmount = getCartAmount()
    const taxAmount = totalAmount * 0.02
    const finalAmount = totalAmount + taxAmount
    
    // Show loading state while products are being fetched
    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your cart...</p>
                </div>
            </div>
        )
    }
    
    return products.length > 0 && cartItems && Object.keys(cartItems).length > 0 && cartArray.length > 0 ? (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Enhanced Header */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between">
                            <div className="relative">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                            </svg>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                            <span className="text-white text-xs font-bold">{getCartCount()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary to-green-600 bg-clip-text text-transparent mb-2">
                                            Shopping Cart
                                        </h1>
                                        <p className="text-gray-600 flex items-center gap-3 text-lg">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} ready to checkout
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={()=> {navigate("/products"); scrollTo(0,0)}} 
                                className="group hidden lg:flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl text-gray-700 font-semibold hover:bg-white hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Continue Shopping
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-8">
                        {/* Enhanced Cart Items */}
                        <div className="flex-1">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                                {/* Enhanced Cart Items Header */}
                                <div className="px-8 py-6 bg-gradient-to-r from-gray-50 via-green-50/50 to-emerald-50/50 border-b border-gray-100/50">
                                    <div className="grid grid-cols-12 gap-6 text-sm font-bold text-gray-700">
                                        <div className="col-span-6 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            Product Details
                                        </div>
                                        <div className="col-span-2 text-center flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                            Price
                                        </div>
                                        <div className="col-span-2 text-center flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                            </svg>
                                            Quantity
                                        </div>
                                        <div className="col-span-2 text-center flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            Total
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Cart Items */}
                                <div className="divide-y divide-gray-100/50">
                                    {cartArray.map((product, index) => (
                                        <div key={index} className="p-8 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-green-50/30 transition-all duration-300 group">
                                            <div className="grid grid-cols-12 gap-6 items-center">
                                                {/* Enhanced Product Info */}
                                                <div className="col-span-6">
                                                    <div className="flex items-center gap-6">
                                                        <div 
                                                            onClick={()=>{
                                                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); 
                                                                scrollTo(0,0)
                                                            }} 
                                                            className="relative group cursor-pointer w-24 h-24 bg-gradient-to-br from-gray-100 via-green-50 to-emerald-50 rounded-2xl overflow-hidden flex items-center justify-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                                                        >
                                                            <img 
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                                src={product.image[0]} 
                                                                alt={product.name} 
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-bold text-gray-900 text-lg truncate hover:text-primary transition-colors cursor-pointer group-hover:scale-105 transform transition-transform duration-200" 
                                                                onClick={()=>{
                                                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`); 
                                                                    scrollTo(0,0)
                                                                }}>
                                                                {product.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-green-500/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                                                                    {product.category}
                                                                </span>
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                    {product.weight || "N/A"}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1 mt-2">
                                                                {Array(5).fill('').map((_, i) => (
                                                                    <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                                <span className="text-xs text-gray-500 ml-1">(4.2)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Enhanced Price */}
                                                <div className="col-span-2 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="font-bold text-primary text-xl">
                                                            {formatPrice(product.offerPrice)}
                                                        </span>
                                                        {product.price > product.offerPrice && (
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <span className="text-sm text-gray-400 line-through">
                                                                    {formatPrice(product.price)}
                                                                </span>
                                                                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                                                    {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Enhanced Quantity */}
                                                <div className="col-span-2">
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex items-center bg-gradient-to-r from-gray-50 to-green-50/50 rounded-xl border border-gray-200/50 shadow-sm">
                                                            <button 
                                                                onClick={() => handleQuantityChange(product._id, cartItems[product._id] - 1)}
                                                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/10 rounded-l-xl transition-all duration-200 hover:scale-105"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                </svg>
                                                            </button>
                                                            <span className="px-4 py-2 text-lg font-bold text-gray-900 min-w-[3rem] text-center bg-white/50">
                                                                {cartItems[product._id]}
                                                            </span>
                                                            <button 
                                                                onClick={() => handleQuantityChange(product._id, cartItems[product._id] + 1)}
                                                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/10 rounded-r-xl transition-all duration-200 hover:scale-105"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Enhanced Total */}
                                                <div className="col-span-2 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="font-bold text-gray-900 text-xl bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                                                            {formatPrice(product.offerPrice * product.quantity)}
                                                        </span>
                                                        <button 
                                                            onClick={()=> removeFromCart(product._id)} 
                                                            className="mt-3 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 group"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Enhanced Continue Shopping Button - Mobile */}
                                <div className="p-8 border-t border-gray-100/50 lg:hidden">
                                    <button 
                                        onClick={()=> {navigate("/products"); scrollTo(0,0)}} 
                                        className="w-full group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-50 to-green-50/50 border border-gray-200/50 rounded-2xl text-gray-700 font-semibold hover:bg-white hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Order Summary */}
                        <div className="xl:w-96">
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 sticky top-24">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                                        Order Summary
                                    </h2>
                                </div>

                                {/* Enhanced Delivery Address */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Delivery Address
                                        </h3>
                                        <button 
                                            onClick={() => setShowAddress(!showAddress)} 
                                            className="text-primary hover:text-primary-dull text-sm font-semibold transition-colors flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Change
                                        </button>
                                    </div>
                                    
                                    <div className="relative">
                                        <div className="p-6 bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30 rounded-2xl border border-gray-200/50 shadow-sm">
                                            {selectedAddress ? (
                                                <div className="text-sm text-gray-600">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <p className="font-bold text-gray-900">
                                                            {selectedAddress.firstName} {selectedAddress.lastName}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {selectedAddress.street}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            {selectedAddress.city}, {selectedAddress.state}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            {selectedAddress.phone}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                    </svg>
                                                    <p className="text-sm">No address found</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Enhanced Address Dropdown */}
                                        {showAddress && (
                                            <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-2xl z-10 max-h-60 overflow-y-auto">
                                                {addresses.map((address, index) => (
                                                    <div 
                                                        key={index}
                                                        onClick={() => {setSelectedAddress(address); setShowAddress(false)}} 
                                                        className="p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50/30 cursor-pointer border-b border-gray-100/50 last:border-b-0 transition-all duration-200"
                                                    >
                                                        <p className="text-sm text-gray-600 font-medium">
                                                            {address.street}, {address.city}, {address.state}
                                                        </p>
                                                    </div>
                                                ))}
                                                <div 
                                                    onClick={() => navigate("/add-address")} 
                                                    className="p-4 text-primary text-center cursor-pointer hover:bg-primary/10 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add New Address
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Enhanced Payment Method */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Payment Method
                                    </h3>
                                    <select 
                                        onChange={e => setPaymentOption(e.target.value)} 
                                        className="w-full px-6 py-4 border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl outline-none focus:border-primary transition-all duration-300 text-gray-700 font-medium shadow-sm hover:shadow-md"
                                    >
                                        <option value="COD">💳 Cash On Delivery</option>
                                        <option value="Online">💳 Online Payment (Stripe)</option>
                                    </select>
                                </div>

                                {/* Enhanced Price Breakdown */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100/50">
                                        <span className="text-gray-600 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Subtotal ({getCartCount()} items)
                                        </span>
                                        <span className="font-bold text-gray-900">{formatPrice(totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100/50">
                                        <span className="text-gray-600 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Shipping
                                        </span>
                                        <span className="text-green-600 font-bold">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100/50">
                                        <span className="text-gray-600 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            Tax (2%)
                                        </span>
                                        <span className="font-bold text-gray-900">{formatPrice(taxAmount)}</span>
                                    </div>
                                    <div className="pt-4">
                                        <div className="flex justify-between items-center text-2xl font-bold">
                                            <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">Total</span>
                                            <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                                                {formatPrice(finalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Place Order Button */}
                                <button 
                                    onClick={placeOrder} 
                                    disabled={isLoading || !selectedAddress}
                                    className={`w-full py-5 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                                        isLoading || !selectedAddress 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-primary via-green-500 to-emerald-500 hover:from-primary-dull hover:via-green-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl'
                                    }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing Order...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                                        </div>
                                    )}
                                </button>

                                {/* Enhanced Security Note */}
                                <div className="mt-6 text-center">
                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50/50 rounded-xl py-3 px-4">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium">Secure checkout with SSL encryption</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        // Enhanced Empty Cart State
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative text-center max-w-md mx-auto px-4">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 via-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/50">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary to-green-600 bg-clip-text text-transparent mb-4">
                    Your cart is empty
                </h2>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    Looks like you haven't added any items to your cart yet. 
                    <br />
                    <span className="text-primary font-semibold">Start exploring our fresh products!</span>
                </p>
                <button 
                    onClick={() => {navigate("/products"); scrollTo(0,0)}} 
                    className="group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-primary via-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:from-primary-dull hover:via-green-600 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mx-auto text-lg"
                >
                    <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Start Shopping Now
                </button>
            </div>
        </div>
    )
}

export default Cart;