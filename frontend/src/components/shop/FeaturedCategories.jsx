import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import { 
    Shirt, 
    Smartphone, 
    Home as HomeIcon, 
    Watch, 
    Footprints, 
    Sparkles, 
    Dumbbell,
    Palette
} from "lucide-react";

const categories = [
    {
        name: 'Apparel',
        icon: Shirt,
        href: '/shop?category=apparel',
        color: 'text-orange-500',
        bg: 'bg-orange-50'
    },
    {
        name: 'Tech',
        icon: Smartphone,
        href: '/shop?category=tech',
        color: 'text-blue-500',
        bg: 'bg-blue-50'
    },
    {
        name: 'Accessories',
        icon: Watch,
        href: '/shop?category=accessories',
        color: 'text-amber-500',
        bg: 'bg-amber-50'
    },
    {
        name: 'Shoes',
        icon: Footprints,
        href: '/shop?category=shoes',
        color: 'text-rose-500',
        bg: 'bg-rose-50'
    },
    {
        name: 'Home',
        icon: HomeIcon,
        href: '/shop?category=home',
        color: 'text-emerald-500',
        bg: 'bg-emerald-50'
    },
    {
        name: 'Beauty',
        icon: Sparkles,
        href: '/shop?category=beauty',
        color: 'text-pink-500',
        bg: 'bg-pink-50'
    },
    {
        name: 'Sports',
        icon: Dumbbell,
        href: '/shop?category=sports',
        color: 'text-indigo-500',
        bg: 'bg-indigo-50'
    },
    {
        name: 'Lifestyle',
        icon: Palette,
        href: '/shop?category=lifestyle',
        color: 'text-violet-500',
        bg: 'bg-violet-50'
    },
];

const FeaturedCategories = () => {
    return (
        <section className="mb-16">
            <SectionHeader title="Shop by Category" />
            
            <div className="flex items-center md:justify-center overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex space-x-6 md:space-x-12">
                    {categories.map((category) => (
                        <Link 
                            key={category.name} 
                            to={category.href}
                            className="group flex flex-col items-center space-y-4 min-w-[80px]"
                        >
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[28px] ${category.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gray-100`}>
                                <category.icon className={`h-8 w-8 md:h-10 md:w-10 ${category.color} transition-transform group-hover:rotate-6`} />
                            </div>
                            <span className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest transition-colors group-hover:text-indigo-600">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
