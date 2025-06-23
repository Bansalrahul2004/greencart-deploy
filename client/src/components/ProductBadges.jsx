import React from 'react';

const ProductBadges = ({ product, className = "" }) => {
    // Calculate if product is on sale
    const isOnSale = product.price > product.offerPrice;
    const discountPercentage = isOnSale ? Math.round(((product.price - product.offerPrice) / product.price) * 100) : 0;
    
    // Determine if stock is limited (less than 10 items)
    const isLimitedStock = product.inStock && product.stockQuantity && product.stockQuantity < 10;
    
    // Determine if it's a new arrival (created within last 30 days)
    const isNewArrival = product.createdAt && (new Date() - new Date(product.createdAt)) < (30 * 24 * 60 * 60 * 1000);
    
    // Determine if it's popular (you can add a popularity field or calculate based on sales)
    const isPopular = product.popular || product.salesCount > 50; // Assuming you have these fields
    
    // Determine if it's featured
    const isFeatured = product.featured;
    
    // Determine if it's organic/eco-friendly
    const isEcoFriendly = product.green || product.ecoType;

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {/* Sale Badge */}
            {isOnSale && discountPercentage > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🏷️ {discountPercentage}% OFF
                </span>
            )}
            
            {/* Limited Stock Badge */}
            {isLimitedStock && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ⚡ Only {product.stockQuantity} Left!
                </span>
            )}
            
            {/* New Arrival Badge */}
            {isNewArrival && (
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🆕 New Arrival
                </span>
            )}
            
            {/* Popular Badge */}
            {isPopular && (
                <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Popular
                </span>
            )}
            
            {/* Featured Badge */}
            {isFeatured && (
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🌟 Featured
                </span>
            )}
            
            {/* Eco-Friendly Badge */}
            {isEcoFriendly && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🌱 Eco-Friendly
                </span>
            )}
            
            {/* Out of Stock Badge */}
            {!product.inStock && (
                <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ❌ Out of Stock
                </span>
            )}
            
            {/* Best Seller Badge */}
            {product.bestSeller && (
                <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🏆 Best Seller
                </span>
            )}
            
            {/* Free Shipping Badge */}
            {product.freeShipping && (
                <span className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🚚 Free Shipping
                </span>
            )}
        </div>
    );
};

export default ProductBadges; 