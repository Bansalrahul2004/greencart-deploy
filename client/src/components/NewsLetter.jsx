import React, { useState } from 'react'

const NewsLetter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className='mt-32 mb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-10 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 right-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl'></div>
      </div>

      {/* Main Container */}
      <div className='relative max-w-6xl mx-auto'>
        {/* Gradient Border Container */}
        <div className='relative p-1 rounded-3xl bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 shadow-2xl'>
          <div className='relative rounded-[22px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-16 lg:p-20 overflow-hidden'>
            
            {/* Background Decorative Elements */}
            <div className='absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl opacity-60 animate-pulse'></div>
            <div className='absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-3xl opacity-60 animate-pulse delay-1000'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>

            {/* Content */}
            <div className='relative z-10 text-center max-w-4xl mx-auto'>
              
              {/* Badge */}
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30 mb-8'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-sm font-semibold text-green-300'>Stay Updated</span>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300'></div>
              </div>

              {/* Title */}
              <div className='space-y-6 mb-12'>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                  <span className='bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent'>
                    Never Miss a
                  </span>
                  <br />
                  <span className='bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent'>
                    Fresh Deal!
                  </span>
                </h2>
                
                <p className='text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto'>
                  Get exclusive access to the freshest organic produce, limited-time offers, and insider tips delivered straight to your inbox. Join 10,000+ happy subscribers!
                </p>
              </div>

              {/* Success Message */}
              {isSubscribed && (
                <div className='mb-8 p-4 bg-green-500/20 backdrop-blur-sm rounded-2xl border border-green-400/30 animate-in slide-in-from-top-4 duration-500'>
                  <div className='flex items-center justify-center gap-3 text-green-300'>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span className='font-semibold'>Successfully subscribed! Welcome to the GreenCart family!</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto mb-8'>
                <div className='relative flex-1 w-full group'>
                  <input
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:ring-4 focus:ring-green-400/20 transition-all duration-300 group-hover:border-white/30"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  <div className='absolute right-4 top-1/2 -translate-y-1/2'>
                    <svg className='w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl cursor-pointer overflow-hidden"
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <span className='relative z-10 flex items-center justify-center gap-3'>
                    <span className='text-lg'>Subscribe Now</span>
                    <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </div>
                  </span>
                </button>
              </form>

              {/* Trust Indicators */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8'>
                <div className='flex items-center justify-center gap-3 text-gray-400'>
                  <div className='w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center'>
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <span className='text-sm font-medium'>100% Secure</span>
                </div>
                
                <div className='flex items-center justify-center gap-3 text-gray-400'>
                  <div className='w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center'>
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className='text-sm font-medium'>Weekly Updates</span>
                </div>
                
                <div className='flex items-center justify-center gap-3 text-gray-400'>
                  <div className='w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center'>
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"></path>
                    </svg>
                  </div>
                  <span className='text-sm font-medium'>Easy Unsubscribe</span>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className='text-center'>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  We respect your privacy. Unsubscribe at any time. No spam, just fresh deals and organic goodness!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsLetter