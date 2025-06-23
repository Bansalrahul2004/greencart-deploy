import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// Enhanced Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address, icon, required = true }) => (
    <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
        </div>
        <input 
            className={`w-full pl-12 pr-4 py-4 border-2 border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl outline-none text-gray-700 font-medium transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/20 group-hover:border-gray-300 ${required && !address[name] ? 'border-red-200 focus:border-red-400' : ''}`}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required={required}
        />
        {required && !address[name] && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
        )}
    </div>
)

const AddAddress = () => {
    const { axios, user, navigate, formatPrice } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
        const missingFields = requiredFields.filter(field => !address[field]);
        
        if (missingFields.length > 0) {
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post('/api/address/add', { address });

            if (data.success) {
                toast.success(data.message)
                navigate('/cart')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/cart')
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden pt-20 pb-10">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary to-green-600 bg-clip-text text-transparent">
                                Add Shipping Address
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">Complete your delivery information</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Form Section */}
                    <div className="flex-1 max-w-2xl mx-auto w-full">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 md:p-10">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                                <p className="text-gray-600">Please provide your complete delivery details</p>
                            </div>

                            <form onSubmit={onSubmitHandler} className="space-y-6">
                                {/* Personal Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Personal Details
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField 
                                            handleChange={handleChange} 
                                            address={address} 
                                            name='firstName' 
                                            type="text" 
                                            placeholder="First Name"
                                            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>}
                                        />
                                        <InputField 
                                            handleChange={handleChange} 
                                            address={address} 
                                            name='lastName' 
                                            type="text" 
                                            placeholder="Last Name"
                                            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>}
                                        />
                                    </div>

                                    <InputField 
                                        handleChange={handleChange} 
                                        address={address} 
                                        name='email' 
                                        type="email" 
                                        placeholder="Email Address"
                                        icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>}
                                    />

                                    <InputField 
                                        handleChange={handleChange} 
                                        address={address} 
                                        name='phone' 
                                        type="tel" 
                                        placeholder="Phone Number"
                                        icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>}
                                    />
                                </div>

                                {/* Address Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Address Details
                                    </h3>

                                    <InputField 
                                        handleChange={handleChange} 
                                        address={address} 
                                        name='street' 
                                        type="text" 
                                        placeholder="Street Address"
                                        icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField 
                                            handleChange={handleChange} 
                                            address={address} 
                                            name='city' 
                                            type="text" 
                                            placeholder="City"
                                            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>}
                                        />
                                        <InputField 
                                            handleChange={handleChange} 
                                            address={address} 
                                            name='state' 
                                            type="text" 
                                            placeholder="State/Province"
                                            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField 
                                            handleChange={handleChange} 
                                            address={address} 
                                            name='zipcode' 
                                            type="text" 
                                            placeholder="ZIP/Postal Code"
                                            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>}
                                        />
                                        <InputField 
                                            handleChange={handleChange} 
                                            address={address} 
                                            name='country' 
                                            type="text" 
                                            placeholder="Country"
                                            icon={<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button 
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                                            isLoading 
                                                ? 'bg-gray-300 cursor-not-allowed' 
                                                : 'bg-gradient-to-r from-primary via-green-500 to-emerald-500 hover:from-primary-dull hover:via-green-600 hover:to-emerald-600 shadow-xl hover:shadow-2xl'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Saving Address...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-3">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Save Address
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Visual Section */}
                    <div className="lg:w-96 flex flex-col items-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Provide your complete shipping address to ensure accurate and timely delivery of your orders.
                            </p>
                            
                            <div className="space-y-3 text-left">
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Fast & Secure Delivery</span>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Privacy Protected</span>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Quick Setup</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress
