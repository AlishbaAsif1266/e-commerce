import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import SectionHeader from '../../components/ui/SectionHeader';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/ui/Button';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlistItems, wishlistCount } = useWishlist();

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-8 animate-in fade-in duration-500">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center shadow-xl shadow-indigo-100">
                    <Heart className="h-16 w-16 text-indigo-200" />
                </div>
                <div className="max-w-md space-y-4">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Your wishlist is empty</h2>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        Start saving your favorite premium items and they will appear here for you to review later.
                    </p>
                </div>
                <Link to="/shop">
                    <Button variant="primary" className="px-10 py-5 rounded-3xl shadow-2xl shadow-indigo-100" rightIcon={<ArrowRight />}>
                        Explore Shop
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">
                        My Wishlist
                    </h1>
                    <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-sm">
                        {wishlistCount} {wishlistCount === 1 ? 'Premium Item' : 'Premium Items'} Saved
                    </p>
                </div>
                <div className="flex space-x-4">
                    <Link to="/shop">
                        <Button variant="outline" className="rounded-2xl font-black">Continue Shopping</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
