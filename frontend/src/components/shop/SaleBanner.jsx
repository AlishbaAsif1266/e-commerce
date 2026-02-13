import { useState, useEffect } from 'react';
import Button from '../ui/Button';

const SaleBanner = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hrs: 14,
        min: 45
    });

    // Simulated countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.min > 0) return { ...prev, min: prev.min - 1 };
                if (prev.hrs > 0) return { ...prev, hrs: prev.hrs - 1, min: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hrs: 23, min: 59 };
                return prev;
            });
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="mb-16">
            <div className="relative overflow-hidden bg-red-50 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-red-100 shadow-xl">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-2">
                        UP TO 50% OFF
                    </h2>
                    <p className="text-gray-600 font-bold uppercase tracking-widest mb-8">
                        SUMMER CLEARANCE SALE
                    </p>

                    <div className="flex items-center justify-center md:justify-start space-x-6 text-indigo-600">
                        <div className="text-center">
                            <span className="text-3xl font-black block">{String(timeLeft.days).padStart(2, '0')}</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Days</span>
                        </div>
                        <span className="text-2xl font-bold -mt-4">:</span>
                        <div className="text-center">
                            <span className="text-3xl font-black block">{String(timeLeft.hrs).padStart(2, '0')}</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Hrs</span>
                        </div>
                        <span className="text-2xl font-bold -mt-4">:</span>
                        <div className="text-center">
                            <span className="text-3xl font-black block">{String(timeLeft.min).padStart(2, '0')}</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Min</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Circle "SALE" element */}
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-200 mb-6 group cursor-pointer hover:scale-105 transition-transform">
                        <span className="text-white text-3xl font-black italic tracking-tighter group-hover:rotate-12 transition-transform">
                            SALE
                        </span>
                    </div>
                    <Button variant="dark" size="lg" className="rounded-full px-12">
                        Shop Now
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default SaleBanner;
