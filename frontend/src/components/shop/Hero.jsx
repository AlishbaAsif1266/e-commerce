import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-gray-50 overflow-hidden rounded-[40px] mb-16 aspect-[16/9] md:aspect-[21/9]">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80"
                    alt="Hero background"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                <span className="text-indigo-400 font-black uppercase tracking-[0.3em] mb-4 text-sm">
                    Summer 2024
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
                    Elevate Your <br /> Everyday Style
                </h1>
                
                <div>
                    <Button 
                        variant="primary" 
                        size="xl" 
                        onClick={() => navigate('/shop')}
                        className="rounded-full shadow-2xl shadow-indigo-500/40"
                        rightIcon={<ArrowRight className="h-6 w-6" />}
                    >
                        Shop Now
                    </Button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 right-16 hidden md:flex items-center space-x-4">
                <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                <div className="w-24 h-1 bg-indigo-500 rounded-full"></div>
                <div className="w-12 h-1 bg-white/40 rounded-full"></div>
            </div>
        </div>
    );
};

export default Hero;
