import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Users, 
    Settings, 
    LogOut, 
    Bell, 
    Search,
    ChevronRight,
    Package,
    Menu,
    X,
    ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Order Received', time: '5m ago', type: 'order', unread: true },
        { id: 2, title: 'Low Stock: Sprint Runner X', time: '1h ago', type: 'stock', unread: true },
        { id: 3, title: 'New User Registered', time: '3h ago', type: 'user', unread: false },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { id: 'products', label: 'Inventory', icon: Package, path: '/admin/products' },
        { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
        { id: 'users', label: 'Customers', icon: Users, path: '/admin/users' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900">
            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-300 ease-in-out transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="h-full flex flex-col p-6">
                    {/* Logo Area */}
                    <div className="flex items-center space-x-3 mb-12 px-2">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase italic">Smart<span className="text-indigo-400">Cart</span> Admin</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                                        isActive 
                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' 
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="h-5 w-5 mr-3" />
                                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                    </div>
                                    <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Area */}
                    <div className="mt-auto space-y-4 pt-6 border-t border-slate-800">
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full flex items-center p-4 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <ExternalLink className="h-5 w-5 mr-3" />
                            <span className="font-bold text-sm tracking-tight">View Storefront</span>
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center p-4 rounded-2xl text-red-400 hover:text-white hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            <span className="font-bold text-sm tracking-tight">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen relative">
                {/* Topbar */}
                <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center space-x-6">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900">
                            <Menu className="h-6 w-6" />
                        </button>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Navigation / {location.pathname.split('/').pop() || 'Dashboard'}</p>
                            <h1 className="text-2xl font-black tracking-tighter capitalize">{location.pathname.split('/').pop() || 'Analytics Hub'}</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search everything..." 
                                className="pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold w-64 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className={`relative p-3 rounded-xl transition-all ${isNotificationsOpen ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                                    <div className="absolute right-0 mt-4 w-80 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-6 z-20 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg uppercase tracking-widest">{unreadCount} New</span>
                                        </div>
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <div key={notif.id} className="group relative flex items-start space-x-4 p-2 -mx-2 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notif.unread ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' : 'bg-slate-200'}`}></div>
                                                    <div className="flex-1">
                                                        <p className={`text-sm tracking-tight leading-snug ${notif.unread ? 'font-black text-slate-900' : 'font-bold text-slate-500'}`}>
                                                            {notif.title}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{notif.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full mt-6 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all">
                                            View All Activity
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="h-10 w-[1px] bg-slate-200"></div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black tracking-tight">{user?.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                                {user?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Screen */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
