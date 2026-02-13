import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
    User,
    ShoppingBag,
    Heart,
    MapPin,
    Settings,
    LogOut,
    ChevronRight,
    Package,
    CreditCard,
    ShieldCheck,
    Bell,
    ExternalLink,
    Plus,
    Trash2,
    Pencil,
    X,
    Camera,
    Loader2
} from 'lucide-react';
import { useAddresses } from '../../context/AddressContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Profile = () => {
    const { user, logout } = useAuth();
    const { wishlistCount } = useWishlist();
    const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses();
    const [activeTab, setActiveTab] = useState('overview');
    const [isAvatarUploading, setIsAvatarUploading] = useState(false);
    const navigate = useNavigate();

    // Address Modal State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [addressForm, setAddressForm] = useState({
        name: '', street: '', city: '', state: '', zip: '', country: '', isDefault: false
    });
    const [addressErrors, setAddressErrors] = useState({});
    const [editingAddressId, setEditingAddressId] = useState(null);

    // Profile Settings State
    const [profileForm, setProfileForm] = useState({ name: user.name, email: user.email });
    const [profileErrors, setProfileErrors] = useState({});

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsAvatarUploading(true);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/image`, {
                method: 'POST',
                body: uploadData,
            });
            const data = await response.json();
            if (data.url) {
                // In a real app, you'd send this URL to your /api/user/update-avatar endpoint
                const updatedUser = { ...user, avatar: data.url };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                window.location.reload(); // Quick refresh to update throughout app
            }
        } catch (error) {
            console.error('Avatar upload failed:', error);
            alert('Avatar upload failed.');
        } finally {
            setIsAvatarUploading(false);
        }
    };

    if (!user) return null;

    const validateAddress = (form) => {
        const errs = {};
        if (!form.name) errs.name = 'Address name is required';
        if (!form.street) errs.street = 'Street address is required';
        if (!form.city) errs.city = 'City is required';
        if (!form.state) errs.state = 'Required';
        if (!/^\d{5}(-\d{4})?$/.test(form.zip)) errs.zip = 'Invalid ZIP';
        return errs;
    };

    const handleOpenModal = (address = null) => {
        if (address) {
            setAddressForm({ ...address });
            setEditingAddressId(address.id);
        } else {
            setAddressForm({ name: '', street: '', city: '', state: '', zip: '', country: 'USA', isDefault: false });
            setEditingAddressId(null);
        }
        setAddressErrors({});
        setIsAddressModalOpen(true);
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        const errs = validateAddress(addressForm);
        if (Object.keys(errs).length > 0) {
            setAddressErrors(errs);
            return;
        }

        if (editingAddressId) {
            updateAddress(editingAddressId, addressForm);
        } else {
            addAddress(addressForm);
        }
        setIsAddressModalOpen(false);
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const errs = {};
        if (!profileForm.name || profileForm.name.length < 2) errs.name = 'Name is too short';
        if (!/\S+@\S+\.\S+/.test(profileForm.email)) errs.email = 'Invalid email';

        setProfileErrors(errs);
        if (Object.keys(errs).length > 0) return;

        // Simulate update
        alert('Profile updated successfully!');
    };

    const stats = [
        { label: 'Total Orders', value: '12', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Wishlist', value: wishlistCount, icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Active Credits', value: '$240.00', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'orders', label: 'Order History', icon: ShoppingBag },
        { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
        { id: 'settings', label: 'Account Settings', icon: Settings },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sidebar Navigation */}
                <aside className="lg:w-80 lg:shrink-0">
                    <div className="bg-white rounded-[40px] border border-gray-100 p-8 sticky top-28 shadow-xl shadow-gray-100/50 space-y-8">
                        {/* User Profile Summary */}
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100 overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tighter">{user.name}</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user.role} Account</p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest ${activeTab === item.id
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                            : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="h-5 w-5 mr-3" />
                                        {item.label}
                                    </div>
                                    <ChevronRight className={`h-4 w-4 transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0'}`} />
                                </button>
                            ))}
                        </nav>

                        <div className="h-[1px] bg-gray-50"></div>

                        {/* Sign Out */}
                        <button
                            onClick={logout}
                            className="w-full flex items-center p-4 rounded-2xl text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-50 transition-all"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 capitalize">
                            {activeTab}
                        </h1>
                        <p className="text-gray-500 font-bold max-w-2xl text-lg">
                            Manage your personal information, track orders, and configure your global settings from one premium hub.
                        </p>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
                            {/* Welcome Hero Section */}
                            <div className="relative overflow-hidden bg-slate-900 rounded-[48px] p-10 md:p-14 text-white shadow-2xl">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                            <ShieldCheck className="h-4 w-4 text-indigo-400" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Gold Member Tier</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                                            Welcome back,<br />
                                            <span className="text-indigo-400">{user.name.split(' ')[0]}</span>
                                        </h2>
                                        <p className="text-slate-400 font-medium max-w-sm">
                                            Everything looks great today. You have <span className="text-white font-bold">2 orders</span> arriving soon.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] w-full md:w-auto text-center md:text-left shadow-2xl">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">SmartRewards Balance</p>
                                        <h3 className="text-4xl font-black tracking-tighter mb-4 text-indigo-400">4,280 <span className="text-white text-lg">pts</span></h3>
                                        <Button variant="outline" size="sm" className="w-full md:w-auto rounded-xl border-white/10 hover:bg-white/10 text-white font-black text-[10px]">REDEEM POINTS</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Stats & Actions Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                                {/* Large Stats Section */}
                                <div className="xl:col-span-8 space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {stats.map((stat, idx) => (
                                            <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-xl shadow-gray-100/50 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
                                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                                                    <stat.icon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter group-hover:text-indigo-600 transition-colors">{stat.value}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Logistics Hub */}
                                    <div className="bg-white rounded-[48px] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-100/30">
                                        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Live Logistics</h3>
                                            </div>
                                            <button onClick={() => setActiveTab('orders')} className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600 pb-1">View Timeline</button>
                                        </div>
                                        <div className="p-10 space-y-8">
                                            {[1, 2].map((_, i) => (
                                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-50 group">
                                                    <div className="flex items-center space-x-6">
                                                        <div className="w-20 h-20 rounded-[28px] bg-white shadow-sm flex items-center justify-center overflow-hidden border border-gray-100 p-4">
                                                            <img
                                                                src={i === 0 ? "https://images.unsplash.com/photo-1542291026-7eec264c274f?w=200" : "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200"}
                                                                alt="Product"
                                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-black text-gray-900 text-xl tracking-tight leading-tight">
                                                                {i === 0 ? "Velocity X Pro Runner" : "Urban Oversized Hoodie"}
                                                            </h4>
                                                            <div className="flex items-center space-x-3 mt-1">
                                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">ID: #SC-998{i}</span>
                                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Arriving Tomorrow</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Status</p>
                                                            <p className="text-sm font-bold text-gray-900">Out for Delivery</p>
                                                        </div>
                                                        <button
                                                            onClick={() => navigate('/track-order')}
                                                            className="p-4 bg-white rounded-2xl shadow-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all border border-gray-50"
                                                        >
                                                            <ExternalLink className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions Sidebar */}
                                <div className="xl:col-span-4 space-y-10">
                                    <div className="bg-indigo-600 rounded-[48px] p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                        <div className="relative z-10 space-y-6">
                                            <h3 className="text-2xl font-black tracking-tight leading-tight">Need a quick<br />hand?</h3>
                                            <div className="space-y-4">
                                                <button className="w-full flex items-center justify-between p-5 bg-white/10 backdrop-blur-md rounded-3xl hover:bg-white text-white hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-widest text-left">
                                                    <span>Live Support</span>
                                                    <Bell className="h-4 w-4" />
                                                </button>
                                                <button className="w-full flex items-center justify-between p-5 bg-white/10 backdrop-blur-md rounded-3xl hover:bg-white text-white hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-widest text-left">
                                                    <span>Security Hub</span>
                                                    <ShieldCheck className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => navigate('/shop')}
                                                    className="w-full flex items-center justify-between p-5 bg-white/10 backdrop-blur-md rounded-3xl hover:bg-white text-white hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-widest text-left"
                                                >
                                                    <span>Start Shopping</span>
                                                    <ShoppingBag className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Summary Card */}
                                    <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-xl shadow-gray-100/50 space-y-8">
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Account Insight</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400 font-bold">Email Verified</span>
                                                <span className="text-emerald-500 font-black uppercase tracking-widest text-[10px] bg-emerald-50 px-2 py-1 rounded-md">Verified</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400 font-bold">Account Age</span>
                                                <span className="text-gray-900 font-black uppercase tracking-widest text-[10px]">2 Years</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400 font-bold">Total Spent</span>
                                                <span className="text-gray-900 font-black uppercase tracking-widest text-[10px]">$12,450.00</span>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-gray-50"></div>
                                        <button onClick={() => setActiveTab('settings')} className="w-full text-center text-xs font-black text-indigo-600 uppercase tracking-[0.2em] py-2 hover:bg-indigo-50 rounded-xl transition-all">Manage Full Data</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center">
                                                <Package className="h-8 w-8 text-gray-300" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Order #SC-889{i}</h3>
                                                    <Badge variant={i === 0 ? "new" : "default"}>{i === 0 ? "In Transit" : "Delivered"}</Badge>
                                                </div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Purchased on Feb 12, 2024 • $428.00</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button variant="outline" size="sm" className="rounded-xl font-black">Invoice</Button>
                                            <Button variant="dark" size="sm" className="rounded-xl font-black">Details</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className={`bg-white p-8 rounded-[40px] border-2 transition-all ${addr.isDefault ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-gray-50'}`}>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-2xl ${addr.isDefault ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                                <MapPin className="h-6 w-6" />
                                            </div>
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleOpenModal(addr)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                                    <Pencil className="h-5 w-5" />
                                                </button>
                                                <button onClick={() => deleteAddress(addr.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {addr.isDefault && <Badge variant="default" className="mb-4">Default Shipping</Badge>}

                                        <div className="space-y-2">
                                            <p className="text-xl font-black text-gray-900">{addr.name}</p>
                                            <p className="text-gray-500 font-bold leading-relaxed">
                                                {addr.street}<br />
                                                {addr.city}, {addr.state} {addr.zip}<br />
                                                {addr.country}
                                            </p>
                                        </div>

                                        {!addr.isDefault && (
                                            <button
                                                onClick={() => setDefaultAddress(addr.id)}
                                                className="mt-6 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 pb-1 border-b-2 border-transparent hover:border-indigo-600 transition-all"
                                            >
                                                Set as Default
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    onClick={() => handleOpenModal()}
                                    className="bg-gray-50 p-12 rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-4 hover:border-indigo-600 hover:bg-white transition-all group"
                                >
                                    <div className="h-16 w-16 rounded-3xl bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                                        <Plus className="h-8 w-8" />
                                    </div>
                                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900">Add New Address</span>
                                </button>
                            </div>

                            {/* Address Modal */}
                            {isAddressModalOpen && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                                    <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                                        <div className="p-8 md:p-10">
                                            <div className="flex justify-between items-center mb-8">
                                                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                                                    {editingAddressId ? 'Edit Address' : 'New Address'}
                                                </h3>
                                                <button onClick={() => setIsAddressModalOpen(false)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all">
                                                    <X className="h-6 w-6" />
                                                </button>
                                            </div>

                                            <form onSubmit={handleSaveAddress} className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Address Name (e.g. Home, Office)</label>
                                                    <input
                                                        required
                                                        value={addressForm.name}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setAddressForm({ ...addressForm, name: val });
                                                            if (addressErrors.name) setAddressErrors(prev => ({ ...prev, name: val ? '' : 'Address name is required' }));
                                                        }}
                                                        className={`w-full px-6 py-4 bg-gray-50 border ${addressErrors.name ? 'border-red-200 focus:ring-red-100' : 'border-none focus:ring-indigo-100'} rounded-2xl focus:ring-4 font-bold transition-all outline-none`}
                                                        placeholder="Home Base"
                                                    />
                                                    {addressErrors.name && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{addressErrors.name}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Street Address</label>
                                                    <input
                                                        required
                                                        value={addressForm.street}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setAddressForm({ ...addressForm, street: val });
                                                            if (addressErrors.street) setAddressErrors(prev => ({ ...prev, street: val ? '' : 'Street address is required' }));
                                                        }}
                                                        className={`w-full px-6 py-4 bg-gray-50 border ${addressErrors.street ? 'border-red-200 focus:ring-red-100' : 'border-none focus:ring-indigo-100'} rounded-2xl focus:ring-4 font-bold transition-all outline-none`}
                                                        placeholder="123 Premium St"
                                                    />
                                                    {addressErrors.street && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{addressErrors.street}</p>}
                                                </div>

                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">City</label>
                                                        <input
                                                            required
                                                            value={addressForm.city}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                setAddressForm({ ...addressForm, city: val });
                                                                if (addressErrors.city) setAddressErrors(prev => ({ ...prev, city: val ? '' : 'City is required' }));
                                                            }}
                                                            className={`w-full px-6 py-4 bg-gray-50 border ${addressErrors.city ? 'border-red-200 focus:ring-red-100' : 'border-none focus:ring-indigo-100'} rounded-2xl focus:ring-4 font-bold transition-all outline-none`}
                                                            placeholder="New York"
                                                        />
                                                        {addressErrors.city && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{addressErrors.city}</p>}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">State / ZIP</label>
                                                        <div className="flex space-x-2">
                                                            <input
                                                                required
                                                                value={addressForm.state}
                                                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                                                className={`w-1/2 px-4 py-4 bg-gray-50 border ${addressErrors.state ? 'border-red-200 focus:ring-red-100' : 'border-none focus:ring-indigo-100'} rounded-2xl focus:ring-4 font-bold transition-all text-center outline-none`}
                                                                placeholder="NY"
                                                            />
                                                            <input
                                                                required
                                                                value={addressForm.zip}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setAddressForm({ ...addressForm, zip: val });
                                                                    if (addressErrors.zip) setAddressErrors(prev => ({ ...prev, zip: /^\d{5}(-\d{4})?$/.test(val) ? '' : 'Invalid ZIP' }));
                                                                }}
                                                                className={`w-1/2 px-4 py-4 bg-gray-50 border ${addressErrors.zip ? 'border-red-200 focus:ring-red-100' : 'border-none focus:ring-indigo-100'} rounded-2xl focus:ring-4 font-bold transition-all text-center outline-none`}
                                                                placeholder="10001"
                                                            />
                                                        </div>
                                                        {(addressErrors.state || addressErrors.zip) && (
                                                            <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">
                                                                {addressErrors.state || addressErrors.zip}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={addressForm.isDefault}
                                                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                                                        className="w-5 h-5 rounded-lg border-gray-200 text-indigo-600 focus:ring-indigo-100"
                                                    />
                                                    <span className="text-sm font-bold text-gray-600">Set as default shipping address</span>
                                                </div>

                                                <Button type="submit" className="w-full py-5 rounded-3xl shadow-xl shadow-indigo-100 mt-4">
                                                    {editingAddressId ? 'Apply Changes' : 'Save Address'}
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-[40px] border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-100/50 space-y-12 animate-in slide-in-from-bottom-4 duration-500">
                            {/* Profile Info */}
                            <form onSubmit={handleProfileUpdate} className="space-y-8">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Profile Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileForm.name}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setProfileForm({ ...profileForm, name: val });
                                                if (profileErrors.name) setProfileErrors(prev => ({ ...prev, name: val.length >= 2 ? '' : 'Name is too short' }));
                                            }}
                                            className={`w-full px-6 py-4 bg-gray-50 border ${profileErrors.name ? 'border-red-200' : 'border-none'} rounded-2xl focus:ring-2 focus:ring-indigo-100 text-gray-900 font-bold outline-none`}
                                        />
                                        {profileErrors.name && <p className="text-[10px] font-bold text-red-500 ml-2">{profileErrors.name}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={profileForm.email}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setProfileForm({ ...profileForm, email: val });
                                                if (profileErrors.email) setProfileErrors(prev => ({ ...prev, email: /\S+@\S+\.\S+/.test(val) ? '' : 'Invalid email' }));
                                            }}
                                            className={`w-full px-6 py-4 bg-gray-50 border ${profileErrors.email ? 'border-red-200' : 'border-none'} rounded-2xl focus:ring-2 focus:ring-indigo-100 text-gray-900 font-bold outline-none`}
                                        />
                                        {profileErrors.email && <p className="text-[10px] font-bold text-red-500 ml-2">{profileErrors.email}</p>}
                                    </div>
                                </div>
                                <Button type="submit" variant="primary" className="rounded-2xl px-8 font-black">Save Changes</Button>
                            </form>

                            <div className="h-[1px] bg-gray-50"></div>

                            {/* Preferences */}
                            <div className="space-y-8">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Preferences</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                                                <Bell className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900">Push Notifications</p>
                                                <p className="text-xs font-bold text-gray-400">Order updates & exclusive offers</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                                                <ShieldCheck className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900">Two-Factor Auth</p>
                                                <p className="text-xs font-bold text-gray-400">Extra security for your account</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Profile;
