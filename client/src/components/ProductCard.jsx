import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import ProductBadges from "./ProductBadges";

const ProductCard = ({ product }) => {
    const { currency, formatPrice, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    const discountPercentage = Math.round(((product.price - product.offerPrice) / product.price) * 100);

    return product && (
        <div 
            onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0, 0); }}
            className="group relative bg-white border border-gray-200/80 rounded-3xl p-5 transition-all duration-300 hover:shadow-glow-strong hover:-translate-y-2"
        >
            <div className="relative mb-5">
                {/* Image Container */}
                <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-2xl h-56 overflow-hidden">
                    <img className="group-hover:scale-110 transition-transform duration-500 ease-in-out max-h-48 object-contain" src={product.image[0]} alt={product.name} />
                </div>

                {/* Smart Badges */}
                <div className="absolute top-4 left-4 z-10">
                    <ProductBadges product={product} />
                </div>

                {/* Quick Add to Cart Button */}
                <div 
                    onClick={(e) => { e.stopPropagation(); addToCart(product._id); }} 
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-white shadow-soft hover:scale-110 z-10"
                >
                    <img src={assets.add_icon} alt="Add to Cart" className="w-6 h-6" />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <p className="text-sm text-gray-500 font-medium">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-800 h-14 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className="w-4 h-4" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(134)</span>
                </div>

                {/* Price and Add/Remove buttons */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-primary">{formatPrice(product.offerPrice)}</p>
                        {product.price > product.offerPrice && (
                            <p className="text-md text-gray-400 line-through">{formatPrice(product.price)}</p>
                        )}
                    </div>
                    
                    <div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button 
                                className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.add_icon} alt="Add" className="w-5 h-5"/>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 h-10 bg-primary/10 border border-primary/20 rounded-full px-2 select-none">
                                <button onClick={() => removeFromCart(product._id)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary/20 cursor-pointer text-lg font-bold">
                                    -
                                </button>
                                <span className="w-6 text-center font-semibold">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary/20 cursor-pointer text-lg font-bold">
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;