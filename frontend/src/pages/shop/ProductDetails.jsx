import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, ChevronLeft, ShoppingCart, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLoved = isInWishlist(id);

    const handleWishlistToggle = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        toggleWishlist(product);
    };
    
    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('Red');
    const [selectedSize, setSelectedSize] = useState('10.0');
    const [activeTab, setActiveTab] = useState('description');

    // Mock data based on the provided image
    const product = {
        id: id,
        name: 'Velocity X Pro Runner',
        brand: 'Performance Elite',
        price: 189.99,
        oldPrice: 240.00,
        discount: '20% OFF',
        rating: 4.8,
        reviewsCount: 124,
        status: 'In Stock',
        description: 'Engineered for maximum speed and comfort. Featuring our proprietary foam technology and breathable mesh for the elite athlete in you.',
        fullDescription: 'The Velocity X Pro Runner is our most advanced marathon shoe yet. Built with a carbon-fiber plate for maximum energy return and a superlight upper that fits like a second skin.',
        features: [
            'Ultra-breathable AeroMesh upper',
            'Cloud-Response™ cushioning system',
            'Multi-surface high-traction rubber outsole'
        ],
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c274f?auto=format&fit=crop&w=1200&q=80', // Main Red
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80', // Thumb 2
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80', // Thumb 3
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=80', // Thumb 4
        ],
        colors: [
            { name: 'Red', class: 'bg-red-500' },
            { name: 'Navy', class: 'bg-slate-900' },
            { name: 'Blue', class: 'bg-blue-600' }
        ],
        sizes: ['7.0', '8.0', '9.0', '10.0', '11.0', '12.0']
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedColor,
            selectedSize
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-900 hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-3">
                    <button className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Share2 className="h-5 w-5" />
                    </button>
                    <button 
                        onClick={handleWishlistToggle}
                        className={`p-3 bg-white rounded-full shadow-sm border border-gray-100 transition-colors ${isLoved ? 'text-red-500 border-red-50' : 'text-gray-400 hover:text-red-500'}`}
                    >
                        <Heart className={`h-5 w-5 ${isLoved ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Image Gallery */}
                <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-12 gap-6">
                    {/* Thumbnails */}
                    <div className="col-span-2 space-y-4">
                        {product.images.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-red-500 p-1 shadow-lg' : 'border-gray-100'}`}
                            >
                                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="col-span-10 relative bg-gray-50 rounded-[40px] overflow-hidden group">
                        <img 
                            src={product.images[activeImage]} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full text-white text-xs font-black tracking-widest uppercase">
                            {activeImage + 1} / {product.images.length}
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-red-500 uppercase tracking-[0.2em]">{product.brand}</span>
                            <div className="flex items-center text-green-500 space-x-1.5">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">{product.status}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1.1]">
                            {product.name}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <span className="text-sm font-black text-gray-900">{product.rating}</span>
                            <span className="text-sm font-bold text-gray-400">({product.reviewsCount} Reviews)</span>
                        </div>
                        <div className="flex items-baseline space-x-4">
                            <span className="text-4xl font-black text-red-500">${product.price}</span>
                            <span className="text-xl font-bold text-gray-300 line-through">${product.oldPrice}</span>
                            <Badge variant="hot" className="bg-red-50 text-red-500 border-none px-3 py-1.5">{product.discount}</Badge>
                        </div>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Selectors */}
                    <div className="space-y-8">
                        {/* Color Selector */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Select Color</h3>
                            <div className="flex space-x-4">
                                {product.colors.map((color) => (
                                    <button 
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${selectedColor === color.name ? 'border-red-500 scale-110 shadow-lg' : 'border-transparent'}`}
                                    >
                                        <div className={`w-full h-full rounded-full ${color.class}`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Select Size</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                                {product.sizes.map((size) => (
                                    <button 
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-4 rounded-2xl font-black text-sm transition-all border ${selectedSize === size ? 'border-red-500 bg-red-50 text-red-500 shadow-md' : 'border-gray-100 text-gray-900 hover:border-gray-300'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button className="p-5 bg-white border-2 border-gray-100 rounded-3xl text-gray-900 hover:border-gray-300 transition-all shadow-sm">
                            <ShoppingBag className="h-7 w-7" />
                        </button>
                        <Button 
                            variant="primary" 
                            className="flex-1 py-5 rounded-[28px] bg-red-500 hover:bg-red-600 shadow-2xl shadow-red-200" 
                            leftIcon={<ShoppingCart className="h-6 w-6" />}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs & Details Section */}
            <div className="mt-24 space-y-12">
                <div className="flex border-b border-gray-100 max-w-2xl">
                    {['description', 'specifications', 'reviews'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-6 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-red-500' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full"></div>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Unleash Your Potential</h2>
                            <p className="text-gray-500 font-medium text-xl leading-relaxed">
                                {product.fullDescription}
                            </p>
                        </div>
                        <div className="space-y-4">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-4">
                                    <div className="h-8 w-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Customer Reviews</h3>
                            <button className="text-sm font-black text-red-500 uppercase tracking-widest border-b-2 border-red-500 pb-1">View All</button>
                        </div>

                        {/* Sample Review Card */}
                        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-black">JD</div>
                                    <div>
                                        <h4 className="font-black text-gray-900">John Doe</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">2 Days Ago</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                </div>
                            </div>
                            <p className="text-gray-600 font-medium italic leading-relaxed">
                                "Best running shoes I've ever owned. The energy return is noticeable and they are incredibly lightweight!"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
