import { useSearchParams } from "react-router-dom";
import SectionHeader from "../../components/ui/SectionHeader";
import ProductCard from "../../components/ui/ProductCard";
import { ChevronRight, Filter } from "lucide-react";

// Expanded Mock data
const products = [
    {
        id: 1,
        name: 'Velocity Tech Tee',
        price: 45.00,
        category: 'Apparel',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Classic Urban Blazer',
        price: 158.00,
        category: 'Apparel',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'Sprint Runner X',
        price: 85.00,
        oldPrice: 120.00,
        category: 'Shoes',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c274f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        name: 'Sonic Buds Ultra',
        price: 249.00,
        category: 'Tech',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        name: 'Elite Urban Backpack',
        price: 124.00,
        category: 'Accessories',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        name: 'Pro Wireless Mouse',
        price: 89.00,
        category: 'Tech',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 7,
        name: 'Smart Ambient Lamp',
        price: 75.00,
        category: 'Home',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 8,
        name: 'Premium Yoga Mat',
        price: 55.00,
        category: 'Sports',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1592431690279-bb7362243e8a?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 9,
        name: 'Luxe Skin Serum',
        price: 68.00,
        category: 'Beauty',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 10,
        name: 'Aura Smart Watch',
        price: 299.00,
        category: 'Accessories',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 11,
        name: 'Minimalist Wallet',
        price: 45.00,
        category: 'Lifestyle',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 12,
        name: 'Ergo Office Chair',
        price: 349.00,
        category: 'Home',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1505797149-43b0ad766a61?auto=format&fit=crop&w=800&q=80'
    }
];

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const activeCategory = searchParams.get('category');
    const searchQuery = searchParams.get('q');

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory 
            ? p.category.toLowerCase() === activeCategory.toLowerCase() 
            : true;
        
        const matchesSearch = searchQuery 
            ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              p.category.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="py-12 animate-in fade-in duration-500">
            {/* Breadcrumb / Title Area */}
            <div className="mb-12">
                <div className="flex items-center space-x-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                    <span>Shop</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className={activeCategory ? "text-gray-400" : "text-indigo-600"}>All Products</span>
                    {activeCategory && (
                        <>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-indigo-600">{activeCategory}</span>
                        </>
                    )}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter capitalize">
                            {activeCategory ? activeCategory : "Explore Collections"}
                        </h1>
                        <p className="mt-4 text-gray-500 font-bold max-w-xl">
                            Discover our curated selection of premium {activeCategory ? activeCategory.toLowerCase() : "goods"} designed for the modern lifestyle.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            showBadge={product.oldPrice ? true : false}
                            badgeText="Sale"
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                            <Filter className="h-10 w-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tighter">No products found</h3>
                        <p className="text-gray-500 font-bold mt-2">Try selecting a different category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
