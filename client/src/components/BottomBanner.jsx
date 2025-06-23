import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24 overflow-hidden'>
      {/* Background with enhanced gradient overlay */}
      <div className="relative">
        <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block object-cover'/>
        <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full md:hidden object-cover'/>
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        {/* Additional gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-green-500/10"></div>
      </div>

      {/* Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 px-6 md:px-0'>
        <div className="max-w-md md:max-w-lg">
          {/* Enhanced Header */}
          <div className="text-center md:text-right mb-10">
            <div className="flex items-center justify-center md:justify-end gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-green-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h1 className='text-4xl md:text-5xl font-black text-white leading-tight'>
                  Why Choose <span className="bg-gradient-to-r from-primary via-green-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">GreenCart?</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-green-500 rounded-full mt-2 mx-auto md:ml-auto"></div>
              </div>
            </div>
            <p className="text-gray-200 text-xl leading-relaxed font-medium">
              Experience the future of grocery shopping with our premium delivery service
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="space-y-5">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-5 hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className='flex items-center gap-5 relative z-10'>
                  {/* Enhanced Icon Container */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-green-500/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <img 
                        src={feature.icon} 
                        alt={feature.title} 
                        className='w-7 h-7 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg' 
                      />
                    </div>
                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-green-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="flex-1">
                    <h3 className='text-xl md:text-2xl font-black text-white mb-2 group-hover:text-primary transition-all duration-300'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-medium'>
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Enhanced Arrow indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <div className="mt-10 text-center md:text-right">
            <button className="group relative bg-gradient-to-r from-primary via-green-500 to-emerald-500 hover:from-primary-dull hover:via-green-600 hover:to-emerald-600 text-white font-black py-4 px-10 rounded-3xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center justify-center md:justify-end gap-4 mx-auto md:mx-0 overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 text-lg">Start Shopping Now</span>
              <div className="relative z-10 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements - Fixed positioning */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating circles with safe positioning */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-primary to-green-400 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse delay-1000 shadow-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse delay-500 shadow-lg"></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse delay-1500 shadow-lg"></div>
        
        {/* Enhanced floating icons - Safe positioning */}
        <div className="absolute top-1/2 left-8 opacity-30 animate-bounce">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 right-12 opacity-30 animate-bounce delay-1000">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Additional decorative elements with safe positioning */}
        <div className="absolute top-1/4 right-1/4 opacity-30 animate-spin">
          <div className="w-12 h-12 border-2 border-white/50 rounded-full"></div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 opacity-30 animate-spin delay-1000">
          <div className="w-16 h-16 border-2 border-primary/50 rounded-full"></div>
        </div>

        {/* More visible particle effects - Safe positioning */}
        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-500 shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping delay-1000 shadow-lg"></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping delay-1500 shadow-lg"></div>
        
        {/* Additional floating elements - Safe positioning */}
        <div className="absolute top-1/6 right-1/6 w-4 h-4 bg-purple-400/60 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/6 right-1/6 w-5 h-5 bg-pink-400/60 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-3/4 left-1/6 w-3 h-3 bg-cyan-400/60 rounded-full animate-pulse delay-900"></div>
        
        {/* Floating stars - Safe positioning */}
        <div className="absolute top-1/5 left-1/5 opacity-40 animate-pulse">
          <div className="w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBanner
