import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import PointsDisplay from './PointsDisplay'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false)
    const [pointsData, setPointsData] = React.useState(null)
    const profileDropdownRef = useRef(null)
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext();

    const fetchPoints = async () => {
        if (!user) return;
        try {
            const { data } = await axios.get('/api/points/user');
            if (data.success) {
                setPointsData(data.data);
            }
        } catch (error) {
            console.error('Error fetching points:', error);
        }
    };

    useEffect(() => {
        fetchPoints();
    }, [user]);

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                setUser(null);
                setProfileDropdownOpen(false)
                setPointsData(null)
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo */}
                    <NavLink to='/' onClick={() => setOpen(false)} className="group">
                        <div className="relative">
                            <img className="h-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2" src={assets.logo} alt="logo" />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to='/' className="relative font-semibold text-gray-700 transition-all duration-300 hover:text-primary group">
                            <span className="relative z-10">Home</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-green-400 transition-all duration-300 group-hover:w-full rounded-full"></div>
                        </NavLink>
                        
                        <NavLink to='/products' className="relative font-semibold text-gray-700 transition-all duration-300 hover:text-primary group">
                            <span className="relative z-10">All Products</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-green-400 transition-all duration-300 group-hover:w-full rounded-full"></div>
                        </NavLink>
                        
                        <NavLink to='/' className="relative font-semibold text-gray-700 transition-all duration-300 hover:text-primary group">
                            <span className="relative z-10">Contact</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-green-400 transition-all duration-300 group-hover:w-full rounded-full"></div>
                        </NavLink>

                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-green-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/90">
                                <input 
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                    className="w-64 bg-transparent outline-none placeholder-gray-400 font-medium" 
                                    type="text" 
                                    placeholder="Search products..." 
                                />
                                <div className="p-1.5 bg-gradient-to-r from-primary to-green-400 rounded-lg">
                                    <img src={assets.search_icon} alt='search' className='w-4 h-4 text-white' />
                                </div>
                            </div>
                        </div>

                        {/* Points Display (for logged-in users) */}
                        {user && pointsData && (
                            <div className="relative cursor-pointer group" onClick={() => {
                                toast.success(`You have ${pointsData.points.toLocaleString()} points (${pointsData.membershipTier} tier)`);
                            }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative p-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/90">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500 text-lg">⭐</span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            {pointsData.points.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 font-bold text-white text-xs bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg border-2 border-white">
                                    {pointsData.membershipTier.charAt(0)}
                                </div>
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                                    <div className="text-center">
                                        <div className="font-semibold">{pointsData.membershipTier} Member</div>
                                        <div>{pointsData.points.toLocaleString()} points</div>
                                        <div className="text-yellow-400">Click for details</div>
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        )}

                        {/* Cart */}
                        <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative p-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/90">
                                <img src={assets.nav_cart_icon} alt='cart' className='w-6 h-6 transition-all duration-300 group-hover:scale-110' />
                            </div>
                            <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 font-bold text-white text-xs bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full shadow-lg animate-pulse border-2 border-white">
                                {getCartCount()}
                            </div>
                        </div>

                        {/* Login/Profile */}
                        {!user ? (
                            <button 
                                onClick={() => setShowUserLogin(true)} 
                                className="relative group px-8 py-3 font-semibold text-white transition-all duration-500 rounded-2xl cursor-pointer overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-green-400 transition-all duration-500 group-hover:scale-110"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-purple-500/80 to-green-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative z-10">Login</span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                            </button>
                        ) : (
                            <div className='relative' ref={profileDropdownRef}>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-400/20 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                                <div 
                                    className="relative p-1 bg-gradient-to-r from-primary to-green-400 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                >
                                    {user.profileImage ? (
                                        <img 
                                            src={user.profileImage} 
                                            className='w-10 h-10 rounded-full border-2 border-white object-cover' 
                                            alt="Profile" 
                                        />
                                    ) : (
                                        <img src={assets.profile_icon} className='w-10 h-10 rounded-full border-2 border-white' alt="" />
                                    )}
                                </div>
                                
                                {/* Dropdown Menu */}
                                {profileDropdownOpen && (
                                    <div className='absolute top-16 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border border-white/50 py-6 w-64 rounded-2xl text-sm z-40 animate-in slide-in-from-top-2 duration-300 overflow-hidden'>
                                        {/* Header */}
                                        <div className='px-6 pb-4 border-b border-gray-100/50'>
                                            <div className='flex items-center gap-3'>
                                                {user.profileImage ? (
                                                    <img 
                                                        src={user.profileImage} 
                                                        className='w-10 h-10 rounded-full border-2 border-white object-cover' 
                                                        alt="Profile" 
                                                    />
                                                ) : (
                                                    <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center'>
                                                        <span className='text-white font-semibold text-sm'>
                                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className='font-semibold text-gray-800 text-sm'>{user?.name || 'User'}</p>
                                                    <p className='text-gray-500 text-xs'>{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className='py-2'>
                                            <div className='px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                                Account
                                            </div>
                                            
                                            {/* Points Section */}
                                            {pointsData && (
                                                <div className='px-4 py-3 mx-2 mb-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200'>
                                                    <div className='flex items-center justify-between mb-2'>
                                                        <div className='flex items-center gap-2'>
                                                            <span className='text-yellow-500 text-lg'>⭐</span>
                                                            <span className='font-semibold text-gray-800 text-sm'>Loyalty Points</span>
                                                        </div>
                                                        <span className='text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full'>
                                                            {pointsData.membershipTier}
                                                        </span>
                                                    </div>
                                                    <div className='text-2xl font-bold text-gray-900 mb-1'>
                                                        {pointsData.points.toLocaleString()}
                                                    </div>
                                                    <div className='text-xs text-gray-600 mb-2'>
                                                        Worth ${pointsData.pointsValue?.toFixed(2) || '0.00'}
                                                    </div>
                                                    {pointsData.canRedeem ? (
                                                        <button 
                                                            onClick={() => {
                                                                toast.success('Points redemption feature coming soon!');
                                                                setProfileDropdownOpen(false);
                                                            }}
                                                            className='w-full text-xs bg-yellow-500 text-white py-1.5 rounded-lg font-medium hover:bg-yellow-600 transition-colors'
                                                        >
                                                            Redeem Points
                                                        </button>
                                                    ) : (
                                                        <div className='text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded'>
                                                            Need {pointsData.minPointsForRedemption - pointsData.points} more to redeem
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <div 
                                                onClick={() => {
                                                    navigate("my-orders")
                                                    setProfileDropdownOpen(false)
                                                }} 
                                                className='group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-sm'
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
                                                    </svg>
                                                </div>
                                                <div className='flex-1'>
                                                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">My Orders</span>
                                                    <p className='text-xs text-gray-500'>View your order history</p>
                                                </div>
                                                <svg className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                                </svg>
                                            </div>

                                            <div 
                                                onClick={() => {
                                                    navigate("/profile")
                                                    setProfileDropdownOpen(false)
                                                }} 
                                                className='group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-sm'
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                                    </svg>
                                                </div>
                                                <div className='flex-1'>
                                                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Profile</span>
                                                    <p className='text-xs text-gray-500'>Manage your account</p>
                                                </div>
                                                <svg className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                                </svg>
                                            </div>

                                            <div 
                                                onClick={() => {
                                                    navigate("/addresses")
                                                    setProfileDropdownOpen(false)
                                                }} 
                                                className='group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-sm'
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <svg className='w-4 h-4 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    </svg>
                                                </div>
                                                <div className='flex-1'>
                                                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Addresses</span>
                                                    <p className='text-xs text-gray-500'>Manage delivery addresses</p>
                                                </div>
                                                <svg className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-100/50 my-2"></div>

                                        {/* Logout Section */}
                                        <div className='px-2'>
                                            <div 
                                                onClick={logout} 
                                                className='group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:shadow-sm'
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                    <svg className='w-4 h-4 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                                    </svg>
                                                </div>
                                                <div className='flex-1'>
                                                    <span className="font-medium text-red-600 group-hover:text-red-700 transition-colors duration-200">Logout</span>
                                                    <p className='text-xs text-gray-500'>Sign out of your account</p>
                                                </div>
                                                <svg className='w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className='px-6 pt-4 border-t border-gray-100/50'>
                                            <div className='flex items-center justify-between text-xs text-gray-500'>
                                                <span>GreenCart</span>
                                                <span className='bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium'>
                                                    Premium
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button and Profile */}
                    <div className='flex items-center gap-4 md:hidden'>
                        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                            <div className="p-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full shadow-lg">
                                <img src={assets.nav_cart_icon} alt='cart' className='w-5 h-5' />
                            </div>
                            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 font-bold text-white text-xs bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md border border-white">
                                {getCartCount()}
                            </div>
                        </div>
                        {user && (
                            <>
                                <div className='relative md:hidden'>
                                    <div 
                                        className="p-1 bg-gradient-to-r from-primary to-green-400 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    >
                                        {user.profileImage ? (
                                            <img 
                                                src={user.profileImage} 
                                                className='w-8 h-8 rounded-full border-2 border-white object-cover' 
                                                alt="Profile" 
                                            />
                                        ) : (
                                            <img src={assets.profile_icon} className='w-8 h-8 rounded-full border-2 border-white' alt="" />
                                        )}
                                    </div>
                                    {/* Fullscreen Modal for mobile profile dropdown */}
                                    {profileDropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 bg-black bg-opacity-40 z-50" onClick={() => setProfileDropdownOpen(false)}></div>
                                            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slide-up">
                                                <div className="bg-white rounded-t-2xl shadow-2xl p-0 flex flex-col max-h-[80vh] h-[min(420px,80vh)] overflow-y-auto relative">
                                                    <button onClick={() => setProfileDropdownOpen(false)} className="absolute top-3 right-4 text-3xl text-gray-400 z-10">&times;</button>
                                                    <div className="flex flex-col items-center gap-2 mb-4 pt-8 pb-2 px-6">
                                                        {user.profileImage ? (
                                                            <img src={user.profileImage} className='w-16 h-16 rounded-full border-2 border-white object-cover' alt="Profile" />
                                                        ) : (
                                                            <img src={assets.profile_icon} className='w-16 h-16 rounded-full border-2 border-white' alt="" />
                                                        )}
                                                        <div className="text-lg font-semibold text-gray-800">{user?.name || 'User'}</div>
                                                        <div className="text-xs text-gray-500">{user?.email}</div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 px-4 pb-4">
                                                        <button onClick={() => {navigate('/profile'); setProfileDropdownOpen(false); setOpen(false);}} className='w-full text-left px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-blue-50'>Profile</button>
                                                        <button onClick={() => {navigate('/my-orders'); setProfileDropdownOpen(false); setOpen(false);}} className='w-full text-left px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-green-50'>My Orders</button>
                                                        <button onClick={() => {navigate('/addresses'); setProfileDropdownOpen(false); setOpen(false);}} className='w-full text-left px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-purple-50'>Addresses</button>
                                                        <button onClick={logout} className='w-full text-left px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50'>Logout</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        <button 
                            onClick={() => open ? setOpen(false) : setOpen(true)} 
                            aria-label="Menu" 
                            className="relative p-2 transition-all duration-300 rounded-xl hover:bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg"
                        >
                            <img src={assets.menu_icon} alt='menu' className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className='absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/50 md:hidden'>
                    <div className="px-6 py-6 space-y-4">
                        <NavLink to="/" onClick={() => setOpen(false)} className="block w-full px-4 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-green-400/10">
                            Home
                        </NavLink>
                        <NavLink to="/products" onClick={() => setOpen(false)} className="block w-full px-4 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-green-400/10">
                            All Products
                        </NavLink>
                        {user && (
                            <NavLink to="/my-orders" onClick={() => setOpen(false)} className="block w-full px-4 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-green-400/10">
                                My Orders
                            </NavLink>
                        )}
                        <NavLink to="/" onClick={() => setOpen(false)} className="block w-full px-4 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-green-400/10">
                            Contact
                        </NavLink>

                        {!user ? (
                            <button 
                                onClick={() => {
                                    setOpen(false);
                                    setShowUserLogin(true);
                                }} 
                                className="w-full px-6 py-4 mt-4 font-semibold text-white transition-all duration-500 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-green-400 hover:shadow-xl hover:scale-105"
                            >
                                Login
                            </button>
                        ) : (
                            <>
                                <NavLink to="/profile" onClick={() => setOpen(false)} className="block w-full px-4 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
                                    Profile
                                </NavLink>
                                <NavLink to="/addresses" onClick={() => setOpen(false)} className="block w-full px-4 py-3 font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
                                    Addresses
                                </NavLink>
                                <button 
                                    onClick={logout} 
                                    className="w-full px-6 py-4 mt-4 font-semibold text-white transition-all duration-500 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl hover:shadow-xl hover:scale-105"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
