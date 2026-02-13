import { useState } from 'react';
import { 
    Search, 
    UserPlus, 
    MoreVertical, 
    Mail, 
    Calendar, 
    Shield, 
    ChevronLeft, 
    ChevronRight,
    Filter,
    ArrowUpDown,
    X,
    Trash2,
    Settings
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Mock User Data for Admin
const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joined: 'Jan 15, 2024', status: 'Active', orders: 12 },
    { id: 2, name: 'Sarah Smith', email: 'sarah.s@gmail.com', role: 'Customer', joined: 'Jan 22, 2024', status: 'Active', orders: 4 },
    { id: 3, name: 'Alex Admin', email: 'admin@smartcart.com', role: 'Admin', joined: 'Dec 01, 2023', status: 'Active', orders: 0 },
    { id: 4, name: 'Mike Johnson', email: 'mike.j@outlook.com', role: 'Customer', joined: 'Feb 05, 2024', status: 'Inactive', orders: 1 },
    { id: 5, name: 'Emma Wilson', email: 'emma.w@company.com', role: 'Customer', joined: 'Feb 10, 2024', status: 'Active', orders: 2 },
];

const AdminUsers = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateRole = (id, newRole) => {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    };

    const handleToggleStatus = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header / Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Customers</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-4xl font-black tracking-tighter text-slate-900">1,240</h4>
                        <span className="text-sm font-black text-emerald-500">+12% this month</span>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">New Signups</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-4xl font-black tracking-tighter text-slate-900">42</h4>
                        <span className="text-sm font-black text-indigo-500">Last 7 days</span>
                    </div>
                </div>
                <div className="bg-indigo-600 p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Admin Team</p>
                    <div className="flex items-end justify-between relative z-10">
                        <h4 className="text-4xl font-black tracking-tighter">5</h4>
                        <Shield className="h-8 w-8 text-white/20" />
                    </div>
                </div>
            </div>

            {/* User Directory */}
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Find character or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 font-bold transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-3.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                            <Filter className="h-5 w-5" />
                        </button>
                        <Button variant="primary" className="rounded-2xl px-6" leftIcon={<UserPlus className="h-5 w-5" />}>
                            Add User
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/30 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name & Account</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined Date</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Orders</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs border border-slate-100 shadow-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 tracking-tight">{user.name}</p>
                                                <div className="flex items-center text-[10px] font-bold text-slate-400 lowercase tracking-widest">
                                                    <Mail className="h-3 w-3 mr-1 opacity-50" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                                            user.role === 'Admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'
                                        }`}>
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center text-sm font-bold text-slate-500">
                                            <Calendar className="h-4 w-4 mr-2 opacity-50" />
                                            {user.joined}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-black text-slate-900">{user.orders}</td>
                                    <td className="px-8 py-5">
                                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-300'}`}></div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            className="p-2 text-slate-400 hover:text-slate-900 transition-all"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsProfileModalOpen(true);
                                            }}
                                        >
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">5 users found</p>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-400 opacity-50 cursor-not-allowed">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* User Profile / Action Modal */}
            {isProfileModalOpen && selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsProfileModalOpen(false)}></div>
                    <div className="bg-white rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl border border-white animate-in zoom-in duration-300 overflow-hidden">
                        <div className="p-8 bg-slate-900 text-white flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-500/20">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">{selectedUser.name}</h3>
                                    <p className="text-slate-400 font-bold text-sm tracking-tight">{selectedUser.email}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsProfileModalOpen(false)} className="p-2 text-slate-400 hover:text-white transition-all">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Account Status Control */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Security</p>
                                        <p className="font-black text-slate-900">Current Status: {selectedUser.status}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggleStatus(selectedUser.id)}
                                        className={`px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                            selectedUser.status === 'Active' 
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                        }`}
                                    >
                                        {selectedUser.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                                    </button>
                                </div>
                                <div className="h-[1px] bg-slate-100 w-full"></div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Privileges</p>
                                        <p className="font-black text-slate-900">Role: {selectedUser.role}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleUpdateRole(selectedUser.id, 'Customer')}
                                            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${selectedUser.role === 'Customer' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                        >
                                            Customer
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateRole(selectedUser.id, 'Admin')}
                                            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${selectedUser.role === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                        >
                                            Admin
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Orders</p>
                                    <p className="text-xl font-black text-slate-900">{selectedUser.orders}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joined</p>
                                    <p className="text-lg font-black text-slate-900 leading-tight">{selectedUser.joined}</p>
                                </div>
                            </div>

                            <div className="pt-4 flex space-x-4">
                                <Button 
                                    variant="dark" 
                                    className="flex-1 rounded-2xl py-4" 
                                    leftIcon={<Trash2 className="h-4 w-4" />}
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to remove this user?')) {
                                            setUsers(users.filter(u => u.id !== selectedUser.id));
                                            setIsProfileModalOpen(false);
                                        }
                                    }}
                                >
                                    Remove User
                                </Button>
                                <Button variant="primary" className="flex-1 rounded-2xl py-4 shadow-xl shadow-indigo-100" onClick={() => setIsProfileModalOpen(false)}>
                                    Save & Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
