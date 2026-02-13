import { useState } from 'react';
import { 
    LayoutDashboard,
    Users, 
    ShoppingBag, 
    BarChart3, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Clock,
    Package,
    CheckCircle2,
    DollarSign,
    Settings,
    X,
    Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const stats = [
        { label: 'Total Revenue', value: '$124,500', icon: DollarSign, trend: '+14.2%', isUp: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Active Orders', value: '42', icon: ShoppingBag, trend: '+5.4%', isUp: true, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Total Customers', value: '1,280', icon: Users, trend: '-2.1%', isUp: false, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Avg. Order', value: '$86.20', icon: BarChart3, trend: '+8.1%', isUp: true, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const recentOrders = [
        { id: '#SC-9980', customer: 'John Doe', amount: '$428.00', status: 'Processing', time: '2 mins ago' },
        { id: '#SC-9981', customer: 'Sarah Smith', amount: '$158.00', status: 'Shipped', time: '25 mins ago' },
        { id: '#SC-9982', customer: 'Mike Johnson', amount: '$249.00', status: 'Delivered', time: '1 hour ago' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Welcome Greeting */}
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome back, {user?.name?.split(' ')[0] || 'Admin'}</h2>
                <p className="text-slate-500 font-bold mt-1">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-slate-900 group-hover:text-white`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                                {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                <span>{stat.trend}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Sales Analytics Chart Mockup */}
                <div className="xl:col-span-8 bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight">Sales Performance</h3>
                                <p className="text-slate-400 font-bold text-sm">Last 30 days revenue growth</p>
                            </div>
                            <div className="flex space-x-4">
                                <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div> Revenue
                                </span>
                                <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div> Orders
                                </span>
                            </div>
                        </div>
                        
                        {/* Mock Chart Visualization */}
                        <div className="flex-1 flex items-end justify-between gap-2 h-48 mb-8">
                            {[40, 65, 45, 90, 75, 55, 100, 85, 60, 80, 70, 95].map((h, i) => (
                                <div key={i} className="flex-1 group/bar relative">
                                    <div 
                                        style={{ height: `${h}%` }} 
                                        className="w-full bg-indigo-500/20 rounded-t-lg group-hover/bar:bg-indigo-500 transition-all duration-500 cursor-pointer"
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-indigo-500 text-[10px] font-black px-2 py-1 rounded">
                                        ${h}k
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-6">
                            <span>Jan 1</span>
                            <span>Jan 15</span>
                            <span>Jan 30</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Orders</h3>
                            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:bg-indigo-50 px-3 py-1 rounded-lg">View All</button>
                        </div>
                        <div className="space-y-6">
                            {recentOrders.map((order, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all" onClick={() => setSelectedOrder(order)}>
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-sm tracking-tight">{order.id}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{order.customer}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900 text-sm">{order.amount}</p>
                                        <p className={`text-[9px] font-black uppercase tracking-widest ${
                                            order.status === 'Delivered' ? 'text-emerald-500' : 'text-indigo-500'
                                        }`}>{order.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simple Quick Action */}
                    <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden flex flex-col justify-between aspect-square md:aspect-auto xl:aspect-square">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight leading-tight">Generate<br />Reports</h3>
                            <p className="text-indigo-200 font-bold text-sm mt-2">Export inventory and sales data for fiscal review.</p>
                        </div>
                        <button className="relative z-10 w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center">
                            Download PDF <ArrowUpRight className="h-4 w-4 ml-2" />
                        </button>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    </div>
                </div>
            </div>

            {/* Quick Order Preview Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedOrder(null)}></div>
                    <div className="bg-white rounded-[40px] w-full max-w-md relative z-10 shadow-2xl border border-white animate-in scale-in duration-300 p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedOrder.id}</h3>
                                <p className="text-slate-500 font-bold text-sm">Order Summary</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 text-slate-400 hover:text-slate-900 transition-all">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-4 border-b border-slate-50">
                                <span className="text-sm font-bold text-slate-400">Customer</span>
                                <span className="text-sm font-black text-slate-900">{selectedOrder.customer}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-slate-50">
                                <span className="text-sm font-bold text-slate-400">Total Amount</span>
                                <span className="text-sm font-black text-indigo-600">{selectedOrder.amount}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-slate-50">
                                <span className="text-sm font-bold text-slate-400">Status</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg`}>
                                    {selectedOrder.status}
                                </span>
                            </div>
                            <Button variant="primary" className="w-full rounded-2xl py-4 mt-4" onClick={() => setSelectedOrder(null)}>
                                Close Preview
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
