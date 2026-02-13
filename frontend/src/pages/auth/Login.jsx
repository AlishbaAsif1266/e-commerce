import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, ShoppingBag, Eye, EyeOff, ChevronRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const validateEmail = (value) => {
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setFieldErrors(prev => ({ ...prev, email: validateEmail(value) }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setFieldErrors(prev => ({ ...prev, password: validatePassword(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setFieldErrors({ email: emailError, password: passwordError });
            return;
        }

        try {
            const user = await login(email, password);
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError(err.message || 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Elegant Background Patterns */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-violet-50 rounded-full blur-[80px] opacity-40"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-blue-50 rounded-full blur-[120px] opacity-50"></div>
            </div>

            <div className="w-full max-w-[480px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-200 mb-6 p-4">
                        <ShoppingBag className="text-white h-full w-full" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Smart<span className="text-indigo-600">Cart</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">The gateway to premium shopping</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-white">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                            <p className="text-gray-500 text-sm mt-1">Unlock your personalized experience</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center">
                                    <ShieldCheck className="h-5 w-5 mr-3 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-5">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Mail className={`h-5 w-5 ${fieldErrors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-600'} transition-colors`} />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={handleEmailChange}
                                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50 border ${fieldErrors.email ? 'border-red-200 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-100 focus:border-indigo-600'} rounded-2xl focus:ring-4 focus:bg-white text-gray-900 font-bold placeholder-gray-300 transition-all outline-none`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {fieldErrors.email && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{fieldErrors.email}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                        <Link to="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</Link>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Lock className={`h-5 w-5 ${fieldErrors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-600'} transition-colors`} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className={`block w-full pl-12 pr-14 py-4 bg-gray-50 border ${fieldErrors.password ? 'border-red-200 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-100 focus:border-indigo-600'} rounded-2xl focus:ring-4 focus:bg-white text-gray-900 font-bold placeholder-gray-300 transition-all outline-none`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {fieldErrors.password && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{fieldErrors.password}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-5 px-6 rounded-2xl shadow-xl shadow-indigo-100 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98] group"
                            >
                                Continue Shopping
                                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
                                <span className="bg-white px-4 whitespace-nowrap">Secure Auth</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <button className="w-full flex items-center justify-center py-4 px-6 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all group">
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                            Continue with Google
                        </button>

                        {/* Footer Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-500 font-medium text-sm">
                                Not a member?{' '}
                                <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                                    Join Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
