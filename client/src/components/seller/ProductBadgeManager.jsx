import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductBadgeManager = ({ product, onUpdate }) => {
    const { axios } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    
    // Local state for badge settings
    const [badgeSettings, setBadgeSettings] = useState({
        stockQuantity: product.stockQuantity || 100,
        featured: product.featured || false,
        bestSeller: product.bestSeller || false,
        popular: product.popular || false,
        green: product.green || false,
        ecoType: product.ecoType || '',
        freeShipping: product.freeShipping || false
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSave = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put(`/api/product/badges/${product._id}`, badgeSettings);
            
            if (data.success) {
                toast.success('Badge settings updated successfully!');
                onUpdate(); // Refresh product list
                setIsOpen(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update badge settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
                🏷️ Manage Badges
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20">
                    <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setIsOpen(false)}></div>
                    <div className="relative bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800">Smart Badge Settings</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={badgeSettings.stockQuantity}
                                    onChange={(e) => setBadgeSettings({
                                        ...badgeSettings,
                                        stockQuantity: parseInt(e.target.value)
                                    })}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={badgeSettings.featured}
                                        onChange={(e) => setBadgeSettings({
                                            ...badgeSettings,
                                            featured: e.target.checked
                                        })}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Featured</span>
                                </label>

                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={badgeSettings.bestSeller}
                                        onChange={(e) => setBadgeSettings({
                                            ...badgeSettings,
                                            bestSeller: e.target.checked
                                        })}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Best Seller</span>
                                </label>

                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={badgeSettings.popular}
                                        onChange={(e) => setBadgeSettings({
                                            ...badgeSettings,
                                            popular: e.target.checked
                                        })}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Popular</span>
                                </label>

                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={badgeSettings.green}
                                        onChange={(e) => setBadgeSettings({
                                            ...badgeSettings,
                                            green: e.target.checked
                                        })}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Eco-Friendly</span>
                                </label>

                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={badgeSettings.freeShipping}
                                        onChange={(e) => setBadgeSettings({
                                            ...badgeSettings,
                                            freeShipping: e.target.checked
                                        })}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Free Shipping</span>
                                </label>
                            </div>

                            {badgeSettings.green && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Eco Type</label>
                                    <select
                                        value={badgeSettings.ecoType}
                                        onChange={(e) => setBadgeSettings({
                                            ...badgeSettings,
                                            ecoType: e.target.value
                                        })}
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Eco Type</option>
                                        <option value="organic">Organic</option>
                                        <option value="local">Local</option>
                                        <option value="sustainable">Sustainable</option>
                                        <option value="recycled">Recycled</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductBadgeManager; 