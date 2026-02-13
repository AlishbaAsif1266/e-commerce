import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Heart, User, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const BottomNav = () => {
    const location = useLocation();
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlistCount } = useWishlist();
    
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Compass, label: 'Shop', path: '/shop' },
        { icon: ShoppingCart, label: 'Cart', path: '#', onClick: () => setIsCartOpen(true), badge: cartCount },
        { icon: Heart, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-[100]">
            <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 flex items-center justify-around p-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.label}
                            to={item.path}
                            onClick={(e) => {
                                if (item.onClick) {
                                    e.preventDefault();
                                    item.onClick();
                                }
                            }}
                            className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                                isActive 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' 
                                    : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                            }`}
                        >
                            <item.icon className={`h-6 w-6 ${isActive ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                            {isActive && (
                                <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></span>
                            )}
                            {item.badge > 0 && !isActive && (
                                <span className={`absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black text-white ring-2 ring-white animate-in zoom-in duration-300 ${item.label === 'Wishlist' ? 'bg-red-500' : 'bg-indigo-600'}`}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
