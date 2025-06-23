import { assets, footerLinks } from "../assets/assets";

const Footer = () => {

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-12 py-16 border-b border-white/10 text-gray-300">
                <div className="space-y-8">
                    <div className="hover:scale-105 transition-transform duration-300">
                        <img className="w-36 md:w-40 drop-shadow-glow" src={assets.logo} alt="logo" />
                    </div>
                    <p className="max-w-md text-gray-300 leading-relaxed text-sm md:text-base">
                        We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer group shadow-soft hover:shadow-glow">
                            <img src={assets.trust_icon} alt="trust" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 cursor-pointer group shadow-soft hover:shadow-glow">
                            <img src={assets.delivery_truck_icon} alt="delivery" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 cursor-pointer group shadow-soft hover:shadow-glow">
                            <img src={assets.leaf_icon} alt="organic" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
                    {footerLinks.map((section, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="font-bold text-lg text-white border-b-2 border-gradient-to-r from-primary to-purple-500 pb-2 inline-block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a 
                                            href={link.url} 
                                            className="text-gray-300 hover:text-white transition-all duration-300 text-sm md:text-base hover:translate-x-2 inline-block font-medium hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 hover:px-3 hover:py-1 hover:rounded-lg"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="relative z-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-gray-400 text-sm md:text-base">
                    Copyright {new Date().getFullYear()} © <span className="text-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-semibold">GreenCart</span> All Rights Reserved.
                </p>
                <div className="flex items-center gap-3 text-gray-400">
                    <span className="text-sm">Made with</span>
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse flex items-center justify-center shadow-glow">
                        <span className="text-white text-xs">❤️</span>
                    </div>
                    <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">by Rahul Bansal</span>
                </div>
            </div>
            
            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary via-purple-500 to-transparent"></div>
        </div>
    );
};

export default Footer