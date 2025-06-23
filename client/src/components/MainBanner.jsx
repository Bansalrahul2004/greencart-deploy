import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <section className='relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden'>
      {/* Background Images */}
      <div className='absolute inset-0'>
        <img 
          src={assets.main_banner_bg} 
          alt="banner" 
          className='w-full h-full object-cover hidden md:block'
        />
        <img 
          src={assets.main_banner_bg_sm} 
          alt="banner" 
          className='w-full h-full object-cover md:hidden'
        />
        
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent md:from-black/30 md:via-black/10 md:to-transparent'></div>
        
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-20 right-20 w-32 h-32 bg-green-400/10 rounded-full blur-2xl animate-pulse'></div>
          <div className='absolute bottom-20 left-20 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl animate-pulse delay-1000'></div>
          <div className='absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500'></div>
        </div>
      </div>

      {/* Content Container */}
      <div className='relative z-10 flex flex-col items-center md:items-start justify-center h-full px-4 md:pl-16 lg:pl-24 xl:pl-32'>
        
        {/* Badge */}
        <div className='mb-6 animate-in slide-in-from-top-4 duration-700'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-sm font-semibold text-gray-700'>Fresh & Organic</span>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300'></div>
          </div>
        </div>

        {/* Main Heading */}
        <div className='text-center md:text-left max-w-4xl animate-in slide-in-from-bottom-4 duration-700 delay-200'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6'>
            <span className='bg-gradient-to-r from-white via-green-50 to-white bg-clip-text text-transparent'>
              Freshness You Can
            </span>
            <br />
            <span className='bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent'>
              Trust, Savings You'll Love!
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8'>
            Discover farm-fresh organic produce, premium groceries, and unbeatable deals delivered right to your doorstep in under 30 minutes.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row items-center gap-4 md:gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-400'>
          {/* Primary CTA */}
          <Link 
            to="/products" 
            className='group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='relative flex items-center gap-3'>
              <span className='text-lg'>Shop Now</span>
              <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </div>
          </Link>

          {/* Secondary CTA */}
          <Link 
            to="/products" 
            className='group flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg border border-white/20'
          >
            <span className='text-lg'>Explore Deals</span>
            <div className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl animate-in slide-in-from-bottom-4 duration-700 delay-600'>
          <div className='flex items-center gap-3 text-white/90'>
            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-white'>Fast Delivery</p>
              <p className='text-sm text-white/70'>Under 30 minutes</p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 text-white/90'>
            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-white'>Fresh Guarantee</p>
              <p className='text-sm text-white/70'>100% organic</p>
            </div>
          </div>
          
          <div className='flex items-center gap-3 text-white/90'>
            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
              </svg>
            </div>
            <div>
              <p className='font-semibold text-white'>Best Prices</p>
              <p className='text-sm text-white/70'>Unbeatable deals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='absolute top-1/4 right-8 md:right-16 lg:right-24 animate-bounce delay-1000'>
        <div className='w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center'>
          <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
          </svg>
        </div>
      </div>

      <div className='absolute bottom-1/4 right-12 md:right-20 lg:right-28 animate-bounce delay-500'>
        <div className='w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30 flex items-center justify-center'>
          <svg className='w-6 h-6 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default MainBanner
