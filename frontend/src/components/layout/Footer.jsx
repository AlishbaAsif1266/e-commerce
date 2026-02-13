import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const Footer = () => {
    return (
        <footer className="mt-20">
            {/* Main Footer Container */}
            <div className="bg-gray-900 text-white rounded-t-[60px] pt-20 pb-12 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* Brand Section */}
                        <div className="lg:col-span-4">
                            <Link to="/" className="inline-block group mb-8">
                                <h2 className="text-3xl font-black text-white tracking-tighter">
                                    Smart<span className="text-indigo-400">Cart</span>
                                </h2>
                            </Link>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-sm">
                                Elevate your lifestyle with our curated collection of premium products. 
                                Quality you can feel, design you can love.
                            </p>
                            <div className="flex space-x-5">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Grid */}
                        <div className="lg:col-span-4 grid grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Shop</h3>
                                <ul className="space-y-4">
                                    {['Arrivals', 'Trending', 'Apparel', 'Accessories'].map((item) => (
                                        <li key={item}>
                                            <Link to="/shop" className="text-gray-400 font-bold hover:text-white transition-colors">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Company</h3>
                                <ul className="space-y-4">
                                    {['About', 'Contact', 'FAQS', 'Shipping'].map((item) => (
                                        <li key={item}>
                                            <Link to="#" className="text-gray-400 font-bold hover:text-white transition-colors">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Newsletter CTA */}
                        <div className="lg:col-span-4">
                            <div className="bg-white/5 rounded-[40px] p-8 border border-white/5">
                                <h3 className="text-xl font-bold mb-4">Stay in focus</h3>
                                <p className="text-gray-400 text-sm font-medium mb-6">
                                    Get the latest updates on new drops and exclusive offers.
                                </p>
                                <div className="space-y-4">
                                    <input 
                                        type="email" 
                                        placeholder="Email address"
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                    <Button variant="primary" className="w-full py-4 rounded-2xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">
                        <p>© {new Date().getFullYear()} SmartCart Studio. All rights reserved.</p>
                        <div className="flex space-x-8">
                            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
