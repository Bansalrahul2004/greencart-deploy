import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Login = () => {
    const {setShowUserLogin, axios, setUser} = useAppContext()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await axios.post(`/api/user/${isLogin ? 'login' : 'register'}`, formData)
            if(data.success){
                toast.success(data.message)
                setUser(data.user)
                setShowUserLogin(false)
                setFormData({name: '', email: '', password: ''})
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

  return (
    <div className='fixed inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
        {/* Background Pattern */}
        <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl'></div>
        </div>

        {/* Login Container */}
        <div className='relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-md mx-auto overflow-hidden'>
            {/* Header with Gradient */}
            <div className='relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-8 text-white'>
                <div className='absolute inset-0 bg-black/10'></div>
                <div className='relative flex items-center justify-between'>
                    <div>
                        <h2 className='text-3xl font-bold mb-2'>{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
                        <p className='text-green-100 text-sm'>
                            {isLogin ? 'Sign in to your account to continue' : 'Create your account to get started'}
                        </p>
                    </div>
                    <button 
                        onClick={() => setShowUserLogin(false)} 
                        className='p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110'
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className='p-8'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    {!isLogin && (
                        <div className='group'>
                            <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors duration-300'>
                                Full Name
                            </label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-gray-400'
                                    placeholder='Enter your full name'
                                    required
                                />
                                <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                            </div>
                        </div>
                    )}
                    
                    <div className='group'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors duration-300'>
                            Email Address
                        </label>
                        <div className='relative'>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-gray-400'
                                placeholder='Enter your email'
                                required
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                        </div>
                    </div>
                    
                    <div className='group'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors duration-300'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full px-4 py-3 pr-12 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-gray-400'
                                placeholder='Enter your password'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300'
                            >
                                {showPassword ? (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                                    </svg>
                                ) : (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                    </svg>
                                )}
                            </button>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                        </div>
                    </div>
                    
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                    >
                        {isLoading ? (
                            <div className='flex items-center justify-center'>
                                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                                {isLogin ? 'Signing In...' : 'Creating Account...'}
                            </div>
                        ) : (
                            <span className='relative z-10'>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        )}
                        <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
                    </button>
                </form>

                {/* Toggle Section */}
                <div className='mt-8 text-center'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-200'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-white text-gray-500 font-medium'>
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                            </span>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setFormData({name: '', email: '', password: ''})
                        }}
                        className='mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
                    >
                        {isLogin ? 'Create New Account' : 'Sign In Instead'}
                        <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </button>
                </div>

                {/* Features */}
                <div className='mt-8 grid grid-cols-3 gap-4 text-center'>
                    <div className='p-3 rounded-xl bg-green-50/50'>
                        <div className='w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center'>
                            <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        </div>
                        <p className='text-xs font-medium text-gray-600'>Secure</p>
                    </div>
                    <div className='p-3 rounded-xl bg-blue-50/50'>
                        <div className='w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center'>
                            <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                            </svg>
                        </div>
                        <p className='text-xs font-medium text-gray-600'>Fast</p>
                    </div>
                    <div className='p-3 rounded-xl bg-purple-50/50'>
                        <div className='w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center'>
                            <svg className='w-4 h-4 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                            </svg>
                        </div>
                        <p className='text-xs font-medium text-gray-600'>Trusted</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
