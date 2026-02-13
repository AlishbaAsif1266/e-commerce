import { useState, useEffect } from 'react';
import { 
    Package, 
    Truck, 
    Home, 
    CheckCircle2, 
    Clock, 
    MapPin, 
    ChevronRight,
    Search,
    RefreshCw,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const TrackOrder = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('shipped'); // ordered, shipped, out-for-delivery, delivered
    
    const steps = [
        { id: 'ordered', label: 'Order Confirmed', icon: CheckCircle2, date: 'Feb 13, 11:45 AM' },
        { id: 'shipped', label: 'Shipped', icon: Package, date: 'Feb 13, 03:20 PM' },
        { id: 'out-for-delivery', label: 'Out for Delivery', icon: Truck, date: 'Coming Soon' },
        { id: 'delivered', label: 'Delivered', icon: Home, date: 'Coming Soon' },
    ];

    const currentStepIndex = steps.findIndex(step => step.id === status);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-sm font-black text-indigo-600 uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Track Your Order</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Order ID: <span className="text-gray-900 font-black">#SC-28491-039</span></p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden sm:block text-right">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Expected Delivery</p>
                        <p className="text-lg font-black text-gray-900">Feb 15, 2026</p>
                    </div>
                    <Button variant="outline" className="rounded-2xl border-2 py-4">
                        <RefreshCw className="h-4 w-4 mr-2" /> Live Updates
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Visual Timeline Card */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-indigo-50 overflow-hidden relative">
                        {/* Interactive Timeline */}
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
                                {/* Desktop Progress Line */}
                                <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gray-100 -z-1">
                                    <div 
                                        className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
                                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                    ></div>
                                </div>

                                {steps.map((step, idx) => {
                                    const Icon = step.icon;
                                    const isActive = idx <= currentStepIndex;
                                    const isCurrent = idx === currentStepIndex;

                                    return (
                                        <div key={step.id} className="relative flex flex-row md:flex-col items-center gap-6 md:gap-4 w-full md:w-auto mb-8 md:mb-0">
                                            {/* Step Circle */}
                                            <div className={`
                                                w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                                                ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-gray-50 text-gray-300'}
                                                ${isCurrent ? 'scale-125 ring-8 ring-indigo-50 animate-pulse' : ''}
                                            `}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            
                                            {/* Text Info */}
                                            <div className="text-left md:text-center">
                                                <p className={`text-sm font-black uppercase tracking-widest ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                                                    {step.label}
                                                </p>
                                                <p className="text-xs font-bold text-gray-400 mt-1">{step.date}</p>
                                            </div>

                                            {/* Mobile Connecting Line */}
                                            {idx < steps.length - 1 && (
                                                <div className="md:hidden absolute top-14 left-7 w-[2px] h-12 bg-gray-100 -z-1">
                                                    {isActive && idx < currentStepIndex && <div className="w-full h-full bg-indigo-600"></div>}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Visual Map Placeholder */}
                        <div className="mt-16 bg-slate-50 rounded-[40px] h-80 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')] opacity-20 grayscale bg-cover bg-center group-hover:scale-105 transition-transform duration-[20s]"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent"></div>
                            
                            {/* Pulse Point */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative">
                                    <div className="absolute -inset-8 bg-indigo-600/20 rounded-full animate-ping"></div>
                                    <div className="absolute -inset-4 bg-indigo-600/30 rounded-full animate-ping animation-delay-500"></div>
                                    <div className="w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div className="absolute top-10 whitespace-nowrap left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-lg">
                                        CURRENT LOCATION: NAVY HUB
                                    </div>
                                </div>
                            </div>

                            <button className="absolute bottom-8 right-8 p-4 bg-white rounded-2xl shadow-xl text-gray-900 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                                Open in Maps
                            </button>
                        </div>
                    </div>

                    {/* Shipment History */}
                    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-xl overflow-hidden">
                        <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Shipment Updates</h3>
                        <div className="space-y-8">
                            {[
                                { status: 'Arrived at Sorting Center', location: 'Navi Mumbai Hub', time: 'Feb 13, 10:30 PM' },
                                { status: 'Departed from Distribution Center', location: 'Delhi Express Hub', time: 'Feb 13, 03:20 PM' },
                                { status: 'In Transit', location: 'International Gateway', time: 'Feb 13, 12:45 PM' },
                            ].map((update, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-indigo-600 group-first:ring-4 ring-indigo-50"></div>
                                        {idx < 2 && <div className="w-[1px] h-16 bg-gray-100"></div>}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base font-black text-gray-900 tracking-tight">{update.status}</p>
                                        <p className="text-sm font-bold text-gray-400 capitalize">{update.location}</p>
                                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest pt-2">{update.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Order Items Card */}
                    <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl self-start">
                        <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Order Items</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Velocity X Pro Runner', price: 189.99, qty: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c274f?auto=format&fit=crop&w=200&q=80' },
                                { name: 'Smart Urban Hoodie', price: 59.99, qty: 1, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-black text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-xs font-bold text-gray-400">Qty: {item.qty} • Total: ${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Grand Total</span>
                            <span className="text-2xl font-black text-indigo-600">$249.98</span>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-4">Need Help?</h3>
                            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                                Our support team is available 24/7 to help you with your delivery.
                            </p>
                            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center">
                                Contact Support <ChevronRight className="h-4 w-4 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
