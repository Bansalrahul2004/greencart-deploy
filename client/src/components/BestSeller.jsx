import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const BestSeller = () => {
    const { products } = useAppContext();
    
    // Filter and sort products to prioritize those with smart badges
    const getFeaturedProducts = () => {
        const inStockProducts = products.filter(product => product.inStock);
        
        // First priority: Featured products
        const featuredProducts = inStockProducts.filter(product => product.featured);
        
        // Second priority: Best sellers
        const bestSellers = inStockProducts.filter(product => product.bestSeller && !product.featured);
        
        // Third priority: Popular products
        const popularProducts = inStockProducts.filter(product => product.popular && !product.featured && !product.bestSeller);
        
        // Fourth priority: Products with any smart badges
        const productsWithBadges = inStockProducts.filter(product => 
            (product.featured || product.bestSeller || product.popular || product.green || product.freeShipping) &&
            !featuredProducts.includes(product) &&
            !bestSellers.includes(product) &&
            !popularProducts.includes(product)
        );
        
        // Combine all categories and take first 8
        const allFeatured = [...featuredProducts, ...bestSellers, ...popularProducts, ...productsWithBadges];
        
        // If we don't have enough products with badges, fill with regular products
        if (allFeatured.length < 8) {
            const regularProducts = inStockProducts.filter(product => 
                !allFeatured.includes(product)
            );
            allFeatured.push(...regularProducts.slice(0, 8 - allFeatured.length));
        }
        
        return allFeatured.slice(0, 8);
    };
    
    return (
        <section className='relative mt-32 mb-20 px-4 sm:px-6 lg:px-8 overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 right-20 w-40 h-40 bg-green-400/5 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-20 left-20 w-60 h-60 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/3 rounded-full blur-3xl'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10'>
                <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50 mb-6'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm font-semibold text-green-700'>Smart Badges</span>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300'></div>
                </div>
                
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
                    <span className='bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 bg-clip-text text-transparent'>
                        Our Best
                    </span>
                    <br />
                    <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                        Sellers
                    </span>
                </h2>
                
                <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8'>
                    Discover products with smart badges - Featured, Best Sellers, Popular, and Eco-Friendly items.
                </p>

                {/* Stats */}
                <div className='flex items-center justify-center gap-8 mb-12'>
                    <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>4.9★</div>
                        <div className='text-sm text-gray-500'>Average Rating</div>
                    </div>
                    <div className='w-px h-8 bg-gray-300'></div>
                    <div className='text-center'>
                        <div className='text-2xl font-bold text-emerald-600'>10K+</div>
                        <div className='text-sm text-gray-500'>Happy Customers</div>
                    </div>
                    <div className='w-px h-8 bg-gray-300'></div>
                    <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>24/7</div>
                        <div className='text-sm text-gray-500'>Fresh Delivery</div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className='relative z-10'>
                {/* Products Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12'>
                    {getFeaturedProducts().map((product, index) => (
                        <div 
                            key={index} 
                            className='animate-in slide-in-from-bottom-4 duration-500'
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className='text-center'>
                    <Link 
                        to="/products" 
                        className='group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl'
                    >
                        <span className='text-lg'>View All Products</span>
                        <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Floating Elements */}
            <div className='absolute top-1/4 right-8 md:right-16 lg:right-24 animate-bounce delay-1000'>
                <div className='w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center shadow-lg'>
                    <svg className='w-8 h-8 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' />
                    </svg>
                </div>
            </div>

            <div className='absolute bottom-1/4 right-12 md:right-20 lg:right-28 animate-bounce delay-500'>
                <div className='w-12 h-12 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30 flex items-center justify-center shadow-lg'>
                    <svg className='w-6 h-6 text-emerald-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full'></div>
        </section>
    )
}

export default BestSeller
