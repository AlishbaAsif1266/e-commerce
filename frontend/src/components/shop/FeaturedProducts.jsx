import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../ui/ProductCard";

// Synced Mock data from ProductList
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
];

const FeaturedProducts = () => {
    return (
        <section className="mb-24">
            <SectionHeader 
                title="Explore Our Collections" 
                viewAllHref="/shop" 
                viewAllLabel="View Entire Shop"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        showBadge={product.oldPrice ? true : product.id < 3}
                        badgeText={product.oldPrice ? "Sale" : "New"}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
