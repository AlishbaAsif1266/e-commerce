import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import { ChevronRight, MapPin, CreditCard, CheckCircle2, ArrowLeft, Plus } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAddresses } from '../../context/AddressContext';
import { useAuth } from '../../context/AuthContext';
import Badge from '../../components/ui/Badge';

const Checkout = () => {
    const { user } = useAuth();
    const { cartItems, cartSubtotal, clearCart } = useCart();
    const { addresses } = useAddresses();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [selectedAddressId, setSelectedAddressId] = useState(() => {
        if (!Array.isArray(addresses)) return null;
        return addresses.find(a => a.isDefault)?.id || (addresses.length > 0 ? addresses[0].id : null);
    });
    const navigate = useNavigate();
    const location = useLocation();

    // Handle return from Payment Gateway
    useEffect(() => {
        if (location.state?.paid) {
            clearCart();
            setStep(3);
        }
    }, [location.state, clearCart]);

    // Sync selected address if list changes or selected address is deleted
    useEffect(() => {
        const addressExists = addresses.find(a => a.id === selectedAddressId);
        if (addresses.length > 0 && (!selectedAddressId || !addressExists)) {
            const defaultAddr = addresses.find(a => a.isDefault);
            setSelectedAddressId(defaultAddr ? defaultAddr.id : addresses[0].id);
        } else if (addresses.length === 0) {
            setSelectedAddressId(null);
        }
    }, [addresses, selectedAddressId]);

    const shippingFee = 0;
    const tax = cartSubtotal * 0.08;
    const total = cartSubtotal + shippingFee + tax;

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm font-medium">Add some premium items to your cart before proceeding to checkout.</p>
                <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
            </div>
        );
    }

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handlePlaceOrder = () => {
        if (paymentMethod === 'online') {
            navigate('/payment-gateway', { state: { amount: total } });
            return;
        }

        // Simulate COD order placement
        setTimeout(() => {
            clearCart();
            nextStep();
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 shadow-sm">
            {/* Progress Bar */}
            {step < 3 && (
                <div className="flex items-center justify-center mb-16">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                        <span className={`ml-3 text-sm font-black uppercase tracking-widest ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Shipping</span>
                    </div>
                    <div className={`w-20 h-[2px] mx-4 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-100'}`}></div>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                        <span className={`ml-3 text-sm font-black uppercase tracking-widest ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-500">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Shipping Details</h2>
                                <p className="text-gray-500 font-medium">Where should we deliver your premium selection?</p>
                            </div>

                            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                                {addresses.length > 0 ? (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {addresses.map((addr) => (
                                                <button 
                                                    key={addr.id}
                                                    onClick={() => setSelectedAddressId(addr.id)}
                                                    className={`text-left p-8 rounded-[32px] border-4 transition-all ${selectedAddressId === addr.id ? 'border-indigo-600 bg-indigo-50 shadow-xl shadow-indigo-100' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className={`p-3 rounded-2xl ${selectedAddressId === addr.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                            <MapPin className="h-5 w-5" />
                                                        </div>
                                                        {addr.isDefault && <Badge variant="default">Default</Badge>}
                                                    </div>
                                                    <p className="font-black text-gray-900 text-lg mb-1">{addr.name}</p>
                                                    <p className="text-sm font-bold text-gray-500 leading-snug">
                                                        {addr.street}, {addr.city}<br />
                                                        {addr.state} {addr.zip}
                                                    </p>
                                                </button>
                                            ))}
                                            
                                            <button 
                                                onClick={() => navigate('/profile')}
                                                className="flex flex-col items-center justify-center p-8 rounded-[32px] border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-white hover:border-indigo-600 transition-all group"
                                            >
                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-indigo-600 mb-4 transition-all">
                                                    <Plus className="h-6 w-6" />
                                                </div>
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Add New Address</span>
                                            </button>
                                        </div>
                                        
                                        {selectedAddressId && Array.isArray(addresses) && (
                                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-4">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                                <p className="text-sm font-bold text-emerald-800">Excellent! We will ship your order to <span className="font-black">"{addresses.find(a => a.id === selectedAddressId)?.name || 'selected address'}"</span>.</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="text-center py-10">
                                            <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 text-gray-300">
                                                <MapPin className="h-10 w-10" />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">No addresses found</h3>
                                            <p className="text-gray-500 font-medium mt-2">Please add a shipping address to your profile to continue.</p>
                                            <Button onClick={() => navigate('/profile')} className="mt-8">Manage Addresses</Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button 
                                onClick={nextStep} 
                                disabled={!selectedAddressId || addresses.length === 0}
                                className={`w-full py-5 rounded-3xl ${(!selectedAddressId || addresses.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                rightIcon={<ChevronRight />}
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-500">
                            <div className="flex items-center justify-between">
                                <button onClick={prevStep} className="flex items-center text-sm font-black text-gray-400 hover:text-indigo-600 transition-colors">
                                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shipping
                                </button>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button 
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`p-10 rounded-[40px] border-4 flex flex-col items-center space-y-4 transition-all ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50 shadow-xl shadow-indigo-100' : 'border-gray-100 bg-white hover:border-indigo-200'}`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                        <CheckCircle2 className="h-10 w-10" />
                                    </div>
                                    <div className="text-center">
                                        <span className="block font-black text-gray-900 text-xl tracking-tighter">Cash on Delivery</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Pay when you receive</span>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setPaymentMethod('online')}
                                    className={`p-10 rounded-[40px] border-4 flex flex-col items-center space-y-4 transition-all ${paymentMethod === 'online' ? 'border-indigo-600 bg-indigo-50 shadow-xl shadow-indigo-100' : 'border-gray-100 bg-white hover:border-indigo-200'}`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${paymentMethod === 'online' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                        <CreditCard className="h-10 w-10" />
                                    </div>
                                    <div className="text-center">
                                        <span className="block font-black text-gray-900 text-xl tracking-tighter">Online Payment</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Visa, Mastercard, etc.</span>
                                    </div>
                                </button>
                            </div>

                            <div className="bg-indigo-50/50 rounded-[32px] p-6 text-center border border-indigo-100">
                                <p className="text-sm font-bold text-indigo-900">
                                    {paymentMethod === 'cod' 
                                        ? "Great Choice! Experience the convenience of paying at your doorstep." 
                                        : "Secure checkout. You'll be redirected to our encrypted payment gateway."}
                                </p>
                            </div>

                            <Button onClick={handlePlaceOrder} className="w-full py-5 rounded-3xl shadow-2xl shadow-indigo-100">
                                Confirm Order — ${(total || 0).toFixed(2)}
                            </Button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="lg:col-span-12 py-12 text-center space-y-8 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100">
                                <CheckCircle2 className="h-12 w-12" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">Order Confirmed!</h2>
                                <p className="text-gray-500 font-medium max-w-md mx-auto">
                                    Thank you for your purchase, {user?.name?.split(' ')[0] || 'Guest'}! We've sent a confirmation email to your primary address.
                                    Your premium selection is being prepared for shipment.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                                <Button onClick={() => navigate('/shop')} variant="primary" className="px-12 rounded-3xl shadow-xl shadow-indigo-100">Shop More</Button>
                                <Button onClick={() => navigate('/track-order')} variant="outline" className="px-12 rounded-3xl">Track Order</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Summary */}
                {step < 3 && (
                    <div className="lg:col-span-4 bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 self-start">
                        <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Order Summary</h3>
                        
                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex space-x-4">
                                    <div className="h-16 w-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Subtotal</span>
                                <span className="text-gray-900 font-black">${cartSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Shipping</span>
                                <span className="text-green-500 font-black uppercase tracking-widest text-[10px]">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Tax (8%)</span>
                                <span className="text-gray-900 font-black">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-100">
                                <span className="text-lg font-black text-gray-900">Total</span>
                                <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
