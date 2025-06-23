import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const {isSeller, setIsSeller, navigate, axios} = useAppContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        try {
            const {data} = await axios.post('/api/seller/login', {email, password})
            if(data.success){
                setIsSeller(true)
                navigate('/seller')
                toast.success('Welcome back, Admin!')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        if(isSeller){
            navigate("/seller")
        }
    },[isSeller])

  return !isSeller && (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50 p-4 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-20 w-40 h-40 bg-green-400/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl'></div>
      </div>

      {/* Login Container */}
      <div className='relative w-full max-w-md'>
        {/* Gradient Border Container */}
        <div className='relative p-1 rounded-3xl bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 shadow-2xl'>
          <div className='relative rounded-[22px] bg-white/95 backdrop-blur-xl p-8 shadow-xl border border-white/20'>
            
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50 mb-6'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-semibold text-green-700'>Admin Access</span>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300'></div>
              </div>
              
              <h2 className='text-3xl font-bold mb-2'>
                <span className='bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent'>
                  Seller
                </span>
                <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                  {' '}Login
                </span>
              </h2>
              <p className='text-gray-600 text-sm'>Access your seller dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              <div className='group'>
                <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-green-600 transition-colors duration-300'>
                  Email Address
                </label>
                <div className='relative'>
                  <input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email}
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-gray-400"
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
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-gray-400"
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
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                    Signing In...
                  </div>
                ) : (
                  <span className='relative z-10'>Sign In to Dashboard</span>
                )}
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </form>

            {/* Footer */}
            <div className='mt-8 text-center'>
              <div className='flex items-center justify-center gap-6 text-xs text-gray-500'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span>Secure Access</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-emerald-500 rounded-full'></div>
                  <span>Admin Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerLogin
