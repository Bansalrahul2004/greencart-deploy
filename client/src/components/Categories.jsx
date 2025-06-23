import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {

    const {navigate} = useAppContext()

  return (
    <section className='mt-24 mb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-green-400/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/3 rounded-full blur-3xl'></div>
      </div>

      {/* Header Section */}
      <div className='text-center mb-16 relative z-10'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50 mb-6'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
          <span className='text-sm font-semibold text-green-700'>Shop by Category</span>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300'></div>
        </div>
        
        <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 bg-clip-text text-transparent mb-6 leading-tight'>
          Explore Our
          <br />
          <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
            Fresh Categories
          </span>
        </h2>
        
        <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
          Your one-stop destination for sustainable, organic living — fresh, local, and made with care.
        </p>
      </div>

      {/* Categories Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 max-w-7xl mx-auto relative z-10'>
        {categories.map((category, index) => (
          <div 
            key={index} 
            className='group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'
            style={{
              background: `linear-gradient(135deg, ${category.bgColor} 0%, ${category.bgColor}dd 100%)`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0)
            }}
          >
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500'>
              <div className='absolute top-4 right-4 w-12 h-12 rounded-full bg-white/30'></div>
              <div className='absolute bottom-6 left-6 w-8 h-8 rounded-full bg-white/40'></div>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20'></div>
            </div>

            {/* Hover Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            {/* Content */}
            <div className='relative p-6 flex flex-col items-center justify-center min-h-[180px] text-center'>
              {/* Image Container */}
              <div className='relative mb-5 group-hover:transform group-hover:scale-110 transition-transform duration-500'>
                <div className='w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-4 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500'>
                  <img 
                    src={category.image} 
                    alt={category.text} 
                    className='w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-500'
                  />
                </div>
                {/* Animated Ring Effect */}
                <div className='absolute inset-0 rounded-2xl border-2 border-white/40 scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                <div className='absolute inset-0 rounded-2xl border border-white/20 scale-0 group-hover:scale-110 transition-transform duration-700 delay-100'></div>
              </div>

              {/* Category Name */}
              <h3 className='font-bold text-gray-800 text-sm md:text-base leading-tight group-hover:text-gray-900 transition-colors duration-300 mb-2'>
                {category.text}
              </h3>

              {/* Category Description */}
              <p className='text-xs text-gray-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                Fresh & Organic
              </p>

              {/* Hover Arrow */}
              <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                <div className='w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg'>
                  <svg className='w-4 h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>

              {/* Corner Badge */}
              <div className='absolute top-3 left-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-200'>
                <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
                  <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div className='text-center mt-16 relative z-10'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-200'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-6 bg-white text-gray-500 font-medium'>
              Can't find what you're looking for?
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/products')}
          className='mt-8 inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl group'
        >
          <span className='text-lg'>View All Products</span>
          <div className='ml-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </button>

        {/* Stats */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green-600 mb-2'>50+</div>
            <div className='text-sm text-gray-600'>Categories</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-emerald-600 mb-2'>1000+</div>
            <div className='text-sm text-gray-600'>Products</div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green-600 mb-2'>24/7</div>
            <div className='text-sm text-gray-600'>Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Categories
