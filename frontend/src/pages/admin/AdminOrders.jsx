import { useState } from 'react';
import { 
    Search, 
    Filter, 
    Eye, 
    CheckCircle2, 
    Clock, 
    Truck, 
    XCircle,
    Download,
    ChevronLeft,
    ChevronRight,
    User,
    Calendar,
    DollarSign,
    X,
    ShoppingBag
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Mock Order Data for Admin
const initialOrders = [
    { id: '#SC-9980', customer: 'John Doe', date: 'Feb 12, 2024', total: 428.00, status: 'Processing', items: 3, payment: 'Credit Card' },
    { id: '#SC-9981', customer: 'Sarah Smith', date: 'Feb 12, 2024', total: 158.00, status: 'Shipped', items: 1, payment: 'PayPal' },
    { id: '#SC-9982', customer: 'Mike Johnson', date: 'Feb 11, 2024', total: 249.00, status: 'Delivered', items: 1, payment: 'Online' },
    { id: '#SC-9983', customer: 'Emma Wilson', date: 'Feb 11, 2024', total: 89.00, status: 'Pending', items: 2, payment: 'COD' },
    { id: '#SC-9984', customer: 'David Brown', date: 'Feb 10, 2024', total: 1250.00, status: 'Cancelled', items: 5, payment: 'Credit Card' },
];

const AdminOrders = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const handleUpdateStatus = (id, newStatus) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
        setIsStatusModalOpen(false);
    };

    const filteredOrders = orders.filter(o => 
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        o.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Processing': return 'bg-blue-50 text-blue-600';
            case 'Shipped': return 'bg-indigo-50 text-indigo-600';
            case 'Delivered': return 'bg-emerald-50 text-emerald-600';
            case 'Pending': return 'bg-amber-50 text-amber-600';
            case 'Cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <Clock className="h-3 w-3 mr-1" />;
            case 'Shipped': return <Truck className="h-3 w-3 mr-1" />;
            case 'Delivered': return <CheckCircle2 className="h-3 w-3 mr-1" />;
            case 'Cancelled': return <XCircle className="h-3 w-3 mr-1" />;
            default: return <Clock className="h-3 w-3 mr-1" />;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Orders', value: '1,280', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Pending Fulfilment', value: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Total Revenue', value: '$84,250', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Avg. Order Value', value: '$124.50', icon: Filter, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Order Management</h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Order ID or Customer..." 
                                className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold w-64 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                            />
                        </div>
                        <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                            <Download className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/30 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Items</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5 font-black text-indigo-600 text-sm">{order.id}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                <User className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <span className="font-bold text-slate-900 text-sm tracking-tight">{order.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center text-sm font-bold text-slate-500">
                                            <Calendar className="h-4 w-4 mr-2 opacity-50" />
                                            {order.date}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-600">{order.items} Items</td>
                                    <td className="px-8 py-5 text-sm font-black text-slate-900">${order.total.toFixed(2)}</td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setIsStatusModalOpen(true);
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page 1 of 24</p>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed transition-all">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Status Update Modal */}
            {isStatusModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsStatusModalOpen(false)}></div>
                    <div className="bg-white rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl border border-white animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Update Fulfilment</h3>
                                <p className="text-slate-500 font-bold text-sm">Managing order {selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setIsStatusModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="bg-slate-50 p-6 rounded-[32px] flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${getStatusStyle(selectedOrder.status)}`}>
                                        {getStatusIcon(selectedOrder.status)}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</p>
                                        <p className="font-black text-slate-900">{selectedOrder.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                                    <p className="font-black text-slate-900">${selectedOrder.total.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1">Set New Status</p>
                                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                            selectedOrder.status === status 
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                                            : 'border-slate-50 hover:border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusStyle(status)}`}>
                                                {getStatusIcon(status)}
                                            </div>
                                            <span className="font-bold text-sm">{status}</span>
                                        </div>
                                        {selectedOrder.status === status && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                                    </button>
                                ))}
                            </div>

                            <Button variant="dark" className="w-full rounded-2xl py-4" onClick={() => setIsStatusModalOpen(false)}>
                                Close Window
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
