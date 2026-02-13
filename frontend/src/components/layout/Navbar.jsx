import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X, LogOut, LayoutDashboard, ChevronDown, Heart, Home } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        navigate('/');
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchModalOpen(false);
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center group">
                        <h1 className="text-2xl font-black text-indigo-600 tracking-tighter transition-all group-hover:scale-105">
                            Smart<span className="text-gray-900">Cart</span>
                        </h1>
                    </Link>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-600 transition-colors">
                                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 text-gray-900 font-bold transition-all placeholder-gray-400"
                                placeholder="Search products..."
                            />
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/" 
                                className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            >
                                <Home className="h-6 w-6" />
                            </Link>

                            <Link 
                                to="/wishlist" 
                                className="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <Heart className="h-6 w-6" />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white ring-4 ring-white animate-in zoom-in duration-300">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white ring-4 ring-white animate-in zoom-in duration-300">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-3 p-1 pr-3 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-100">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-sm font-black text-gray-900 leading-none">{user.name}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{user.role}</p>
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-50 py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                        </div>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-3 text-sm text-indigo-600 font-black hover:bg-indigo-50 transition-colors">
                                                <LayoutDashboard className="h-5 w-5 mr-3" /> Admin Dashboard
                                            </Link>
                                        )}
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-3 text-sm text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                                            <User className="h-5 w-5 mr-3 text-gray-400" /> Account Settings
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors">
                                            <LogOut className="h-5 w-5 mr-3 text-gray-400" /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="text-gray-600 font-bold hover:text-indigo-600 px-4">Sign In</Link>
                                <Link 
                                    to="/signup" 
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button 
                            onClick={() => setIsSearchModalOpen(true)}
                            className="p-2 text-gray-600 hover:text-indigo-600 rounded-xl"
                        >
                            <Search className="h-6 w-6" />
                        </button>
                        
                        {user && (
                            <Link 
                                to={user.role === 'admin' ? '/admin' : '/profile'} 
                                className="p-2 text-gray-600 hover:text-indigo-600 rounded-xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-6 w-6" />
                            </Link>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-xl"
                        >
                            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Preview */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-50 animate-in slide-in-from-top duration-300">
                    <div className="px-4 py-6 space-y-4">
                        <Link to="/" className="block px-4 py-3 text-lg font-black text-gray-900 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/shop" className="block px-4 py-3 text-lg font-black text-gray-900 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        
                        {user ? (
                            <div className="pt-4 border-t border-gray-50 space-y-2">
                                <Link 
                                    to={user.role === 'admin' ? "/admin" : "/profile"} 
                                    className="flex items-center px-4 py-4 text-lg font-black text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {user.role === 'admin' ? <LayoutDashboard className="h-5 w-5 mr-3" /> : <User className="h-5 w-5 mr-3" />}
                                    {user.role === 'admin' ? "Admin Dashboard" : "My Profile"}
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-4 text-lg font-black text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                                >
                                    <LogOut className="h-5 w-5 mr-3" /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 pt-4 px-4">
                                <Link to="/login" className="flex items-center justify-center py-4 bg-gray-50 rounded-2xl font-bold" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                                <Link to="/signup" className="flex items-center justify-center py-4 bg-indigo-600 text-white rounded-2xl font-bold" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Search Modal (Mobile/Global) */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl mt-20 overflow-hidden animate-in slide-in-from-top-8 duration-500">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Premium Search</h3>
                                <button onClick={() => setIsSearchModalOpen(false)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Search className="h-6 w-6 text-indigo-600" />
                                </div>
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    placeholder="What are you looking for?"
                                    className="w-full pl-16 pr-6 py-6 bg-gray-50 border-none rounded-[32px] focus:ring-4 focus:ring-indigo-100 text-xl font-bold transition-all outline-none"
                                />
                                <div className="absolute inset-y-0 right-6 flex items-center">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest border border-gray-100 px-3 py-1.5 rounded-lg bg-white">Enter</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Quick Shortcuts</p>
                                <div className="flex flex-wrap gap-3">
                                    {['Tech', 'Apparel', 'Shoes', 'Accessories'].map(tag => (
                                        <button 
                                            key={tag}
                                            onClick={() => {
                                                navigate(`/shop?category=${tag.toLowerCase()}`);
                                                setIsSearchModalOpen(false);
                                            }}
                                            className="px-6 py-3 bg-gray-50 hover:bg-indigo-600 hover:text-white rounded-2xl text-sm font-bold transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
