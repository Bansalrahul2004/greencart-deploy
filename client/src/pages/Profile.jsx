import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import PointsDisplay from '../components/PointsDisplay';

const Profile = () => {
    const { user, setUser, axios, navigate } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        dateOfBirth: '',
        gender: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });
    const fileInputRef = useRef(null);
    const [dietaryPreferences, setDietaryPreferences] = useState(user?.dietaryPreferences || []);
    const dietaryOptions = [
        'Vegan', 'Vegetarian', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'Low Sugar', 'High Protein', 'Keto', 'Paleo'
    ];

    // Function to refresh user data
    const refreshUserData = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        
        // Initialize form data with user info
        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            bio: user.bio || '',
            dateOfBirth: user.dateOfBirth || '',
            gender: user.gender || '',
            address: {
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                zipCode: user.address?.zipCode || '',
                country: user.address?.country || ''
            }
        });
        
        // Set profile image preview if user has one
        if (user.profileImage) {
            setImagePreview(user.profileImage);
        } else {
            setImagePreview(null);
        }

        setDietaryPreferences(user.dietaryPreferences || []);
    }, [user, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleDietaryChange = (option) => {
        setDietaryPreferences(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const updateData = { ...formData, dietaryPreferences };
            
            // If there's a new image, convert to base64
            if (imagePreview && imagePreview.startsWith('data:')) {
                updateData.profileImage = imagePreview;
            }
            
            const { data } = await axios.put('/api/user/profile', updateData);
            
            if (data.success) {
                toast.success('Profile updated successfully!');
                setUser(data.user);
                refreshUserData();
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            
            // Handle different types of errors
            if (error.response) {
                const { data } = error.response;
                if (data.errors && Array.isArray(data.errors)) {
                    // Show validation errors
                    data.errors.forEach(err => toast.error(err));
                } else {
                    toast.error(data.message || 'Failed to update profile');
                }
            } else if (error.request) {
                toast.error('Network error. Please check your connection.');
            } else {
                toast.error('Failed to update profile. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-20 pb-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account information and preferences</p>
                </div>
                <PointsDisplay />

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Profile Image Section */}
                        <div className="text-center mb-8">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                                    {imagePreview ? (
                                        <img 
                                            src={imagePreview} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Upload Button */}
                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                                
                                {/* Remove Button */}
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    Change Photo
                                </button>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="ml-4 text-sm text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                placeholder="Tell us a little about yourself..."
                            />
                        </div>

                        {/* Address Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter street address"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter city"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State/Province
                                    </label>
                                    <input
                                        type="text"
                                        name="address.state"
                                        value={formData.address.state}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter state"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ZIP/Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="address.zipCode"
                                        value={formData.address.zipCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter ZIP code"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter country"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Health Preferences Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 mt-8">
                            <h2 className="text-2xl font-bold text-green-700 mb-2 flex items-center gap-2">
                                <span role="img" aria-label="health">🍏</span> Health Preferences
                            </h2>
                            <p className="text-gray-500 mb-4">Select your dietary preferences to get personalized product suggestions and warnings.</p>
                            <div className="flex flex-wrap gap-3 mb-2">
                                {dietaryOptions.map(option => (
                                    <button
                                        type="button"
                                        key={option}
                                        className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400/50
                                            ${dietaryPreferences.includes(option)
                                                ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105'
                                                : 'bg-white text-green-700 border-green-300 hover:bg-green-50'}`}
                                        onClick={() => handleDietaryChange(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {dietaryPreferences.length > 0 && (
                                <div className="mt-2 text-green-700 text-sm">
                                    Selected: {dietaryPreferences.join(', ')}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => navigate('/my-orders')}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile; 