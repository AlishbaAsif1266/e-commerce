import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Lock, 
    CreditCard, 
    ShieldCheck, 
    ArrowLeft, 
    Loader2, 
    CheckCircle2,
    AlertCircle,
    Smartphone
} from 'lucide-react';
import Button from '../../components/ui/Button';

const PaymentGateway = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('idle'); // idle, processing, success, error
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    // Mock amount from location state or default
    const amount = location.state?.amount || 249.99;

    const handlePayment = (e) => {
        e.preventDefault();
        setStatus('processing');
        
        // Simulate secure API call
        setTimeout(() => {
            setStatus('success');
            
            // Redirect to success page after showing success message
            setTimeout(() => {
                navigate('/checkout', { state: { paid: true } });
            }, 2000);
        }, 3000);
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-2xl animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">Payment Securely Processed</h2>
                    <p className="text-gray-500 font-medium mb-8">Your transaction was successful. Redirecting you back to complete your order...</p>
                    <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-lg w-full">
                {/* Header Info */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Cancel
                    </button>
                    <div className="flex items-center space-x-2 text-slate-900">
                        <Lock className="h-4 w-4" />
                        <span className="text-xs font-black uppercase tracking-widest">Secure Checkout</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[48px] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 relative">
                    {/* Processing Overlay */}
                    {status === 'processing' && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
                            <p className="font-black text-slate-900 uppercase tracking-widest text-sm">Verifying with Bank...</p>
                        </div>
                    )}

                    {/* Top Brand Bar */}
                    <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Paying To</p>
                            <h3 className="text-xl font-black tracking-tighter">SmartCart Global</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Amount Due</p>
                            <h3 className="text-2xl font-black text-indigo-400">${amount.toFixed(2)}</h3>
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="p-10 space-y-8">
                        {/* Card Preview (Visual Only) */}
                        <div className="relative h-48 w-full bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl mb-12 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-10 bg-yellow-400/20 rounded-lg backdrop-blur-md border border-yellow-400/30 flex items-center justify-center">
                                        <div className="w-8 h-6 bg-yellow-400 rounded-md"></div>
                                    </div>
                                    <ShieldCheck className="h-8 w-8 opacity-50" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-mono tracking-[0.3em]">
                                        {cardData.number || '**** **** **** ****'}
                                    </p>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                                        <span>Card Holder</span>
                                        <span>Expires</span>
                                    </div>
                                    <div className="flex justify-between font-bold uppercase tracking-tight">
                                        <span>{cardData.name || 'Your Name'}</span>
                                        <span>{cardData.expiry || 'MM/YY'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cardholder Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-100 font-bold transition-all"
                                    placeholder="Enter full name"
                                    onChange={(e) => setCardData({...cardData, name: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Card Number</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        required
                                        maxLength="19"
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-100 font-bold transition-all pl-14"
                                        placeholder="0000 0000 0000 0000"
                                        onChange={(e) => setCardData({...cardData, number: e.target.value})}
                                    />
                                    <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Expiry</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-100 font-bold transition-all"
                                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CVV</label>
                                    <input 
                                        type="password" 
                                        required
                                        placeholder="***"
                                        maxLength="3"
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-100 font-bold transition-all"
                                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button 
                            type="submit"
                            className="w-full py-6 rounded-[28px] bg-slate-900 hover:bg-black text-white shadow-2xl shadow-slate-200"
                        >
                            Authorize Payment
                        </Button>

                        <div className="flex items-center justify-center space-x-6 pt-4 grayscale opacity-30">
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Secured By</span>
                            <div className="flex space-x-4">
                                <div className="h-4 w-8 bg-slate-400 rounded-sm"></div>
                                <div className="h-4 w-8 bg-slate-400 rounded-sm"></div>
                                <div className="h-4 w-8 bg-slate-400 rounded-sm"></div>
                            </div>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Your data is protected with 256-bit AES Encryption
                </p>
            </div>
        </div>
    );
};

export default PaymentGateway;
