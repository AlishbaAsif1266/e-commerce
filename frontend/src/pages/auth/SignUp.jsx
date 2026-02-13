import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, UserPlus, Eye, EyeOff, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: ''
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const validateName = (val) => {
        if (!val) return 'Name is required';
        if (val.length < 2) return 'Name must be at least 2 characters';
        return '';
    };

    const validateEmail = (val) => {
        if (!val) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(val)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (val) => {
        if (!val) return 'Password is required';
        if (val.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(val)) {
            return 'Include uppercase, lowercase, and a number';
        }
        return '';
    };

    const validateConfirmPassword = (val, pass) => {
        if (!val) return 'Please confirm your password';
        if (val !== pass) return 'Passwords do not match';
        return '';
    };

    const handleFieldChange = (field, value) => {
        let error = '';
        switch (field) {
            case 'name':
                setName(value);
                error = validateName(value);
                break;
            case 'email':
                setEmail(value);
                error = validateEmail(value);
                break;
            case 'password':
                setPassword(value);
                error = validatePassword(value);
                // Also re-validate confirm password if it's already filled
                if (confirmPassword) {
                    setFieldErrors(prev => ({
                        ...prev,
                        confirmPassword: validateConfirmPassword(confirmPassword, value)
                    }));
                }
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                error = validateConfirmPassword(value, password);
                break;
            default:
                break;
        }
        setFieldErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const errors = {
            name: validateName(name),
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(confirmPassword, password),
            agreeTerms: !agreeTerms ? 'You must agree to the Terms of Service' : ''
        };

        setFieldErrors(errors);

        if (Object.values(errors).some(err => err !== '')) {
            if (errors.agreeTerms) setError(errors.agreeTerms);
            return;
        }

        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to register');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Elegant Background Patterns */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>
                <div className="absolute top-[20%] left-[-5%] w-[30%] h-[30%] bg-violet-50 rounded-full blur-[80px] opacity-40"></div>
            </div>

            <div className="w-full max-w-[640px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <button
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center space-x-2 text-gray-400 hover:text-indigo-600 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Sign In</span>
                    </button>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create <span className="text-indigo-600">Account</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Join the elite SmartCart community</p>
                </div>

                {/* SignUp Card */}
                <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-white">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center">
                                <ShieldCheck className="h-4 w-4 mr-3 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <User className={`h-5 w-5 ${fieldErrors.name ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-600'} transition-colors`} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => handleFieldChange('name', e.target.value)}
                                        className={`block w-full pl-12 pr-4 py-4 bg-gray-50 border ${fieldErrors.name ? 'border-red-200 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-100 focus:border-indigo-600'} rounded-2xl focus:ring-4 focus:bg-white text-gray-900 font-bold placeholder-gray-300 transition-all outline-none`}
                                        placeholder="Alex"
                                    />
                                </div>
                                {fieldErrors.name && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{fieldErrors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className={`h-5 w-5 ${fieldErrors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-600'} transition-colors`} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => handleFieldChange('email', e.target.value)}
                                        className={`block w-full pl-12 pr-4 py-4 bg-gray-50 border ${fieldErrors.email ? 'border-red-200 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-100 focus:border-indigo-600'} rounded-2xl focus:ring-4 focus:bg-white text-gray-900 font-bold placeholder-gray-300 transition-all outline-none`}
                                        placeholder="alex@example.com"
                                    />
                                </div>
                                {fieldErrors.email && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{fieldErrors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Lock className={`h-5 w-5 ${fieldErrors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-600'} transition-colors`} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => handleFieldChange('password', e.target.value)}
                                        className={`block w-full pl-12 pr-12 py-4 bg-gray-50 border ${fieldErrors.password ? 'border-red-200 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-100 focus:border-indigo-600'} rounded-2xl focus:ring-4 focus:bg-white text-gray-900 font-bold placeholder-gray-300 transition-all outline-none`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {fieldErrors.password && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{fieldErrors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Lock className={`h-5 w-5 ${fieldErrors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-indigo-600'} transition-colors`} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                                        className={`block w-full pl-12 pr-12 py-4 bg-gray-50 border ${fieldErrors.confirmPassword ? 'border-red-200 focus:ring-red-100' : 'border-gray-100 focus:ring-indigo-100 focus:border-indigo-600'} rounded-2xl focus:ring-4 focus:bg-white text-gray-900 font-bold placeholder-gray-300 transition-all outline-none`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {fieldErrors.confirmPassword && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{fieldErrors.confirmPassword}</p>}
                            </div>
                        </div>

                        {/* Terms checkbox */}
                        <div className="pt-2 px-1">
                            <label className="flex items-start space-x-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center mt-1">
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="h-5 w-5 appearance-none bg-gray-50 border border-gray-200 rounded focus:ring-indigo-600 checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer"
                                    />
                                    {agreeTerms && <ChevronRight className="absolute h-3 w-3 text-white pointer-events-none" />}
                                </div>
                                <span className="text-sm font-medium text-gray-500 leading-tight">
                                    I agree to the <span className="text-indigo-600 font-bold">Terms of Service</span> and <span className="text-indigo-600 font-bold">Privacy Policy</span>.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-5 px-6 rounded-2xl shadow-xl shadow-indigo-100 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98] group"
                        >
                            Complete Registration
                            <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative py-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
                            <span className="bg-white px-4 whitespace-nowrap">Express Join</span>
                        </div>
                    </div>

                    {/* Social Logic */}
                    <div className="flex flex-col space-y-4">
                        <button className="w-full flex items-center justify-center py-4 px-6 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all group">
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
