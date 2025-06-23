import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {

    const { axios, navigate } = useAppContext();

    const sidebarLinks = [
        { 
            name: "Analytics", 
            path: "/seller/analytics", 
            icon: assets.order_icon,
            description: "View your store analytics and insights"
        },
        { 
            name: "Add Product", 
            path: "/seller", 
            icon: assets.add_icon,
            description: "Add new products to your store"
        },
        { 
            name: "Product List", 
            path: "/seller/product-list", 
            icon: assets.product_list_icon,
            description: "Manage your product inventory"
        },
        { 
            name: "Orders", 
            path: "/seller/orders", 
            icon: assets.order_icon,
            description: "View and manage customer orders"
        },
        { 
            name: "Reviews", 
            path: "/seller/reviews", 
            icon: assets.star_icon,
            description: "Manage customer reviews and feedback"
        },
    ];

    const logout = async ()=>{
        try {
            const { data } = await axios.get('/api/seller/logout');
            if(data.success){
                toast.success(data.message)
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <Link to='/' className="group">
                        <div className="relative">
                            <img src={assets.logo} alt="logo" className="cursor-pointer w-32 md:w-36 transition-all duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        </div>
                    </Link>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Welcome back,</p>
                            <p className="font-semibold text-gray-800">Admin</p>
                        </div>
                        <button 
                            onClick={logout} 
                            className='group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md'
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            <span className='relative z-10 flex items-center gap-2'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                </svg>
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-lg min-h-[calc(100vh-80px)]">
                    <div className="p-6">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Seller Dashboard</h2>
                            <p className="text-sm text-gray-600">Manage your store and products</p>
                        </div>
                        
                        <nav className="space-y-2">
                            {sidebarLinks.map((item) => (
                                <NavLink 
                                    to={item.path} 
                                    key={item.name} 
                                    end={item.path === "/seller"}
                                >
                                    {({isActive}) => (
                                        <div className={`
                                            group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-pointer
                                            ${isActive 
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105" 
                                                : "hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 text-gray-700 hover:text-gray-900 hover:shadow-md"
                                            }
                                        `}>
                                            <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`}></div>
                                            
                                            <div className="relative z-10 flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                                    isActive 
                                                        ? "bg-white/20" 
                                                        : "bg-gray-100 group-hover:bg-white/50"
                                                }`}>
                                                    <img 
                                                        src={item.icon} 
                                                        alt="" 
                                                        className={`w-5 h-5 transition-all duration-300 ${
                                                            isActive ? "filter brightness-0 invert" : ""
                                                        }`} 
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`font-semibold transition-colors duration-300 ${
                                                        isActive ? "text-white" : "text-gray-800"
                                                    }`}>
                                                        {item.name}
                                                    </p>
                                                    <p className={`text-xs transition-colors duration-300 ${
                                                        isActive ? "text-white/80" : "text-gray-500"
                                                    }`}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    isActive ? "bg-white" : "bg-transparent group-hover:bg-green-500"
                                                }`}></div>
                                            </div>
                                        </div>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200/50">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">GreenCart</p>
                                <p className="text-xs text-gray-500">Seller Portal</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;