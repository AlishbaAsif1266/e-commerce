import { Star, Plus, Heart } from 'lucide-react';
import Badge from './Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product, showBadge = false, badgeText = 'Hot' }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLoved = isInWishlist(product.id);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        toggleWishlist(product);
    };

    return (
        <div className="group relative bg-white rounded-[32px] overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Icons Overlay */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <button 
                        onClick={handleWishlistClick}
                        className={`p-3 bg-white/80 backdrop-blur-md rounded-full transition-colors shadow-sm ${isLoved ? 'text-red-500 hover:text-red-600' : 'text-gray-900 hover:bg-indigo-600 hover:text-white'}`}
                    >
                        <Heart className={`h-5 w-5 ${isLoved ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {showBadge && (
                    <div className="absolute top-4 left-4">
                        <Badge variant="hot">{badgeText}</Badge>
                    </div>
                )}
            </Link>

            {/* Add to Cart Quick Button */}
            <button 
                onClick={() => addToCart(product)}
                className="absolute top-[calc(80%-24px)] right-4 p-4 bg-white rounded-2xl shadow-xl text-indigo-600 font-bold translate-y-16 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-indigo-600 hover:text-white z-10"
            >
                <Plus className="h-6 w-6" />
            </button>

            {/* Content Section */}
            <Link to={`/product/${product.id}`} className="block p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {product.category || 'Lifestyle'}
                    </span>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-bold text-gray-900">{product.rating}</span>
                    </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                    {product.name}
                </h3>
                
                <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-extrabold text-indigo-600">
                        ${product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm font-bold text-gray-400 line-through">
                            ${product.oldPrice}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
