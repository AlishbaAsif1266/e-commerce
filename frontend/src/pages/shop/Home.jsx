import Hero from "../../components/shop/Hero";
import FeaturedCategories from "../../components/shop/FeaturedCategories";
import FeaturedProducts from "../../components/shop/FeaturedProducts";
import Button from "../../components/ui/Button";

const Home = () => {
    return (
        <div className="pb-20 md:pb-0">
            <Hero />
            <FeaturedCategories />
            <FeaturedProducts />
            
            {/* Newsletter Section */}
            <section className="bg-indigo-600 rounded-[40px] p-12 md:p-20 text-center text-white mb-16 relative overflow-hidden shadow-2xl shadow-indigo-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                        Join the SmartCart Community
                    </h2>
                    <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-lg font-medium">
                        Subscribe to our newsletter and get 10% off your first purchase. 
                        Be the first to know about new arrivals and exclusive offers.
                    </p>
                    <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="flex-1 px-8 py-5 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-bold transition-all border-none shadow-xl"
                            required
                        />
                        <Button variant="dark" size="lg" className="rounded-2xl px-12 py-5 shadow-2xl">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
